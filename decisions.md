# Technical Decisions

This document records major technical decisions made in the project, why they were chosen, alternatives considered, and why those alternatives were rejected.

## 1) Use TanStack Query (React Query) for server state
1. What was chosen?
   - Use TanStack Query (a.k.a. React Query) for all server-side data fetching, caching, and mutations.
2. Why was it chosen?
   - Provides caching, background refetching, retries,  and a well-tested mutation model out of the box.
   - Keeps server state logic isolated from local UI state, making components simpler and easier to test.
   - Minimal boilerplate and good community support.
3. Alternatives considered
   - Manage remote data with `useState`/`useReducer` inside components.
   - Global state stores (Redux, Zustand) holding fetched data.
   - SWR (Vercel) as an alternative data fetching library.
4. Why alternatives were rejected
   - `useState`/`useReducer`: forces manual caching, refetch logic, and retry behavior; quickly becomes complex across many components.
   - Redux/Zustand: adds global state machinery and boilerplate to handle server cache semantics (stale-while-revalidate, background refresh) that React Query already handles.
   - SWR: viable alternative, but React Query was chosen for its mature mutation API and better first-class support for optimistic updates and query invalidation semantics used in this app.

## 2) Use axios + axios-mock-adapter for dev mocking
1. What was chosen?
   - Use `axios` as the HTTP client and `axios-mock-adapter` to provide an in-memory mock API during development.
2. Why was it chosen?
   - App already uses `axios`, so mocking at the axios adapter level keeps code unchanged (services keep calling `api.get`/`api.post`).
   - `axios-mock-adapter` is lightweight and easy to configure for simple in-memory responses and validation logic.
   - Makes it easy to flip between real API and mock with an environment flag (`VITE_USE_MOCK_API`).
3. Alternatives considered
   - Build a small Express/JSON server for mocks.
   - Use MSW (Mock Service Worker) for request interception in the browser.
   - Use json-server or a mock backend process.
4. Why alternatives were rejected
   - Express/json-server: requires running and maintaining a separate process and wiring CORS during development; more infrastructure than needed for a small demo app.
   - MSW: powerful and recommended for complex mocking, but introduces extra setup and a different interception model; axios-mock-adapter keeps mocking local and aligned with `axios` usage.
   - json-server: good for static fixtures but less flexible for behavior like flipping slot availability on booking or returning structured validation errors.

## 3) Feature-based folder organization and thin service classes
1. What was chosen?
   - Organize code by feature folder (`features/booking`, `features/services`) and expose small service classes (`Services`, `Bookings`) with thin methods that call `api`.
   - Encapsulate network logic in service methods and expose React Query hooks alongside UI components.
2. Why was it chosen?
   - Keeps related code (UI, hooks, service clients) close together — easier to find and maintain.
   - The thin service classes create a stable boundary between UI and networking so the underlying transport can be swapped without touching components.
3. Alternatives considered
   - Flat structure (all hooks in one folder, all components in another).
   - Heavy domain store (large centralized store for all entities and fetching logic).
4. Why alternatives were rejected
   - Flat structure becomes harder to navigate as the app grows.
   - Centralized store duplicates concerns React Query already solves and increases coupling between features.

## 4) React Router for client routing
1. What was chosen?
   - Use `react-router` (browser router) to manage client routes and nested navigation.
2. Why was it chosen?
   - Mature, widely used routing library with declarative route definitions, nested routes, and navigation helpers (`useNavigate`, `Link`).
   - Good DX for defining public pages (services list, booking page, booking details) and programmatic navigation after actions.
3. Alternatives considered
   - Implement a custom routing solution (history API + manual rendering).
   - Use hash-based navigation.
4. Why alternatives were rejected
   - Custom router: more error-prone and reimplements complex features (nested routing, param parsing, history integration).
   - Hash routing: supported but less desirable for clean URLs and server parity; React Router supports both if needed.

## 5) Keep service layer thin so backend can be swapped easily
1. What was chosen?
   - Implement a thin service layer (`features/*/services.ts`) that calls `api` and returns `response.data`; all UI code uses these services via hooks.
2. Why was it chosen?
   - Clear separation of concerns: networking code lives in one place; hooks and components focus on UI logic.
   - When moving to a real backend, only the services (or `api` baseURL) need changes, tests remain straightforward.
3. Alternatives considered
   - Scatter `api` calls across components directly.
   - Co-locate more complex logic (parsing, business rules) in components.
4. Why alternatives were rejected
   - Scattering API calls increases duplication and coupling; makes refactors and testing harder.

---
