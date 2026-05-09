export const queryKeys = {
  users: {
    all: ["users"] as const,

    lists: () => [...queryKeys.users.all, "list"] as const,

    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.users.lists(), filters] as const,

    details: () => [...queryKeys.users.all, "detail"] as const,

    detail: (id: string | number) =>
      [...queryKeys.users.details(), id] as const,
  },

  posts: {
    all: ["posts"] as const,

    lists: () => [...queryKeys.posts.all, "list"] as const,

    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.posts.lists(), filters] as const,

    details: () => [...queryKeys.posts.all, "detail"] as const,

    detail: (id: string | number) =>
      [...queryKeys.posts.details(), id] as const,
  },
};
