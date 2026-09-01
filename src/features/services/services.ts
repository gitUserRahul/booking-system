import { api } from "../../shared/api/client";

export class Services {
  static async getAllServices() {
    const response = await api.get("/services");
    return response.data;
  }
}
