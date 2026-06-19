import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../../features/auth/store/auth_1";

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

const PUBLIC_ENDPOINTS = ["/auth/send-otp/", "/auth/verify-otp/"];

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    if (isPublicEndpoint) {
      return config;
    }

    const token = useAuthStore.getState().userToken;

    if (!token) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }
      return Promise.reject({ message: "Unauthorized", status: 401 });
    }

    config.headers.token = token;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      useAuthStore.getState().resetAuth?.();
      if (typeof window !== "undefined") window.location.href = "/auth";
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    const normalized: ApiError = {
      message,
      status,
      data: error?.response?.data,
    };

    return Promise.reject(normalized);
  },
);
