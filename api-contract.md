# API Contract

This document describes the HTTP API surface used by the app, the request/response shapes, and common error behavior.

Base URL
- All endpoints are served under: `/api/v1`
- Content-Type: `application/json`

### API Overview
- GET  /services
- GET  /services/{service_id}
- GET  /services/{service_id}/availability
- POST /bookings
- GET  /bookings
- GET  /bookings/{booking_id}

---

### Services endpoints

GET /services
- Description: Return list of available services.
- Request: none
- Success (200): JSON array of service items
  - Example item:
    {
      "id": "svc_001",
      "name": "Home Cleaning",
      "description": "...",
      "category": "Home Services",
      "provider": { "id": "provider_001", "name": "CleanPro" },
      "price": 45,
      "currency": "USD",
      "durationMinutes": 90,
      "rating": 4.8
    }

GET /services/{service_id}
- Description: Return a single service object by id.
- Request: none
- Success (200): single service item (same shape as above)
- Error (404): Service not found
  - Example: `{ "error": "Service svc_999 not found" }`

GET /services/{service_id}/availability
- Description: Return availability calendar for a service.
- Query params (optional): `from`, `to` (ISO date strings to filter date range)
- Success (200):
  {
    "serviceId": "svc_001",
    "serviceName": "Home Cleaning",
    "durationMinutes": 90,
    "availabilityService": [
      {
        "date": "2026-09-02",
        "slots": [
          { "id": "s_1", "startTime": "09:00", "endTime": "10:30", "available": true },
          ...
        ]
      },
      ...
    ]
  }
- Error (404): Service not found

---

### Bookings endpoints

POST /bookings
- Description: Create a booking for a service slot.
- Request (JSON):
  {
    "serviceId": "svc_001",
    "date": "2026-09-02",
    "slot": { "id": "s_1", "startTime": "09:00", "endTime": "10:30" },
    "address": "123 Main St"
  }
- Success (201): returns created booking object
  - Booking shape:
    {
      "id": "bk_...",
      "status": "confirmed",
      "serviceId": "svc_001",
      "serviceName": "Home Cleaning",
      "date": "2026-09-02",
      "slot": { "id": "s_1", "startTime": "09:00", "endTime": "10:30" },
      "address": "123 Main St",
      "price": { "currency": "USD", "amount": 45 } | null,
      "createdAt": "2026-09-02T12:34:56.000Z"
    }
- Validation error (422): missing/invalid fields
  - Shape:
    {
      "code": "VALIDATION_ERROR",
      "message": "Some fields need your attention",
      "fieldErrors": { "date": "Please select a date", "address": "Address is required" }
    }
- Conflict (409): slot unavailable
  - Shape:
    {
      "code": "SLOT_UNAVAILABLE",
      "message": "That time slot is no longer available",
      "fieldErrors": { "slot": "This slot was just taken — please pick another" }
    }

GET /bookings
- Description: Return list of bookings (server-side store).
- Success (200): JSON array of booking objects (see booking shape above)

GET /bookings/{booking_id}
- Description: Return single booking by id.
- Success (200): booking object
- Error (404): `{ "error": "Booking {id} not found" }`

---

### Common API behavior / Error contract
- All endpoints use JSON request and response bodies.
- Successful GET: 200 OK, POST create: 201 Created.
- Not found: 404. Response body typically `{ "error": "..." }`.
- Validation failures: 422 with `{ code: "VALIDATION_ERROR", message: "...", fieldErrors: { <field>: <message> } }`.
- Resource conflicts (e.g., slot taken): 409 with `{ code: "SLOT_UNAVAILABLE", message: "...", fieldErrors: { slot: "..." } }`.
- Server errors: 500 and a generic body `{ "error": "No mock handler for this request" }` in mock; backend should provide a consistent error schema.

Client expectations / notes
- The client code expects the booking POST to return the created booking object (including `id`) so it can navigate to `/bookings/{id}`.
- The mock flips slot `available` to `false` when a booking is created so subsequent availability requests reflect the change.
- When implementing a real backend, preserve the same request/response shapes (or update hooks/services accordingly).

---
