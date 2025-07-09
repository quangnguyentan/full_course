import { authProps } from "@/types/auth.type";
import axiosConfig from "../axios";
export const apiRegister = async (data: authProps) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: "/auth/register",
      data,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
export const apiRefreshToken = async () => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: "/auth/refreshToken",
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
export const apiLogin = async (data: authProps) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: "/auth/login",
      data,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const apiLogout = async () => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: "/auth/logout",
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const apiLoginSuccess = async (id: unknown, tokenLogin: unknown) => {
  try {
    const response = await axiosConfig({
      method: "POST",
      url: "/auth/login-success",
      data: { id, tokenLogin },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
