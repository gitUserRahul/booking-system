// src/shared/api/mock/setupMock.ts

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
  const serviceItems = [
    {
      id: "svc_001",
      name: "Home Cleaning",
      description:
        "Professional home cleaning service for apartments and houses.",
      category: "Home Services",
      provider: {
        id: "provider_001",
        name: "CleanPro",
      },
      price: 45,
      currency: "USD",
      durationMinutes: 90,
      rating: 4.8,
    },

    {
      id: "svc_002",
      name: "AC Repair",
      description:
        "Professional air conditioner inspection and repair service.",
      category: "Repair",
      provider: {
        id: "provider_002",
        name: "FixFast",
      },
      price: 60,
      currency: "USD",
      durationMinutes: 60,
      rating: 4.6,
    },

    {
      id: "svc_003",
      name: "Haircut & Styling",
      description:
        "Professional haircut and styling service at your preferred location.",
      category: "Beauty",
      provider: {
        id: "provider_003",
        name: "StyleStudio",
      },
      price: 30,
      currency: "USD",
      durationMinutes: 45,
      rating: 3.9,
    },

    {
      id: "svc_004",
      name: "Plumbing Repair",
      description:
        "Professional plumbing inspection and household plumbing repair.",
      category: "Repair",
      provider: {
        id: "provider_004",
        name: "HomeFix",
      },
      price: 55,
      currency: "USD",
      durationMinutes: 60,
      rating: 2.5,
    },
  ];

  mock.onGet("/api/v1/services").reply(200, serviceItems);

  //   mock.onGet(/\/api\/v1\/services\/\w+/).reply((config) => {
  //     const id = config.url!.split("/").pop();
  //     const item = serviceItems.find((i) => i.id === id);
  //     if (!item) {
  //       const body: ApiErrorResponse = { error: "Service not found" };
  //       return [404, body];
  //     }
  //     return [200, item];
  //   });

  //   mock.onPost("/api/v1/services").reply((config) => {
  //     // FormData bodies come through as a real FormData instance here too —
  //     // read fields the same way your backend would.
  //     const form = config.data as FormData;
  //     const name = form.get("name") as string;
  //     const price = Number(form.get("price"));

  //     if (!name) {
  //       const body: ApiErrorResponse = {
  //         error: "Validation failed",
  //         details: [{ path: "name", message: "Name is required" }],
  //       };
  //       return [400, body];
  //     }

  //     const created = {
  //       id: String(Date.now()),
  //       name,
  //       price,
  //       category: form.get("category") as string,
  //       available: true,
  //       imageUrl: null,
  //     };
  //     serviceItems.push(created);
  //     return [201, created];
  //   });

  //   mock.onPatch(/\/api\/v1\/services\/\w+/).reply((config) => {
  //     const id = config.url!.split("/").pop();
  //     const updates = JSON.parse(config.data);
  //     serviceItems = serviceItems.map((i) =>
  //       i.id === id ? { ...i, ...updates } : i,
  //     );
  //     return [200, serviceItems.find((i) => i.id === id)];
  //   });

  //   mock.onDelete(/\/api\/v1\/services\/\w+/).reply((config) => {
  //     const id = config.url!.split("/").pop();
  //     serviceItems = serviceItems.filter((i) => i.id !== id);
  //     return [204];
  //   });

  // Anything not explicitly handled falls through as a 500 instead of
  // silently hitting the real network — surfaces gaps in your mocks fast.
  mock.onAny().reply(500, {
    error: "No mock handler for this request",
  } as ApiErrorResponse);
}
