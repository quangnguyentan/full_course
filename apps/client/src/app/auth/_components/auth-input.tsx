import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // Optional utility class for tailwind merge

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const AuthInput = ({ icon, className, ...props }: AuthInputProps) => {
  return (
    <div className="relative group">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={cn(
          "w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-black placeholder-gray-300 outline-none focus:ring-2 focus:ring-pink-400 transition",
          className
        )}
      />
    </div>
  );
};
