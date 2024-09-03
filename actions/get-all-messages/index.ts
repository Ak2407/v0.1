"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export default async function getAllMessages({ chatId }: any) {
  try {
    const allMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chatId))
      .orderBy(asc(messages.id));

    return allMessages;
  } catch (error) {
    console.error("Error getting all messages:", error);
    throw new Error("Error getting all messages");
  }
}
