import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

function queryErrorHandler(error: unknown) {
  console.error("Query Error:", error);
}

function mutationErrorHandler(error: unknown) {
  console.error("Mutation Error:", error);
}

export const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),

    mutationCache: new MutationCache({
      onError: mutationErrorHandler,
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
