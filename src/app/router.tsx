import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { ServicesDisplay, SingleServicePage } from "@/features/services";
import BookingPage from "@/features/booking/pages/BookingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Loads ServicesDisplay on initial render
        element: <ServicesDisplay />,
      },
      {
        path: "services/:id", // Loads SingleServicePage
        element: <SingleServicePage />,
      },
      {
        path: "/services/:id/availability", // Loads BookingPage
        element: <BookingPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
