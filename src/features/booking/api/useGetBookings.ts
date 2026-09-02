import { useQuery } from "@tanstack/react-query";
import { Bookings } from "../services";

export const useGetBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: () => Bookings.getBookings(),
  });
};
