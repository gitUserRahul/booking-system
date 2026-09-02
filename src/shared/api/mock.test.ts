import { describe, it, expect, beforeAll } from "vitest";
import { api, setupMockApi } from "./client";

beforeAll(() => {
  // Ensure mock handlers are registered for tests
  setupMockApi();
});

describe("mockApi.createBooking - validation", () => {
  it("returns 422 when required fields are missing", async () => {
    try {
      await api.post("/bookings", {});
      // Should not reach here
      throw new Error("Request should have failed with 422");
    } catch (err: any) {
      const res = err.response;
      expect(res).toBeDefined();
      expect(res.status).toBe(422);
      expect(res.data).toHaveProperty("code", "VALIDATION_ERROR");
      expect(res.data).toHaveProperty("fieldErrors");
      const fields = res.data.fieldErrors;
      expect(fields).toHaveProperty("serviceId");
      expect(fields).toHaveProperty("date");
      expect(fields).toHaveProperty("slot");
      expect(fields).toHaveProperty("address");
    }
  });

  it("returns field error for empty address", async () => {
    const payload = {
      serviceId: "svc_001",
      date: "2026-09-02",
      slot: { id: "slot_1", startTime: "09:00", endTime: "10:00" },
      address: "   ", // empty after trim
    };

    try {
      await api.post("/bookings", payload);
      throw new Error("Request should have failed with 422");
    } catch (err: any) {
      const res = err.response;
      expect(res).toBeDefined();
      expect(res.status).toBe(422);
      expect(res.data.code).toBe("VALIDATION_ERROR");
      expect(res.data.fieldErrors).toHaveProperty("address");
    }
  });
});

describe("mockApi.createBooking - success", () => {
  it("creates a booking and returns 201 with booking object", async () => {
    const payload = {
      serviceId: "svc_001",
      date: "2026-09-02",
      slot: { id: "slot_005", startTime: "09:00", endTime: "10:30" },
      address: "123 Test Lane",
    };

    const res = await api.post("/bookings", payload);

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    const booking = res.data;
    expect(booking).toBeDefined();
    expect(booking).toHaveProperty("id");
    expect(booking.serviceId).toBe("svc_001");
    expect(booking.date).toBe("2026-09-02");
    expect(booking.slot).toEqual(payload.slot);
    expect(booking.address).toBe("123 Test Lane");
    expect(booking.status).toBe("confirmed");
    // price should be present for svc_001 (45 USD from mock data)
    expect(booking.price).toBeDefined();
    expect(booking.price).toHaveProperty("currency");
    expect(booking.price).toHaveProperty("amount");
  });
});

describe("mockApi.createBooking - conflict", () => {
  it("returns 409 if the same slot is booked twice", async () => {
    const payload = {
      serviceId: "svc_001",
      date: "2026-09-02",
      slot: { id: "slot_006", startTime: "13:00", endTime: "14:30" },
      address: "456 Conflict Rd",
    };

    // first booking should succeed
    const first = await api.post("/bookings", payload);
    expect(first.status).toBe(201);

    // second booking for same slot should fail with 409
    try {
      await api.post("/bookings", payload);
      throw new Error("Request should have failed with 409");
    } catch (err: any) {
      const res = err.response;
      expect(res).toBeDefined();
      expect(res.status).toBe(409);
      expect(res.data).toHaveProperty("code", "SLOT_UNAVAILABLE");
      expect(res.data.fieldErrors).toHaveProperty("slot");
    }
  });
});
