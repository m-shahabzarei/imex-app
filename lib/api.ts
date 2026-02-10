import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { refresh } from "@/services/auth";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `JWT ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let queue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `JWT ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken
        const res = await refresh(refreshToken)

        const newAccess = res.data.access;

        useAuthStore.getState().setAccessToken(newAccess);
        processQueue(null, newAccess);

        originalRequest.headers.Authorization = `JWT ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
