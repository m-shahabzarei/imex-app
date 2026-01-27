// services/auth.service.ts
import api from '@/lib/axios'
import { CookieValueTypes } from 'cookies-next';


export const sendOtp = (username: string) => {
  return api.post("/auth/otp/", {
    username
  });
};

export const verifyOtp = (username: string, user_otp: string) => {
  return api.post("/auth/login", {
    username,
    user_otp,
  });

};

export const getMe = () => {
  return api.get('/users/users/me')
}



export const logoutRequest = () => {
  return api.post("/auth/logout/", {
    
  });
  }
