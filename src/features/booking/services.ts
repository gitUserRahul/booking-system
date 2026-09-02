import { api } from '@/shared/api/client';

export class Bookings {
  static async createBooking(payload: any) {
    const resp = await api.post('/bookings', payload);
    return resp.data;
  }
}
