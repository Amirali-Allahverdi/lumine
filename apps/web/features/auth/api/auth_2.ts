import { axiosInstance } from "@/shared/lib/http/axios";
import { Auth_2BasicInfoType } from "../schemas/auth_2";
import { BasicInfoPayload, BasicInfoResponse } from "../types/auth_2";

export async function basicInfo(
  payload: Auth_2BasicInfoType,
): Promise<BasicInfoResponse> {
  const { data } = await axiosInstance.put("/auth/basic-info/", payload);

  return data;
}
