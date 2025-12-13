"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSession } from "@/lib/auth-client";
import { WelcomeMessage } from "@/components/welcome-message";
import { ChatMessageForm } from "@/components/chat-message-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllChats } from "@/app/modules/chat/actions/index";

export default function Home() {
  const { data: session, isPending } = useSession();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      getAllChats().then((res) => {
        if (res.success) {
          setChats(res.chats);
        }
      });
    }
  }, [session]);

  const handleMessageChange = () => {};

  if (isPending || !session) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="font-medium">New Chat</div>
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-8">
          <WelcomeMessage name={session?.user?.name} />

          <ChatMessageForm
            initialMessage=""
            onMessageChange={handleMessageChange}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
