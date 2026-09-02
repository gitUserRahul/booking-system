import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useServiceAvailability } from "../../services/api/useServiceAvailability";
import { useServiceItem } from "../../services/api/useServiceItem";
import { useCreateBooking } from "../api/useCreateBooking";
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [address, setAddress] = useState("");
  const { id } = useParams<{ id: string }>();

  const {
    data: serviceAvailability,
    isLoading,
    isError,
    error,
  } = useServiceAvailability(id ?? "");

  const { data: serviceItem } = useServiceItem(id ?? "");
  const createBooking = useCreateBooking();
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!id || !selectedDate || !selectedSlot) return;

    createBooking.mutate(
      {
        serviceId: id,
        date: selectedDate.date,
        slot: {
          id: selectedSlot.id,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        },
        address,
      },
      {
        onSuccess: (booking) => {
          console.log("Booking created", booking);
          // navigate to booking details page
          try {
            const bookingId = booking?.id;
            if (bookingId) navigate(`/bookings/${bookingId}`);
          } catch (e) {
            // ignore
          }
        },
        onError: (err: any) => {
          console.error("Booking error", err);
        },
      },
    );
  };

  console.log(serviceAvailability);

  if (!id) {
    return <p className="p-4 text-center">No service selected.</p>;
  }

  if (isLoading) {
    return <p className="p-4 text-center">Loading service availability...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-center text-red-500">
        Failed to load availability: {String(error)}
      </p>
    );
  }

  const bookingDateTimeText = selectedDate
    ? selectedSlot
      ? `${new Date(selectedDate.date).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })} at ${selectedSlot.startTime}`
      : `${new Date(selectedDate.date).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })} — no time selected yet`
    : "No date or time selected";

  return (
    <div className="page max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        Book {serviceAvailability.serviceName}
      </h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">1. Select date</h2>
        <div className="date-picker flex flex-wrap gap-2">
          {serviceAvailability?.availabilityService?.map((day) => (
            <button
              key={day.date}
              type="button"
              className={`date-chip px-3 py-1.5 rounded border text-sm ${
                day.date === selectedDate?.date
                  ? "active bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedDate(day); // store the whole day object
                setSelectedSlot(null); // reset slot when date changes
              }}
            >
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">2. Select time slot</h2>
        <div className="flex flex-wrap gap-2">
          {selectedDate?.slots?.length ? (
            selectedDate.slots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                className={`slot-chip px-3 py-1.5 rounded border text-sm transition-colors ${
                  selectedSlot?.id === slot.id
                    ? "active bg-blue-600 text-white border-blue-600"
                    : slot.available
                      ? "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      : "disabled opacity-50 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.startTime} - {slot.endTime}
              </button>
            ))
          ) : selectedDate ? (
            <p className="no-slots text-sm text-gray-500">
              No slots available on this date
            </p>
          ) : (
            <p className="text-sm text-gray-400">Select date first</p>
          )}
        </div>
      </section>

      {/* booking form */}

      <section>
        <form
          className="customer-form space-y-4 max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          <label className="block text-sm font-medium">
            Address
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* {submitError?.fieldErrors?.address && (
              <span className="field-error text-xs text-red-500">
                {submitError.fieldErrors.address}
              </span>
            )} */}
          </label>
          <div className="booking-summary bg-gray-50 p-4 rounded border border-gray-200 space-y-1">
            <h2 className="font-bold">Booking summary</h2>
            <p className="text-sm">{serviceAvailability.serviceName}</p>
            <p className="text-sm text-gray-600">{bookingDateTimeText}</p>
            <p className="text-sm text-gray-600">{address}</p>
            {serviceItem && (
              <p className="text-sm font-semibold">
                {serviceItem.currency} {serviceItem.price}
              </p>
            )}
          </div>

          {/* {submitStatus === "error" &&
          submitError?.code !== "VALIDATION_ERROR" && (
            <ErrorView error={submitError} />
          )} */}

          <button
            type="submit"
            className="btn btn-primary w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={createBooking.isLoading}
          >
            {createBooking.isLoading ? "Confirming..." : "Confirm booking"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default BookingPage;
