"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { data, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Chưa đăng nhập hoặc token hết hạn</div>;

  return <div>Xin chào user #{data.id}</div>;
}
