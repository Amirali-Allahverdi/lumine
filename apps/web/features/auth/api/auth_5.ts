import { axiosInstance } from "@/shared/lib/http/axios";
import { PortfolioPayload, PortfolioResponse } from "../types/auth_5";

export async function uploadPortfolio(
  payload: PortfolioPayload,
): Promise<PortfolioResponse> {
  const formData = new FormData();
  formData.append("full_body_url", payload.full_body_url);
  formData.append("full_shot_url", payload.full_shot_url);

  const { data } = await axiosInstance.post(
    "/auth/image-portfolio/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return data;
}
