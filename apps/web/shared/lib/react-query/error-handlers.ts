import { toast } from "@heroui/react";

type ApiError = {
  message?: string;
  data?: {
    message?: string;
  };
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;

    if (typeof apiError.data?.message === "string") {
      return apiError.data.message;
    }

    if (typeof apiError.message === "string") {
      return apiError.message;
    }
  }

  return "خطای ناشناخته‌ای رخ داد";
}

export function handleError(error: unknown, type?: string) {
  const message = getErrorMessage(error);

  console.error(`${type ?? "Application"} Error:`, error);

  toast.danger(message);
}
