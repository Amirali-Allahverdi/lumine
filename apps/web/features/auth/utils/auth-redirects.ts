import type { VerifyPhoneOtpResponseData } from "../types/auth_1";

export const STEP_ROUTES: Record<number, string> = {
  1: "/auth/basic-info",
  2: "/auth/technical-info",
  3: "/auth/technical-info",
  4: "/auth/work-info",
  5: "/auth/portfolio",
};

export const STATUS_ROUTES = {
  pendding: "/auth/pending",
  rejected: "/auth/rejected",
  accept: "/",
} as const;

export function getVerifyOtpRedirectPath(
  data: VerifyPhoneOtpResponseData,
): string {
  if (data.step_registeration === 6) {
    return STATUS_ROUTES[data.status];
  }

  return STEP_ROUTES[data.step_registeration];
}
