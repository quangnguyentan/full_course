import { BACKEND_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  const { searchParams } = new URL(req.url);
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const userId = searchParams.get("userId");
  if (!userId || !accessToken) {
    throw new Error("Google oauth failed or token missing!");
  }

  const res = await fetch(`${BACKEND_URL}/auth/verify-token`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  if (res.status === 401) throw new Error("jwt verification failed!");

  redirect("/");
}
