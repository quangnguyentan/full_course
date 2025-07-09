import React from "react";
import Navbar from "./_components/navbar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex w-full pt-20">{children}</div>
    </>
  );
};

export default BrowseLayout;
