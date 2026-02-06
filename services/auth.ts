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

export const refresh = (refresh : string | null) =>{
  return api.post("/auth/refresh" , {
    refresh
  })
}

export const logout = (refresh : string | null) =>{
  return api.post("/auth/logout" , {
    refresh
  })
}

export const setName = (ID : number,last_name:string)=> {
  return api.put(`https://api.imexapp.ir/users/users/${ID}/` , {
    last_name
  })
}


export const SubscriptionService = {
  getLast() {
    return api.get("/subscription/last/");
  },

  validateCoupon(code: string) {
    return api.post("/subscription/coupon/validated_coupon/", { code });
  },

  createSubscription(code?: string) {
    return api.post("/subscription/subscription/", code ? { code } : {});
  },
};