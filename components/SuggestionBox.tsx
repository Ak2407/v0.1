"use client";

import { suggestionList } from "@/constants";

import createChat from "@/actions/create-chat";
import { MoveUpRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import SigninDialog from "./SigninDialog";
import { useSigninDialog } from "@/hooks/use-signin-dialog";

const SuggestionBox = () => {
  const onOpen = useSigninDialog((state) => state.onOpen);
  const onClose = useSigninDialog((state) => state.onClose);
  const isOpen = useSigninDialog((state) => state.isOpen);

  const { userId, isSignedIn } = useAuth();
  const router = useRouter();

  const handleClick = async (input: string) => {
    if (!isSignedIn) {
      onOpen();
      return;
    }

    const newChat = await createChat({ userId, chatName: input });

    if (newChat) {
      const encodedInput = encodeURIComponent(input);
      router.push(
        `/${newChat[0].id}?initialInput=${encodedInput}&isNewChat=true`,
      );
    } else {
      console.log("Error creating chat");
    }
  };

  return (
    <div>
      <SigninDialog open={isOpen} onClose={onClose} />
      <div className="mt-6 flex flex-wrap justify-center gap-3 opacity-100">
        {suggestionList.map((suggestion, index) => (
          <button
            key={index}
            className="focus:border-gray-300 focus-visible:border-gray-300 disabled:border-gray-200 border-gray-300 hover:border-gray-300 inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap border  outline-none ring-blue-600 transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:ring-0 has-[:focus-visible]:ring-2   text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus-visible:bg-gray-100 h-6 px-2 text-xs    rounded-full gap-0.5 bg-gray-50 "
            onClick={() => handleClick(suggestion)}
          >
            <h1 className="font-medium">{suggestion}</h1>
            <MoveUpRight className="w-4 h-3 text-gray-900 fill " />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionBox;
