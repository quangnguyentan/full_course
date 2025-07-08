"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignInForm = () => {
  const [isLogin, setIsLogin] = useState(true);
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
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const data = await res.json();
      if (data?.user) {
        router.push("/");
      }
      console.log("Đăng nhập thành công:", data);
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
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
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            {isLogin ? "Login" : "Register"}
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
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
