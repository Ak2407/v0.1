"use server";

import { db } from "@/db";
import { messages } from "@/db/schema";

export default async function createMessage({ chatId, content, role }: any) {
  try {
    const newMessage = await db
      .insert(messages)
      .values({ chatId, content, role })
      .returning();

    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error);
    throw new Error("Error creating message");
  }
}
