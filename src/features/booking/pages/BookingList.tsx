import React from "react";
import { Link } from "react-router-dom";
import { useGetBookings } from "../api/useGetBookings";

const BookingList = () => {
  const { data: bookings, isLoading, isError, error } = useGetBookings();

  if (isLoading) return <p className="p-4 text-center">Loading bookings...</p>;
  if (isError)
    return (
      <p className="p-4 text-center text-red-500">
        Failed to load bookings: {String(error)}
      </p>
    );
  if (!bookings || bookings.length === 0)
    return <p className="p-4 text-center">You have no bookings yet.</p>;

  return (
    <div className="page max-w-3xl w-full mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <ul className="space-y-3">
        {bookings.map((bookingItem: any) => (
          <li key={bookingItem.id} className="p-4 rounded border bg-white">
            <div className="flex justify-between items-start w-full">
              <div>
                <Link
                  to={`/bookings/${bookingItem.id}`}
                  className="text-lg font-semibold text-blue-600"
                >
                  {bookingItem.serviceName}
                </Link>
                <p className="text-sm text-gray-600">
                  {bookingItem.date} · {bookingItem.slot.startTime} -{" "}
                  {bookingItem.slot.endTime}
                </p>
                <p className="text-sm text-gray-600">{bookingItem.address}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {bookingItem.price?.currency} {bookingItem.price?.amount}
                </p>
                <p className="text-sm text-gray-500 bg-green-500 p-2 rounded-lg">
                  {bookingItem.status}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
