import { NextRequest } from "next/server";
import { openai } from "@ai-sdk/openai";

import { streamText } from "ai";
import createMessage from "@/actions/create-message";
import regenerateSystemMessage from "@/actions/delete-message";

const model = openai("gpt-4o-mini");

export async function POST(req: NextRequest) {
  const { messages, chatId } = await req.json();

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.role === "system") {
    await regenerateSystemMessage({ chatId, content: lastMessage.content });
  }

  await createMessage({ chatId, content: lastMessage.content, role: "user" });

  const result = await streamText({
    model,
    messages,
    onFinish: (data) => {
      createMessage({ chatId, content: data.text, role: "system" });
    },
  });

  return result.toDataStreamResponse();
}
