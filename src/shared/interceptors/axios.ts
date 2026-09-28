import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "../../store/store";
import { logoutUser, updateTokens } from "../../features/auth/user/userSlice";

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
    const rawUserData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    const userData = rawUserData ? JSON.parse(rawUserData) : {};
    const token = userData?.accessToken ?? "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================
// Refresh Logic
// ============================

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ---------------------------------
    // Not 401
    // ---------------------------------

    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    // ---------------------------------
    // Prevent infinite loop
    // ---------------------------------

    originalRequest._retry = true;

    // ---------------------------------
    // Get Refresh Token
    // ---------------------------------

    const user = store.getState().user.data;

    const refreshToken = user?.refreshToken;

    if (!refreshToken) {
      store.dispatch(logoutUser());

      return Promise.reject(error);
    }

    // ---------------------------------
    // Refresh already running
    // ---------------------------------

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalRequest));
          },

          reject,
        });
      });
    }

    // ---------------------------------
    // Start Refresh
    // ---------------------------------

    isRefreshing = true;

    try {
      const response = await refreshApi.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const newAccessToken = response.data.accessToken;

      const newRefreshToken = response.data.refreshToken;

      // ---------------------------------
      // Update Redux + LocalStorage
      // ---------------------------------

      store.dispatch(
        updateTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }),
      );

      // ---------------------------------
      // Release waiting requests
      // ---------------------------------

      processQueue(null, newAccessToken);

      // ---------------------------------
      // Retry original request
      // ---------------------------------

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      // ---------------------------------
      // Refresh failed
      // ---------------------------------

      processQueue(refreshError, null);

      store.dispatch(logoutUser());

      return Promise.reject(refreshError);
    } finally {
      // ---------------------------------
      // Refresh finished
      // ---------------------------------

      isRefreshing = false;
    }
  },
);
