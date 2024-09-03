"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import MobileSidebar from "./MobileSidebar";
import Link from "next/link";

type ChatHeaderProps = {
  chatName: string;
};

const ChatHeader = ({ chatName }: ChatHeaderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between p-[15px] sticky top-0 z-50 bg-white ">
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-4">
          <MobileSidebar />
          <h1 className="text-sm font-light truncate max-w-[50px] sm:max-w-[150px] md:max-w-[200px]">
            {chatName}
          </h1>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href="/">
          <Button className=" rounded-lg block sm:hidden">New Chat</Button>
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
