"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "@phosphor-icons/react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { useRef } from "react";
import Image from "next/image";

type SystemMessageProps = {
  message: string;
};

const SystemMessage = ({ message }: SystemMessageProps) => {
  const msgRef = useRef<HTMLParagraphElement>(null);

  const handleCopy = () => {
    if (!msgRef.current) return;
    msgRef.current.innerText = msgRef.current.innerText.replaceAll("\n", " ");
    navigator.clipboard.writeText(msgRef.current.innerText);
    toast("Message copied to clipboard", {
      className: "bg-[#0f2b0f] text-[#76ff7a] border border-black py-2",
      icon: <CheckCircle size={20} color="#76ff7a" weight="fill" />,
    });
  };

  return (
    <div className="flex items-center justify-start h-full w-full relative group">
      <div className="h-full flex items-start justify-center w-[30px] min-w-[30px] max-w-[30px] rounded-full pt-1">
        <Image src="/logo.png" width={40} height={40} alt="System" />
      </div>
      <p
        className="text-light text-sm text-black/80 break-words pl-2 min-w-0 prose prose-sm prose-gray leading-loose "
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

export default SystemMessage;
