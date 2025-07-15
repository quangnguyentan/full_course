"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AuthInput } from "./auth-input";
import { Button } from "@/components/ui/button";
import { apiLogin, apiRegister } from "@/services/auth.service";
import { BACKEND_URL } from "@/lib/constants";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";

const SignInForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        console.log(userData);
        const res = await apiLogin(userData);
        const { accessToken } = res?.user ?? {};
        localStorage.setItem(
          "persist:auth",
          JSON.stringify({ token: JSON.stringify(accessToken) })
        );
        toast.success("Đăng nhập thành công");
        router.push("/");
      } else {
        const res = await apiRegister(userData);
        if (res) {
          toast.success("Tạo tài khoản thành công");
          setIsLogin(true);
          handleResetForm();
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Lỗi hệ thống, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleResetForm = () => {
    setUserData({ email: "", password: "" });
  };
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          icon={<Mail size={18} />}
          type="email"
          placeholder="Email Address"
          required
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          value={userData.email}
        />

        <AuthInput
          icon={<Lock size={18} />}
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          value={userData.password}
        />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : isLogin ? "Login" : "Register"}
        </Button>
      </form>

      <div className="text-center mt-4">
        <p className="text-white text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-pink-300 hover:text-pink-400 underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        {isLogin && (
          <Link
            href="/forgot-password"
            className="text-pink-300 hover:text-pink-400 text-xs mt-2 block"
          >
            Forgot Password?
          </Link>
        )}

        <Button
          variant="outline"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100"
        >
          <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
          <a href={`${BACKEND_URL}/auth/google/login`}>Sign In With Google</a>
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
