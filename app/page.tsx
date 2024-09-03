import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LandingInterface from "@/components/LandingInterface";
import NonLogHeader from "@/components/ui/NonLogHeader";

import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId }: { userId: string | null } = auth();

  return (
    <div className="flex flex-col items-center justify-between h-screen min-h-screen px-6 ">
      {userId ? <Header /> : <NonLogHeader />}
      <LandingInterface />
      <Footer />
    </div>
  );
}
