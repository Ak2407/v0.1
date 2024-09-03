"use server";

import { db } from "@/db";
import { chats } from "@/db/schema";

export default async function createChat({ userId, chatName }: any) {
  try {
    const newChat = await db
      .insert(chats)
      .values({ chatName, userId })
      .returning();

    return newChat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw new Error("Error creating chat");
  }
}
