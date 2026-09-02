import { api } from "@/shared/api/client";

export class Services {
  static async getAllServices() {
    const response = await api.get("/services");
    return response.data;
  }

  static async getServiceById(id: string) {
    const response = await api.get(`/services/${id}`);
    return response.data;
  }

  static async getServiceAvailability(id: string) {
    const response = await api.get(`/services/${id}/availability`);
    return response.data;
  }
}
