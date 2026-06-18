import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../../../features/auth/store/auth_1";

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

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
    const token = useAuthStore.getState().userToken;

    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error?.response?.status;

    if (status === 401) {
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
