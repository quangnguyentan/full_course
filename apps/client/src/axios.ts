import axios, { AxiosHeaders } from "axios";
import { toast } from "react-toastify";
import { apiRefreshToken } from "@/services/auth.service";
import { navigateTo } from "@/lib/navigate";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "https://sv.hoiquan.live/api"
    : "http://localhost:8080";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const raw = localStorage.getItem("persist:auth");
  const parsed = raw ? JSON.parse(raw) : null;
  const token = parsed?.token?.replace(/^"|"$/g, "");

  if (token) {
    (config.headers as AxiosHeaders).set("authorization", `Bearer ${token}`);
  }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const is401 = error.response?.status === 401;
    const isRefreshUrl = originalRequest.url?.includes("/auth/refreshToken");

    if (
      is401 &&
      !originalRequest._retry &&
      !isRefreshUrl &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        const res = await apiRefreshToken();
        const newAccessToken = res.data.newAccessToken;
        const raw = localStorage.getItem("persist:auth") ?? "{}";
        const parsed = JSON.parse(raw);
        parsed.token = JSON.stringify(newAccessToken);
        localStorage.setItem("persist:auth", JSON.stringify(parsed));

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch {
        localStorage.removeItem("persist:auth");
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigateTo("/auth");
        return Promise.reject(new Error("Token expired"));
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
