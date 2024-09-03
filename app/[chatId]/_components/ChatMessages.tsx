import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";

import { Message } from "ai";

type ChatMessagesProps = {
  messages: Message[];
};

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div
      className="flex flex-col gap-6 max-w-[700px] mb-[200px] w-full  px-6 md:px-0 "
      id="message-container"
    >
      {messages.map((msg: any, index: number) =>
        msg.role === "user" ? (
          <div key={index}>
            <UserMessage message={msg.content} />
          </div>
        ) : (
          <div key={index}>
            <SystemMessage message={msg.content} />
          </div>
        ),
      )}
    </div>
  );
};

export default ChatMessages;
