import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

// Add token only when the request has `requiresAuth: true`
api.interceptors.request.use((config) => {
  if (config.requiresAuth) {
    const rawUserData = localStorage.getItem("userData")||sessionStorage.getItem("userData");
    const userData = rawUserData ? JSON.parse(rawUserData) : {};
    const token = userData?.user?.accessToken ?? "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
