import { axiosInstance } from "@/shared/lib/http/axios";
import { WorkInfoPayload, WorkInfoResponse } from "../types/auth_4";
import { UserRole } from "../types/auth_3";

export async function workInfo(
  payload: WorkInfoPayload,
  role: UserRole | null,
): Promise<WorkInfoResponse> {
  if (role === "instructor") {
    const { data } = await axiosInstance.post(
      "/auth/instructor-profile/",
      payload,
    );
    return data;
  }

  if (role === "employer") {
    const { data } = await axiosInstance.post(
      "/auth/employer-profile/",
      payload,
    );
    return data;
  }

  const { data } = await axiosInstance.post("/auth/technical-info/", payload);
  return data;
}
