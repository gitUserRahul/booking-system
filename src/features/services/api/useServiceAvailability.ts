import { useQuery } from "@tanstack/react-query";
import { Services } from "../services.ts";

export const useServiceAvailability = (id: string) => {
  return useQuery({
    queryKey: ["service-availability", id],
    queryFn: () => Services.getServiceAvailability(id as string),
    enabled: !!id,
  });
};
