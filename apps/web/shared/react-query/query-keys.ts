export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
    profile: (id: string) => ["auth", "profile", id] as const,
  },
};
