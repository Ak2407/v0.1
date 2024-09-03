import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { Toaster } from "sonner";
import Sidebar from "./[chatId]/_components/Sidebar";

import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <div className="flex ">
            {userId && <Sidebar />}
            <main
              className={`${
                userId ? "w-screen sm:w-[calc(100vw-60px)]" : "w-screen"
              }  `}
            >
              {children}
            </main>
          </div>
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}