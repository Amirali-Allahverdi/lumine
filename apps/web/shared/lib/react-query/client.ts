import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

import { handleError } from "./error-handlers";

export const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error, "Query");
      },
    }),

    mutationCache: new MutationCache({
      onError: (error) => {
        handleError(error, "Mutation");
      },
    }),

    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
      },

      mutations: {
        retry: 0,
      },
    },
  });
