import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { tokenService } from "./token-service";
import { useAuthStore } from "@/features/auth/store/auth_1";

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

// ─── Endpoint Categories ────────────────────────────────────

const PUBLIC_ENDPOINTS = ["/auth/send-otp/", "/auth/verify-otp/"];

const REGISTRATION_ENDPOINTS = [
  "/auth/basic-info/",
  "/auth/technical-info/",
  "/auth/work-info/",
  "/auth/portfolio/",
  "/auth/set-role/",
  "/auth/categories/",
  "/auth/p-category/",
];

// ─── Axios Instance ─────────────────────────────────────────

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// ─── Request Interceptor ────────────────────────────────────

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.headers?.["X-Skip-Interceptor"]) {
      delete config.headers["X-Skip-Interceptor"];
      return config;
    }

    const url = config.url ?? "";

    if (PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint))) {
      return config;
    }

    if (REGISTRATION_ENDPOINTS.some((endpoint) => url.includes(endpoint))) {
      const userToken = useAuthStore.getState().registration.userToken;

      if (!userToken) {
        safeRedirect("/auth");
        return Promise.reject({
          message: "User token required for registration",
          status: 401,
        });
      }

      config.headers.token = userToken;
      return config;
    }

    let accessToken = tokenService.getAccessToken();

    if (!accessToken && tokenService.getRefreshToken()) {
      try {
        accessToken = await tokenService.refreshAccessToken();

        const currentState = useAuthStore.getState();

        if (
          !currentState.authenticated ||
          currentState.authenticated.status !== "accept"
        ) {
          currentState.setAuthenticatedUser("accept", accessToken);
        }
      } catch {
        safeRedirect("/auth");
        return Promise.reject({
          message: "Access token required",
          status: 401,
        });
      }
    }

    if (!accessToken) {
      safeRedirect("/auth");
      return Promise.reject({
        message: "Access token required",
        status: 401,
      });
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────

// این متغیرها فقط client-side استفاده می‌شن
// با guard از استفاده در SSR جلوگیری می‌کنیم
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const status = error.response?.status;

    // ─── Handle 401 Unauthorized ────────────────────────────

    if (status === 401 && originalRequest && !originalRequest._retry) {
      // اگر خود refresh endpoint خطا داد → logout
      if (originalRequest.url?.includes("/auth/refresh-token/")) {
        useAuthStore.getState().resetAuth();
        safeRedirect("/auth");
        return Promise.reject(error);
      }

      // registration endpoints با 401 → پاک کردن registration
      const isRegistrationEndpoint = REGISTRATION_ENDPOINTS.some((endpoint) =>
        originalRequest.url?.includes(endpoint),
      );

      if (isRegistrationEndpoint) {
        useAuthStore.getState().clearRegistration();
        safeRedirect("/auth");
        return Promise.reject(error);
      }

      // اگر در حال refresh هستیم، درخواست رو در صف قرار بده
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await tokenService.refreshAccessToken();
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().resetAuth();
        safeRedirect("/auth");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ─── Handle 403 Forbidden ───────────────────────────────

    if (status === 403) {
      useAuthStore.getState().resetAuth();
      safeRedirect("/auth");
    }

    // ─── Normalize Error ────────────────────────────────────

    const message =
      error.response?.data?.message || error.message || "خطایی رخ داده است";

    const normalized: ApiError = {
      message,
      status,
      data: error.response?.data,
    };

    return Promise.reject(normalized);
  },
);

// ─── Helper ─────────────────────────────────────────────────
let isRedirectingToAuth = false;

function safeRedirect(path: string): void {
  if (typeof window === "undefined") return;
  if (isRedirectingToAuth) return;
  if (window.location.pathname === path) return;

  isRedirectingToAuth = true;
  window.location.replace(path);
}
