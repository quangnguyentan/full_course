"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";
import { apiLogin } from "@/services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
const SignInForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiLogin(userData);
      console.log(res);
      const { accessToken } = res?.user ?? {};
      localStorage.setItem(
        "persist:auth",
        JSON.stringify({
          token: JSON.stringify(accessToken),
        })
      );

      toast.success("Đăng nhập thành công");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Lỗi hệ thống, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 w-full">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500">
        <h2 className="text-3xl font-bold text-white text-center mb-6 animate-pulse">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="relative">
            <input
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            {loading ? "Đang đăng nhập..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-2 text-pink-300 hover:text-pink-400 font-semibold transition-colors"
            >
              {isLogin ? "Register" : "Login!"}
            </button>
          </p>

          {isLogin && (
            <Link
              href="/forgot-password"
              className="text-pink-300 hover:text-pink-400 text-sm mt-2 block transition-colors"
            >
              Forgot Password?
            </Link>
          )}
          <Button>
            <a href={`${BACKEND_URL}/auth/google/login`}>Sign In With Google</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
