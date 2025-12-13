import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton } from "@/components/user-button";
import { MessageSquare, Plus, Zap, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useChatStore } from "@/app/modules/chat/store/chat-store";
import { useState, useMemo } from "react";
import { useDeleteChat } from "@/app/modules/chat/hooks/chat";

// This is sample data.

export function AppSidebar({ chats = [] }) {
  const { data: session } = useSession();
  const { activeChatId } = useChatStore();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedChatID, setSelectedChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { mutateAsync: deleteChat } = useDeleteChat();

  const handleDeleteChat = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteChat(id);
  };

  const filteredChats = useMemo(() => {
    if (!chats) return [];
    if (!searchQuery) {
      return chats;
    }

    const query = searchQuery.toLowerCase();
    return chats.filter((chat) => {
      return chat.title?.toLowerCase().includes(query);
    });
  }, [chats, searchQuery]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">T3 Chat</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Plus />
                    <span>New Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredChats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={chat.id === activeChatId}
                    className="group relative pr-8"
                  >
                    <Link href={`/chat/${chat.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate">{chat.title}</span>
                      <div
                        className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-sidebar-accent rounded-md"
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {filteredChats.length === 0 && (
                <div className="text-muted-foreground text-sm px-2 py-4 text-center">
                  No chats found
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2 flex  gap-4 font-semibold">
          <UserButton />
          <div>
            <p>{session?.user?.name}</p>

            {session?.user && (
              <p className="text-xs text-muted-foreground">Free</p>
            )}
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
