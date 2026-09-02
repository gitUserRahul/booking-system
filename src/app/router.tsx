import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { ServicesDisplay, SingleServicePage } from "@/features/services";
import BookingPage from "@/features/booking/pages/BookingPage";
import BookingDetails from "@/features/booking/pages/BookingDetails";
import BookingList from "@/features/booking/pages/BookingList";

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
        path: "/bookings/:id", // Booking detail page
        element: <BookingDetails />,
      },
      {
        path: "/bookings", // Bookings list
        element: <BookingList />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
