import React from 'react'

const BookingForm = () => {
  return (
    {/* <section>
        <h2>3. Your details</h2>
        <form
          className="customer-form space-y-4 max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          <label className="block text-sm font-medium">
            Full name
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
            {submitError?.fieldErrors?.name && (
              <span className="field-error text-xs text-red-500">
                {submitError.fieldErrors.name}
              </span>
            )}
          </label>
          <label className="block text-sm font-medium">
            Email
            <input
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
            {submitError?.fieldErrors?.email && (
              <span className="field-error text-xs text-red-500">
                {submitError.fieldErrors.email}
              </span>
            )}
          </label>
          <label className="block text-sm font-medium">
            Phone
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
            {submitError?.fieldErrors?.phone && (
              <span className="field-error text-xs text-red-500">
                {submitError.fieldErrors.phone}
              </span>
            )}
          </label>
          <label className="block text-sm font-medium">
            Address
            <input
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
            />
            {submitError?.fieldErrors?.address && (
              <span className="field-error text-xs text-red-500">
                {submitError.fieldErrors.address}
              </span>
            )}
          </label>

          <div className="booking-summary bg-gray-50 p-4 rounded border border-gray-200 space-y-1">
            <h2 className="font-bold">Booking summary</h2>
            <p className="text-sm">{service.name}</p>
            <p className="text-sm text-gray-600">
              {date}
              {selectedSlot
                ? ` at ${selectedSlot.start.slice(11, 16)}`
                : " — no time selected yet"}
            </p>
            <p className="text-sm font-semibold">
              {service.currency} {service.price}
            </p>
          </div>

          {submitStatus === "error" &&
            submitError?.code !== "VALIDATION_ERROR" && (
              <ErrorView error={submitError} />
            )}

          <button
            type="submit"
            className="btn btn-primary w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!canSubmit}
          >
            {submitStatus === "submitting"
              ? "Confirming..."
              : "Confirm booking"}
          </button>
        </form>
      </section> */}
  )
}

export default BookingForm