"use client";

import getAllChats from "@/actions/get-all-chats";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import Logo from "@/components/ui/Logo";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { UserButton } from "@clerk/nextjs";

import { Plus, History, Flag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { DrizzleChat } from "@/db/schema";

import { useSearchParams } from "next/navigation";

const Sidebar = () => {
  const { userId } = useAuth();

  const searchParams = useSearchParams();

  const [chats, setChats] = useState<DrizzleChat[]>([]);

  useEffect(() => {
    const getUserChats = async () => {
      const allChats = await getAllChats({ userId });
      setChats(allChats);
    };

    getUserChats();
  }, [userId, searchParams]);

  return (
    <div className="hidden sticky top-0 sm:flex w-[60px] bg-gray-50 h-screen border border-r border-gray-200  items-center justify-between px-2 pt-[20px] pb-2  flex-col  ">
      <div className="flex flex-col items-center justify-center gap-6">
        <Logo />
        <div className="flex flex-col items-center justify-center gap-4">
          <Button variant="outline" className="p-2 rounded-lg">
            <Link href="/">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="p-2 rounded-lg">
                <History className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[300px] p-2 mt-[150px] "
              side="right"
              sideOffset={10}
            >
              <Command>
                <CommandInput placeholder="Search for previous chats..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Previous Chats">
                    {chats.map((chat, index) => (
                      <Link key={index} href={`/${chat.id}`}>
                        <CommandItem className="cursor-pointer ">
                          {chat.chatName}
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* <Button variant="ghost" className="p-2 rounded-lg"> */}
          {/*   <Flag className="h-5 w-5" /> */}
          {/* </Button> */}
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default Sidebar;
