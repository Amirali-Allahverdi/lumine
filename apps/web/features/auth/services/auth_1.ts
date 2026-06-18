import { mutationOptions } from "@tanstack/react-query";
import { sendPhoneOtp, verifyPhoneOtp } from "../api/auth_1";

export const sendPhoneOtpOptions = () =>
  mutationOptions({
    mutationFn: sendPhoneOtp,
  });

export const verifyPhoneOtpOptions = () =>
  mutationOptions({
    mutationFn: verifyPhoneOtp,
  });
