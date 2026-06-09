import { mutationOptions } from "@tanstack/react-query";
import { basicInfo } from "../api/auth_2";

export const basicInfoOptions = () =>
  mutationOptions({
    mutationFn: basicInfo,
  });
