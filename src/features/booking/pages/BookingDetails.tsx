import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../api/useBooking';

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading, isError, error } = useBooking(id);

  if (isLoading) return <p className="p-4 text-center">Loading booking...</p>;
  if (isError) return <p className="p-4 text-center text-red-500">Failed to load booking: {String(error)}</p>;
  if (!booking) return <p className="p-4 text-center">Booking not found.</p>;

  return (
    <div className="page max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Booking {booking.id}</h1>
      <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
        <p><strong>Service:</strong> {booking.serviceName}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.slot.startTime} - {booking.slot.endTime}</p>
        <p><strong>Address:</strong> {booking.address}</p>
        {booking.price && (
          <p><strong>Price:</strong> {booking.price.currency} {booking.price.amount}</p>
        )}
        <p><strong>Status:</strong> {booking.status}</p>
        <p className="text-sm text-gray-500">Created: {new Date(booking.createdAt).toLocaleString()}</p>
      </div>
      <Link to="/" className="text-blue-600">Back to services</Link>
    </div>
  );
};

export default BookingDetails;
