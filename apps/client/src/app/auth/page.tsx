import Link from "next/link";
import SignInForm from "./_components/signInForm";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";

const SignInPage = () => {
  return (
    <div className=" bg-white p-8 border rounded-md gap-3 shadow-md w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>
      {/* Put SignIn form here */}
      <SignInForm />
    </div>
  );
};

export default SignInPage;
