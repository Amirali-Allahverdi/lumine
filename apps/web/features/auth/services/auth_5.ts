import { mutationOptions } from "@tanstack/react-query";
import { uploadPortfolio } from "../api/auth_5";

export const portfolioOptions = () =>
  mutationOptions({
    mutationFn: uploadPortfolio,
  });
