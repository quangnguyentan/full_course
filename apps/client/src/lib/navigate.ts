// app/lib/router.ts
"use client";

import { useRouter } from "next/navigation";

let routerInstance: ReturnType<typeof useRouter> | null = null;

export const setRouter = (router: ReturnType<typeof useRouter>) => {
  routerInstance = router;
};

export const navigateTo = (path: string) => {
  if (!routerInstance) {
    console.error("Router not initialized");
    return;
  }
  routerInstance.push(path);
};
