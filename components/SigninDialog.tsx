"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";

type SigninDialogProps = {
  open: boolean;
  onClose: () => void;
};

const SigninDialog = ({ open, onClose }: SigninDialogProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Sign in to V0.1</DrawerTitle>
            <DrawerDescription>
              An account is required to use v0.1
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleSignIn}>Sign in</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to V0.1</DialogTitle>
          <DialogDescription>
            An account is required to use v0.1
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 w-full items-center justify-end">
          <Button onClick={handleSignIn}>Sign in</Button>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SigninDialog;
