"use server";

import { db } from "@/db";
import { chats } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function getAllChats({ userId }: any) {
  try {
    const allChats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId))
      .orderBy(desc(chats.createdAt));

    return allChats;
  } catch (error) {
    console.error("Error getting all chats:", error);
    throw new Error("Error getting all chats");
  }
}
