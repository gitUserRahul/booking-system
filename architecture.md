# Booking System — Architecture Overview

This document gives a short, easy-to-understand view of the project's structure, data flow, and where key features live.

## Goal
A small SPA for browsing services, viewing availability, and creating bookings. Uses a simple mock API during development and React Query for remote data handling.

## High-level structure
- src/
  - app/ — app shell and router
  - features/
    - services/ — service-listing, service APIs and UI components
    - booking/ — booking pages, hooks, and service client
  - shared/
    - api/ — axios instance and mock adapter (mock handlers)
    - components/ — small shared UI components (e.g., Navbar)
    - utils/ — small helpers (e.g., localStorage helper)
  - main.tsx, index.css, etc.

## Routing
- `/` -> Services list (index)
- `/services/:id` -> Single service page
- `/services/:id/availability` -> BookingPage (select date/slot, submit)
- `/bookings` -> Bookings list (combined server + localStorage)
- `/bookings/:id` -> Booking detail

Routes are defined in `src/app/router.tsx`.

## Data flow & API
- Network requests are made through `src/shared/api/client.ts` (axios + MockAdapter).
- When VITE_USE_MOCK_API=true, the mock handlers defined there respond to `/services`, `/services/:id`, `/services/:id/availability`, and `/bookings` (POST/GET).
- Features use small service classes under `features/*/services.ts` which call `api.get`/`api.post`.
- React Query (`@tanstack/react-query`) is used via feature hooks:
  - `useServiceAvailability`, `useServiceItem` — fetch service and availability
  - `useCreateBooking` — mutation to create bookings
  - `useGetBookings`, `useBooking` — fetch bookings

## Booking flow
1. User selects a service, date, and slot in `BookingPage`.
2. Submit calls `useCreateBooking().mutate(payload)` which posts to `/bookings`.
3. Mock API performs validation, flips slot availability in-memory, creates a booking object and returns it.
4. On success the app:
   - saves a local copy via `src/shared/utils/localStorageBookings.ts`
   - invalidates availability queries (so UI updates)
   - navigates to `/bookings/:id` (BookingDetails)

## Local storage
- Local fallback stored under key `bookings` via `addLocalBooking`, `getLocalBookings`.
- Booking list combines server results with localStorage entries (deduplicated by id) so newly created bookings show immediately.

## Mock data
- `src/shared/api/mock/services.ts` — service catalog (name, price, currency, duration)
- `src/shared/api/mock/availability.ts` — per-service slot availability
- `src/shared/api/mock/booking.ts` — in-memory bookings store used by mock adapter

## Notes & next steps
- Validation: the mock returns 422 for validation errors and 409 for unavailable slots — hook can map these into field errors for the UI.
- Persistence: replace mock API with real backend; keep service classes and hooks unchanged (they call `api`), only `client.ts` baseURL / mock setup changes.

## Where to look first
- Router: `src/app/router.tsx`
- Booking UI: `src/features/booking/pages/BookingPage.tsx`
- Booking services/hooks: `src/features/booking/services.ts`, `src/features/booking/api/*`
- Mock adapter: `src/shared/api/client.ts` and `src/shared/api/mock/` folder
