"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import Logo from "./Logo";

const NonLogHeader = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div className="p-2 flex justify-between items-center w-full   ">
      <Logo />
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default NonLogHeader;
