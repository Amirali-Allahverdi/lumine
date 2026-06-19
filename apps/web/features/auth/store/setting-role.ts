import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TechnicalInfo_RoleResponse, UserRole } from "../types/auth_3";

interface RoleState {
  role: UserRole | null;

  setRole: (response: TechnicalInfo_RoleResponse) => void;
  resetRole: () => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: null,

      setRole: (response) => {
        const raw = response.data.roles_name;
        set({
          role: Array.isArray(raw) ? raw[0] : raw,
        });
      },

      resetRole: () => {
        set({ role: null });
      },
    }),
    {
      name: "role-storage",
    },
  ),
);
