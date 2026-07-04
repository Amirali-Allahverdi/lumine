"use client";

import { useQuery } from "@tanstack/react-query";
import { meQueryOptions } from "../queries/me";
import { useIsLoggedIn } from "@/features/auth/store/auth_1";

export function useMe() {
  const isLoggedIn = useIsLoggedIn();

  return useQuery({
    ...meQueryOptions(),

    enabled: isLoggedIn,
  });
}
