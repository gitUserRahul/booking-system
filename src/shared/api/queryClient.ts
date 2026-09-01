import { QueryClient, type DefaultOptions } from "@tanstack/react-query";

export const queryProvider: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnWindowFocus: false,
    retry: 1,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryProvider,
});
