import { useQuery } from "@tanstack/react-query";
import { Services } from "../services.ts";

export const useServiceItem = (id: string) => {
  return useQuery({
    queryKey: ["service-item", id],
    queryFn: () => Services.getServiceById(id as string),
    enabled: !!id,
  });
};
