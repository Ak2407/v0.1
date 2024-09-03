"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import createMessage from "../create-message";

export default async function regenerateSystemMessage({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}) {
  try {
    const lastSystemMessage = await db
      .select()
      .from(messages)
      .where(and(eq(messages.chatId, chatId), eq(messages.role, "system")))
      .orderBy(desc(messages.createdAt))
      .limit(1);

    if (lastSystemMessage.length === 0) {
      console.log("No system message found for this chat");
      return;
    }

    await db.delete(messages).where(eq(messages.id, lastSystemMessage[0].id));

    createMessage({ chatId, content, role: "system" });

    console.log("Last system message deleted successfully");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw new Error("Error deleting message");
  }
}
