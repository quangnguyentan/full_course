"use client";
import { trpc } from "@/trpc/client";
import React from "react";

const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Quang23" });

  return <div>{data?.greeting}</div>;
};

export default PageClient;
