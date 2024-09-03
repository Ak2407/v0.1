"use client";

import InputBox from "@/components/InputBox";
import SuggestionBox from "@/components/SuggestionBox";
import { useSigninDialog } from "@/hooks/use-signin-dialog";
import { useRef, useState } from "react";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import SigninDialog from "./SigninDialog";
import createChat from "@/actions/create-chat";

const LandingInterface = () => {
  const router = useRouter();
  const onOpen = useSigninDialog((state) => state.onOpen);
  const onClose = useSigninDialog((state) => state.onClose);
  const isOpen = useSigninDialog((state) => state.isOpen);
  const { sessionId, isSignedIn, userId } = useAuth();
  const [disabled, setDisabled] = useState(false);

  const { input, handleInputChange } = useChat({
    id: sessionId?.toString(),
    api: "/api/chat",
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChat = async (
    e: React.FormEvent | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    if (input.trim() && !isSignedIn) {
      onOpen();
      return;
    }
    if (input.trim() && isSignedIn) {
      setDisabled(true);

      let chatName = input.substring(0, 100);

      if (chatName.length > 100) {
        chatName += "...";
      }

      const newChat = await createChat({ userId, chatName });

      if (newChat) {
        const encodedInput = encodeURIComponent(input);
        router.push(
          `/${newChat[0].id}?initialInput=${encodedInput}&isNewChat=true`,
        );
      } else {
        console.log("Error creating chat");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleChat(event);
    }
  };

  const handleNewChat = (e: React.FormEvent) => {
    handleChat(e);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <SigninDialog open={isOpen} onClose={onClose} />
      <h1 className="font-heading text-pretty text-center text-[22px] font-semibold trcking-tighter text-gray-900 sm:text-[30px] md:text-[36px]">
        What can I help you with today?
      </h1>
      <p className="text-balance text-center text-sm text-gray-700 font-light mb-10">
        AI chatbot made possible using OpenAI API.
      </p>
      <InputBox
        ref={textAreaRef}
        placeholder="Ask v0.1 a question..."
        handleSubmit={handleNewChat}
        handleInputChange={handleInputChange}
        value={input}
        inputDisabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <SuggestionBox />
    </div>
  );
};

export default LandingInterface;
