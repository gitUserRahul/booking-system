import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookings } from "../services";

export const useCreateBooking = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => Bookings.createBooking(payload),
    onSuccess: () => {
      // Refresh availability (so booked slot becomes unavailable) and any bookings list
      qc.invalidateQueries({ queryKey: ["service-availability"] });
      qc.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
