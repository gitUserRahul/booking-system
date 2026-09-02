// src/shared/api/mock/setupMock.ts

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { serviceItems } from "./mock/services.js";
import { availability } from "./mock/availability.js";

export type ApiErrorResponse = {
  error: string;
  details?: Array<{ path: string; message: string }>;
};

const isMockMode = import.meta.env.VITE_USE_MOCK_API === "true";

export const api = axios.create({
  baseURL: isMockMode
    ? "/api/v1"
    : (import.meta.env.VITE_API_BASE_URL ?? "/api/v1"),
  headers: { "Content-Type": "application/json" },
});

if (isMockMode) {
  setupMockApi();
}

// Only installed when explicitly enabled — importing this file has zero
// effect otherwise, so it's safe to leave the import in main.tsx.
export function setupMockApi() {
  const mock = new MockAdapter(api, { delayResponse: 400 });

  // in-memory store, mirrors what a real DB would hold for this session
  const bookings: any[] = [];

  // Return all bookings (useful for verifying created bookings in the UI)
  mock.onGet(/\/bookings\/?$/).reply(() => [200, bookings]);

  mock.onGet("/services").reply(200, serviceItems);

  mock.onGet(/\/services\/[^/]+\/availability/).reply((config) => {
    const [path, queryString] = (config.url ?? "").split("?");
    const cleanPath = path.replace(/\/$/, "");
    const segments = cleanPath.split("/");
    const serviceId = segments[segments.length - 2]; // .../{id}/availability

    const service = serviceItems.find(
      (s: { id: string | number }) => String(s.id) === serviceId,
    );
    if (!service) {
      return [404, { error: `Service ${serviceId} not found` }];
    }

    const params = new URLSearchParams(queryString ?? "");
    const from = params.get("from");
    const to = params.get("to");

    const allDates = availability[serviceId] ?? {};
    const availabilityService = Object.entries(allDates)
      .filter(([date]) => (!from || date >= from) && (!to || date <= to))
      .map(([date, slots]) => ({ date, slots }));

    return [
      200,
      {
        serviceId,
        serviceName: service.name,
        durationMinutes: service.durationMinutes,
        availabilityService,
      },
    ];
  });

  mock.onGet(/\/services\/.+/).reply((config) => {
    // Clean query strings and trailing slashes
    const cleanUrl = (config.url ?? "").split("?")[0].replace(/\/$/, "");
    const id = cleanUrl.split("/").pop();

    const item = serviceItems.find((s) => String(s.id) === id);

    return item ? [200, item] : [404, { error: `Service ${id} not found` }];
  });

  mock.onPost(/\/bookings\/?$/).reply((config) => {
    const payload = config.data ? JSON.parse(config.data) : {};
    const {
      serviceId,
      date,
      slot,
      address,
    }: {
      serviceId?: string;
      date?: string;
      slot?: { id: string; startTime: string; endTime: string };
      address?: string;
    } = payload;

    // 1. Validate the payload shape
    const fieldErrors: Record<string, string> = {};
    if (!serviceId) fieldErrors.serviceId = "Service is required";
    if (!date) fieldErrors.date = "Please select a date";
    if (!slot?.id) fieldErrors.slot = "Please select a time slot";
    if (!address || !address.trim())
      fieldErrors.address = "Address is required";

    if (Object.keys(fieldErrors).length > 0) {
      return [
        422,
        {
          code: "VALIDATION_ERROR",
          message: "Some fields need your attention",
          fieldErrors,
        },
      ];
    }

    // 2. Service must exist (mirrors the availability handler's check)
    const service = serviceItems.find(
      (s: { id: string | number }) => String(s.id) === String(serviceId),
    );
    if (!service) {
      return [404, { error: `Service ${serviceId} not found` }];
    }

    // 3. Slot must exist for that service/date and still be available
    const dateSlots: Slot[] = availability[serviceId]?.[date as string] ?? [];
    const matchedSlot = dateSlots.find((s) => s.id === slot!.id);

    if (!matchedSlot || matchedSlot.available === false) {
      return [
        409,
        {
          code: "SLOT_UNAVAILABLE",
          message: "That time slot is no longer available",
          fieldErrors: {
            slot: "This slot was just taken — please pick another",
          },
        },
      ];
    }

    // 4. "Book" it — flip availability so subsequent GET availability
    // calls reflect the change, same in-memory data the GET handler reads
    matchedSlot.available = false;

    const booking: Booking = {
      id: `bk_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      status: "confirmed",
      serviceId: String(serviceId),
      serviceName: service.name,
      date: date as string,
      slot: {
        id: matchedSlot.id,
        startTime: matchedSlot.startTime,
        endTime: matchedSlot.endTime,
      },
      address: address!.trim(),
      price:
        service.price != null
          ? { currency: service.currency, amount: service.price }
          : null,
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return [201, booking];
  });

  mock.onAny().reply(500, {
    error: "No mock handler for this request",
  } as ApiErrorResponse);
}
