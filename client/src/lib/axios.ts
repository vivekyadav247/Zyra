import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  withCredentials: true,
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && !isRefreshing) {
      original._retry = true;
      isRefreshing = true;
      try {
        await axiosInstance.post("/auth/refresh");
        isRefreshing = false;
        return axiosInstance(original);
      } catch (e) {
        isRefreshing = false;
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);
