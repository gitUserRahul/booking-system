# Setup — Run locally

Follow these simple steps to install and run the project on your computer.

1) Prerequisites
- Install Node.js (version 16 or newer). Download from https://nodejs.org
- Git (to clone the repo) or download the zip from GitHub.
- A terminal (Command Prompt, PowerShell, or Git Bash on Windows).

2) Clone and install
1. Open a terminal.
2. Clone the repository (or download and unzip and open the folder):

```
git clone https://github.com/yourname/booking-system.git
cd booking-system
```

3. Install dependencies:

```
npm install
```

3) Environment configuration
- The project can run with a mock API. To enable the mock API set an environment variable:

Create a file called `.env.local` in the project root with this line:

```
VITE_USE_MOCK_API=true
```

- Optional: to point to a real API instead, set `VITE_USE_MOCK_API=false` and set `VITE_API_BASE_URL` to your backend URL.

Example `.env.local` for real API:

```
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://api.example.com
```

4) Run the application (development)
- Start the dev server (Vite):

```
npm run dev
```

- Open your browser at the printed local URL (usually http://localhost:5173).

5) Mock API (development)
- If `VITE_USE_MOCK_API=true`, the mock adapter in the app handles API requests automatically. You do not need to run a separate mock server.
- The mock is inside `src/shared/api/client.ts` and uses in-memory data (services, availability, bookings).

6) Run tests
- If the project includes tests, run:

```
npm test
```

- If no tests are configured, run a quick type check or build to verify:

```
npm run build
```

7) Troubleshooting
- If the dev server port is in use, change the port or stop the other process.
- If dependencies fail to install, check your Node.js version and try `npm cache clean --force` and `npm install` again.

8) Quick flow to test booking
1. Start dev server with `VITE_USE_MOCK_API=true`.
2. Open the app, pick a service, go to availability, choose a date and slot, and submit address.
3. After booking the app should navigate to the booking details page and the booking will also be saved to your browser `localStorage` under key `bookings`.
