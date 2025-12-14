import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserButton } from "@/components/user-button";
import { MessageSquare, Plus, Zap, Trash2, Search, Bot } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useChatStore } from "@/app/modules/chat/store/chat-store";
import { useState, useMemo } from "react";
import { useDeleteChat } from "@/app/modules/chat/hooks/chat";
import { Label } from "@/components/ui/label";

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

  const { filteredChats, groupedChats } = useMemo(() => {
    if (!chats) return { filteredChats: [], groupedChats: {} };

    // First, filter by search query
    let filtered = chats;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = chats.filter((chat) => {
        return chat.title?.toLowerCase().includes(query);
      });
    }

    // Then, group by date
    const groups = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      Older: [],
    };

    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);
    const last7DaysStart = new Date(todayStart);
    last7DaysStart.setDate(todayStart.getDate() - 7);

    filtered.forEach((chat) => {
      const chatDate = new Date(chat.createdAt);

      if (chatDate >= todayStart) {
        groups["Today"].push(chat);
      } else if (chatDate >= yesterdayStart) {
        groups["Yesterday"].push(chat);
      } else if (chatDate >= last7DaysStart) {
        groups["Previous 7 Days"].push(chat);
      } else {
        groups["Older"].push(chat);
      }
    });

    return { filteredChats: filtered, groupedChats: groups };
  }, [chats, searchQuery]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Bot className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Qubot</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <form onSubmit={(e) => e.preventDefault()}>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <SidebarInput
                id="search"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
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
          <SidebarGroupContent>
            {Object.entries(groupedChats).map(
              ([group, groupChats]) =>
                groupChats.length > 0 && (
                  <div key={group} className="mb-4">
                    <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {group}
                    </h3>
                    <SidebarMenu>
                      {groupChats.map((chat) => (
                        <SidebarMenuItem key={chat.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={chat.id === activeChatId}
                          >
                            <Link href={`/chat/${chat.id}`}>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span className="truncate">{chat.title}</span>
                            </Link>
                          </SidebarMenuButton>
                          <SidebarMenuAction
                            showOnHover
                            onClick={(e) => handleDeleteChat(e, chat.id)}
                          >
                            <Trash2 />
                            <span className="sr-only">Delete</span>
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                )
            )}
            {filteredChats.length === 0 && (
              <div className="text-muted-foreground text-sm px-2 py-4 text-center">
                No chats found
              </div>
            )}
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
