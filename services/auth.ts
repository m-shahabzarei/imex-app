// services/auth.service.ts
import { api } from "@/lib/axios";

export const sendOtp = (username: string) => {
  return api.post("/users/auth/otp/", {
    username
  });
};

export const verifyOtp = (username: string, code: string) => {
  return api.post("/users/auth/otp/", {
    username,
    code,
  });
};
