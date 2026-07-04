import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { tokenService } from "@/shared/lib/http/token-service";
import type {
  SendPhoneOtpResponse,
  VerifyPhoneOtpResponse,
  UserStatus,
} from "@/features/auth/types/auth_1";

interface RegistrationState {
  phoneNumber: string | null;
  otpExpire: number | null;
  otpCode: string | null;
  userToken: string | null;
  stepRegistration: number | null;
}

interface AuthenticatedState {
  status: UserStatus;
  stepRegistration: 6;
}

interface AuthState {
  registration: RegistrationState;
  authenticated: AuthenticatedState | null;

  setSendOtpData: (response: SendPhoneOtpResponse) => void;
  setVerifyOtpData: (response: VerifyPhoneOtpResponse) => void;
  setAuthenticatedUser: (status: UserStatus, accessToken: string) => void;
  clearRegistration: () => void;
  logout: () => void;
  resetAuth: () => void;
}

const initialRegistrationState: RegistrationState = {
  phoneNumber: null,
  otpExpire: null,
  otpCode: null,
  userToken: null,
  stepRegistration: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      registration: initialRegistrationState,
      authenticated: null,

      setSendOtpData: (response) =>
        set((state) => ({
          registration: {
            ...state.registration,
            phoneNumber: response.data.phone_number,
            otpExpire: response.data.expired_OTP,
            otpCode: response.data.OTP_code ?? null,
          },
        })),

      setVerifyOtpData: (response) => {
        const data = response.data;

        if ("user_token" in data && data.step_registeration < 6) {
          set((state) => ({
            registration: {
              ...state.registration,
              userToken: data.user_token,
              stepRegistration: data.step_registeration,
            },
            authenticated: null,
          }));
          return;
        }

        if (data.step_registeration === 6 && data.status === "pendding") {
          set({
            registration: initialRegistrationState,
            authenticated: {
              status: "pendding",
              stepRegistration: 6,
            },
          });
          return;
        }

        if (data.step_registeration === 6 && data.status === "rejected") {
          set({
            registration: initialRegistrationState,
            authenticated: {
              status: "rejected",
              stepRegistration: 6,
            },
          });
          return;
        }

        if (data.step_registeration === 6 && data.status === "accept") {
          const { access, refresh } = data.tokens;

          tokenService.setAccessToken(access);
          tokenService.setRefreshToken(refresh);

          set({
            registration: initialRegistrationState,
            authenticated: { status: "accept", stepRegistration: 6 },
          });
          return;
        }
      },

      setAuthenticatedUser: (status, accessToken) => {
        tokenService.setAccessToken(accessToken);
        set({ authenticated: { status, stepRegistration: 6 } });
      },

      clearRegistration: () =>
        set((state) => ({
          registration: initialRegistrationState,
          authenticated: state.authenticated,
        })),

      logout: () => {
        tokenService.clearAll();
        set({ registration: initialRegistrationState, authenticated: null });
      },

      resetAuth: () => {
        tokenService.clearAll();
        set({
          registration: initialRegistrationState,
          authenticated: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        // در SSR از localStorage استفاده نمی‌شه
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      partialize: (state) => ({
        registration: {
          phoneNumber: state.registration.phoneNumber,
          userToken: state.registration.userToken,
          stepRegistration: state.registration.stepRegistration,
          // این دو فیلد persist نمی‌شن (حساس)
          otpExpire: null,
          otpCode: null,
        },
        authenticated: state.authenticated,
      }),
    },
  ),
);

// ─── Selectors ──────────────────────────────────────────────

export const useIsLoggedIn = () =>
  useAuthStore(
    (s) =>
      s.authenticated?.status === "accept" && !!tokenService.getAccessToken(),
  );

export const useIsRegistering = () =>
  useAuthStore(
    (s) =>
      !!s.registration.userToken &&
      (s.registration.stepRegistration ?? 0) > 0 &&
      (s.registration.stepRegistration ?? 0) < 6,
  );

export const useIsPending = () =>
  useAuthStore((s) => s.authenticated?.status === "pendding");

export const useIsRejected = () =>
  useAuthStore((s) => s.authenticated?.status === "rejected");

export const useAuthStatus = () =>
  useAuthStore((s) => s.authenticated?.status ?? null);

export const useRegistrationStep = () =>
  useAuthStore((s) => s.registration.stepRegistration);
