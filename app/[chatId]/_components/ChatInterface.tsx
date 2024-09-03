"use client";
import { ChevronDown } from "lucide-react";
import InputBox from "@/components/InputBox";
import { Message, useChat } from "ai/react";
import { useState, useEffect, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { db } from "@/db";
import { chats, DrizzleChat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useParams, useSearchParams } from "next/navigation";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

const ChatContent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const chatId = params.chatId;
  const initialInput = searchParams.get("initialInput");
  const isNewChat = searchParams.get("isNewChat");

  const { data: initialMessages, isLoading: isLoadingInitialMessages } =
    useQuery({
      queryKey: ["chat", chatId],
      queryFn: async () => {
        const response = await axios.post<Message[]>("/api/get-messages", {
          chatId,
        });
        return response.data;
      },
    });

  const [currentChat, setCurrentChat] = useState<Partial<DrizzleChat>>({});
  const [initialMessageProcessed, setInitialMessageProcessed] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading: isChatLoading,
    reload,
  } = useChat({
    body: {
      chatId,
    },
    initialMessages: initialMessages || [],
  });

  const [showChevron, setShowChevron] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const result = await db
          .select()
          .from(chats)
          .where(eq(chats.id, chatId as string))
          .limit(1);

        if (result.length > 0) {
          setCurrentChat(result[0]);
        } else {
          console.log("Chat not found");
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [chatId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      initialInput &&
      isNewChat === "true" &&
      !initialMessageProcessed &&
      !isLoadingInitialMessages
    ) {
      const decodedInput = decodeURIComponent(initialInput);
      append({ content: decodedInput, role: "user" });
      handleSubmit(new Event("submit") as any);
      setInitialMessageProcessed(true);

      // Remove the initialInput and isNewChat parameters from the URL
      const newUrl = `/${chatId}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [
    initialInput,
    isNewChat,
    append,
    handleSubmit,
    chatId,
    initialMessageProcessed,
    isLoadingInitialMessages,
  ]);

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      setShowChevron(scrollPosition + windowHeight < fullHeight - 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!mounted || isLoadingInitialMessages) {
    return null;
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const currentInput = textAreaRef.current?.value.trim();
      if (currentInput) {
        append({ content: currentInput, role: "user" });
        if (textAreaRef.current) {
          textAreaRef.current.value = "";
        }
        handleInputChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLTextAreaElement>);

        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
    }
  };

  return (
    <div className="relative flex flex-col w-full ">
      <ChatHeader chatName={currentChat.chatName as string} />
      <div className="flex flex-col items-center justify-center ">
        <ChatMessages messages={messages} />
        <div className="fixed bottom-0 left-0 sm:left-[60px] right-0 px-4 pb-2 pt-0 bg-white max-w-[800px] mx-auto ">
          <div className="relative flex flex-col gap-2 items-center justify-center w-full">
            {showChevron && (
              <div
                className="flex absolute top-[-40px] items-center justify-center rounded-full p-1 border border-gray-300 animate-bounce infinite bg-white shadow-md cursor-pointer"
                style={{ animationDuration: "2.5s" }}
                onClick={scrollToBottom}
              >
                <ChevronDown className="h-5 w-5 text-gray-500 " />
              </div>
            )}
            <InputBox
              ref={textAreaRef}
              placeholder="Ask a follow up..."
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              value={input}
              onKeyDown={handleKeyDown}
              isLoading={isChatLoading}
              onStop={stop}
            />
            <p className="text-gray-500 text-[12px] font-light text-center">
              v0.1 may make mistakes. Please use with discretion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChatContent />
    </QueryClientProvider>
  );
};

export default ChatInterface;
