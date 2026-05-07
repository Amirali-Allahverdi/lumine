export const AUTH_STEP_MAP: Record<string, number> = {
  "/auth": 0,
  "/auth/otp": 0,

  "/auth/basic-info": 1,
  "/auth/technical-info": 2,
};

export const AUTH_TOTAL_STEPS = 3;

export const AUTH_STATIC_ROUTES = ["/auth", "/auth/otp"];
