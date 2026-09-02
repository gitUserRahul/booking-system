import { useQuery } from '@tanstack/react-query';
import { Bookings } from '../services';

export const useBooking = (id?: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => Bookings.getBooking(id as string),
    enabled: !!id,
  });
};
