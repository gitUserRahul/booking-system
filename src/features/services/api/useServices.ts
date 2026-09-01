import { useQuery } from "@tanstack/react-query";
import { Services } from "../services.ts";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: Services.getAllServices,
  });
};
