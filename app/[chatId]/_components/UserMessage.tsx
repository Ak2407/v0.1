"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "@phosphor-icons/react";
import { Copy } from "lucide-react";
import { useRef } from "react";
import { useUser } from "@clerk/nextjs";

import { toast } from "sonner";
import Image from "next/image";

type UserMessageProps = {
  message: string;
};

const UserMessage = ({ message }: UserMessageProps) => {
  const msgRef = useRef<HTMLParagraphElement>(null);
  const { user } = useUser();

  const handleCopy = () => {
    console.log("handleCopy");
    if (!msgRef.current) return;
    msgRef.current.innerText = msgRef.current.innerText.replaceAll("\n", " ");
    navigator.clipboard.writeText(msgRef.current.innerText);
    toast("Message copied to clipboard", {
      className: "bg-[#0f2b0f] text-[#76ff7a] border border-black py-2",
      icon: <CheckCircle size={20} color="#76ff7a" weight="fill" />,
    });
  };

  return (
    <div className="flex items-center justify-start h-full gap-2 w-full relative group ">
      <div className="flex  h-full items-start justify-center pt-1 min-w-[30px] rounded-full">
        <Image
          src={user?.imageUrl ?? "/default-avatar.png"}
          width={20}
          height={20}
          alt="user"
          className="rounded-full"
        />
      </div>
      <p
        className="text-light text-sm text-black/80 break-words  min-w-0 prose prose-sm prose-gray leading-loose"
        ref={msgRef}
      >
        {message}
      </p>
      <div className="pointer-events-none absolute inset-y-0 right-0 md:right-[-20px] z-10 cursor-pointer">
        <div className="w-fit items-center gap-1 rounded-lg bg-white   shadow-sm pointer-events-auto border border-gray-200 sticky top-5 flex -translate-y-1.5 opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100 has-[[data-state='delayed-open']]:opacity-100 has-[[data-state='instant-open']]:opacity-100 has-[[data-state=open]]:opacity-100 md:top-5 [[data-touch-active=true]_&]:opacity-100">
          <Button
            className="rounded-lg px-2"
            variant="ghost"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4 text-gray-500 fill " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
