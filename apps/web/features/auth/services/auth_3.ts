import { mutationOptions } from "@tanstack/react-query";
import { setRole, setCategory } from "../api/auth_3";

export const setRoleOptions = () => mutationOptions({ mutationFn: setRole });

export const setCategoryOptions = () =>
  mutationOptions({ mutationFn: setCategory });
