import { mutationOptions } from "@tanstack/react-query";
import { workInfo } from "../api/auth_4";
import { WorkInfoPayload } from "../types/auth_4";
import { UserRole } from "../types/auth_3";

export const workInfoOptions = (role: UserRole | null) =>
  mutationOptions({
    mutationFn: (payload: WorkInfoPayload) => workInfo(payload, role),
  });
