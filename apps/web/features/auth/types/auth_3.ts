//? Role
export type UserRole = "model" | "instructor" | "employer";

export interface TechnicalInfo_RolePayload {
  role: UserRole;
}

interface TechnicalInfo_RoleResponseData {
  user_id: number;
  roles_name: UserRole[];
}

export interface TechnicalInfo_RoleResponse {
  success: boolean;
  message: string;
  data: TechnicalInfo_RoleResponseData;
}

//? Category
export type Category = {
  id: number;
  name: string;
  persion_name: string;
  type: UserRole;
  is_active: boolean;
  created: string;
  updated: string;
};

export interface TechnicalInfo_CategoryPayload {
  category_id: number;
}

interface TechnicalInfo_CategoryResponseData {
  id: number;
  name: string;
  name_persian: string;
  role_user: UserRole;
}

export interface TechnicalInfo_CategoryResponse {
  success: boolean;
  message: string;
  data: TechnicalInfo_CategoryResponseData;
}
