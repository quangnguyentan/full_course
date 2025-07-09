import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const setCookie = response.headers.get("set-cookie");
    const nextRes = NextResponse.json(
      { user: data.user, accessToken: data.user?.accessToken },
      { status: response.status }
    );

    if (setCookie) {
      nextRes.headers.set("set-cookie", setCookie); // BẮT BUỘC
    }
    return nextRes;
  } catch (error) {
    console.error("Lỗi server route /api/auth/login:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
