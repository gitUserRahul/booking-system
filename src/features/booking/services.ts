import { api } from "@/shared/api/client";

export class Bookings {
  static async createBooking(payload: any) {
    const resp = await api.post("/bookings", payload);
    return resp.data;
  }
  static async getBooking(id: string) {
    const resp = await api.get(`/bookings/${id}`);
    return resp.data;
  }
  static async getBookings() {
    const resp = await api.get("/bookings");
    return resp.data;
  }
}
