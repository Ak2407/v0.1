"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Input } from "@/components/ui/input";
import getAllChats from "@/actions/get-all-chats";
import { DrizzleChat } from "@/db/schema";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export default function Component() {
  const [isMounted, setIsMounted] = useState(false);
  const [chats, setChats] = useState<DrizzleChat[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();
  const searchParams = useParams();
  const { onOpen, onClose, isOpen } = useMobileSidebar();

  const chatId = searchParams.chatId;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.id) {
        const allChats = await getAllChats({ userId: user.id });
        setChats(allChats);
      }
    };

    getUserChats();
  }, [user?.id, searchParams]);

  const filteredChats = chats.filter((chat) =>
    chat.chatName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupChatsByDate = (chats: DrizzleChat[]) => {
    const groups: { [key: string]: DrizzleChat[] } = {
      Today: [],
      Yesterday: [],
      "This Week": [],
      "Last Week": [],
      Earlier: [],
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    chats.forEach((chat) => {
      const chatDate = new Date(chat.createdAt);
      if (chatDate.toDateString() === today.toDateString()) {
        groups["Today"].push(chat);
      } else if (chatDate.toDateString() === yesterday.toDateString()) {
        groups["Yesterday"].push(chat);
      } else if (chatDate >= thisWeekStart) {
        groups["This Week"].push(chat);
      } else if (chatDate >= lastWeekStart) {
        groups["Last Week"].push(chat);
      } else {
        groups["Earlier"].push(chat);
      }
    });

    return groups;
  };

  const groupedChats = groupChatsByDate(filteredChats);

  if (!isMounted || !user) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="block sm:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className="p-0 min-w-[80%] max-w-[80%] w-[80%] "
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <Logo />
            </div>
            <div className="flex-1 overflow-auto">
              <div className="p-4">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="px-2">
                {Object.entries(groupedChats).map(
                  ([group, groupChats]) =>
                    groupChats.length > 0 && (
                      <div key={group} className="mb-4">
                        <h3 className="px-2 mb-2 text-sm font-medium text-gray-500">
                          {group}
                        </h3>
                        {groupChats.map((chat) => (
                          <Link
                            key={chat.id}
                            href={`/${chat.id}`}
                            className="block"
                          >
                            <div
                              className={cn(
                                "flex items-center justify-between px-2 py-2 rounded-lg",
                                chat.id === chatId
                                  ? "bg-gray-100 hover:bg-gray-50"
                                  : "hover:bg-gray-100",
                              )}
                            >
                              <span className="text-sm font-normal p-2 truncate">
                                {chat.chatName}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-xs text-gray-500">
                    {user.emailAddresses[0].emailAddress}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
