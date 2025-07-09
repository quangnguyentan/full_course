"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setRouter } from "@/lib/navigate";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    setRouter(router);
  }, [router]);

  return <>{children}</>;
}
