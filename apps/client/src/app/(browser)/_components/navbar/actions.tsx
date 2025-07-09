import { Button } from "@/components/ui/button";
import { navigateTo } from "@/lib/navigate";
import { apiLogout } from "@/services/auth.service";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const Actions = () => {
  const handleLogout = async () => {
    const response = await apiLogout();
    localStorage.removeItem("persist:auth");
    navigateTo("/auth");
    toast.success(response?.message);
  };
  return (
    <div>
      <Button className="cursor-pointer" onClick={handleLogout}>
        <LogOutIcon className="h-5" />
        <span className="hidden lg:inline-block ml-2">Logout</span>
      </Button>
    </div>
  );
};

export default Actions;
