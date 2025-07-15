import axios from "axios";
import { toast } from "react-toastify";
import { apiRefreshToken } from "@/services/auth.service";
import { navigateTo } from "@/lib/navigate";

const API_BASE_URL = "http://localhost:8080";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config;
    const is401 = error?.response?.status === 401;
    const isRefreshUrl = originalRequest?.url?.includes("/auth/refresh-token");

    if (
      typeof window !== "undefined" &&
      is401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshUrl &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        await apiRefreshToken(); // server sẽ set lại cookie accessToken mới
        return instance(originalRequest); // retry request
      } catch (refreshError) {
        console.error("Refresh token expired:", refreshError);
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigateTo("/auth");
        return Promise.reject(new Error("Token expired"));
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
