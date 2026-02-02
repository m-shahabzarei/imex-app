// services/auth.service.ts
import api from "@/lib/api";


export const sendOtp = (username: string) => {
  return api.post("/users/auth/otp/", {
    username
  });
};

export const verifyOtp = (username: string, user_otp: string) => {
  return api.post("/users/auth/login", {
    username,
    user_otp,
  });

};

export const getMe = () => {
  return api.get('/users/users/me')
}

export const refresh = (refresh : string) =>{
  return api.post("/auth/refresh" , {
    refresh
  })
}
