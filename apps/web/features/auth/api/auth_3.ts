import { axiosInstance } from "@/shared/lib/http/axios";
import {
  TechnicalInfo_RoleResponse,
  TechnicalInfo_CategoryResponse,
  TechnicalInfo_RolePayload,
  TechnicalInfo_CategoryPayload,
  UserRole,
  Category,
} from "../types/auth_3";

export async function setRole(
  payload: TechnicalInfo_RolePayload,
): Promise<TechnicalInfo_RoleResponse> {
  const { data } = await axiosInstance.post("/auth/set-role/", payload);
  return data;
}

export async function getCategories(role: UserRole): Promise<Category[]> {
  const { data } = await axiosInstance.get("/auth/categories/", {
    headers: { type: role },
  });
  return data;
}

export async function setCategory(
  payload: TechnicalInfo_CategoryPayload,
): Promise<TechnicalInfo_CategoryResponse> {
  const { data } = await axiosInstance.post("/auth/p-category/", payload);
  return data;
}
