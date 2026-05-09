import { mutationOptions } from "@tanstack/react-query";
import { sendPhoneOtp } from "../api/auth_1";

export const sendPhoneOtpOptions = () =>
  mutationOptions({
    mutationFn: sendPhoneOtp,
  });
