import axios from "axios";

const api = axios.create({
  baseURL: "https://api.imexapp.ir",
});

export const sendOtp = (phone:string) => {
  return api.post("/users/auth/otp/", { username: phone });
}

export const verifyOtp = (phone:string, code:string) => {
  return api.post("/users/auth/otp/", { username:phone, code });
}