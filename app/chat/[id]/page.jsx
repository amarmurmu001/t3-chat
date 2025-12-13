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
import { ChatMessageForm } from "@/components/chat-message-form";
import { useState, useEffect, useRef } from "react";
import { getAllChats } from "@/app/modules/chat/actions/index";
import { useGetChat, useStreamChat } from "@/app/modules/chat/hooks/chat";
import { useParams, useRouter } from "next/navigation";
import { Loader2, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const { data: session, isPending } = useSession();
  const [chats, setChats] = useState([]);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const messagesEndRef = useRef(null);

  const { data: chatData, isLoading: isChatLoading } = useGetChat(id);
  const chat = chatData?.chat;

  const { isStreaming, streamingContent, startStreaming, resetStream } =
    useStreamChat();

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
  }, [session, isChatLoading, isStreaming]);

  // Auto-scroll to bottom when new messages arrive or streaming
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, streamingContent]);

  const handleMessageChange = () => {
    // Refresh handled by query invalidation
  };

  const handleStartStreaming = async (messages, model) => {
    resetStream();
    await startStreaming({ messages, model, chatId: id });
  };

  if (isPending || !session) {
    return null;
  }

  const MessageBubble = ({ content, isUser }) => (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex gap-2 max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          } max-w-full overflow-hidden`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                return (
                  <code
                    className={`${className} ${
                      inline
                        ? "bg-black/10 dark:bg-white/10 rounded px-1"
                        : "block bg-black/10 dark:bg-white/10 p-2 rounded my-2 overflow-hidden"
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre({ node, children, ...props }) {
                return (
                  <pre className="m-0" {...props}>
                    {children}
                  </pre>
                );
              },
              ul({ node, children, ...props }) {
                return (
                  <ul className="list-disc pl-4 my-2" {...props}>
                    {children}
                  </ul>
                );
              },
              ol({ node, children, ...props }) {
                return (
                  <ol className="list-decimal pl-4 my-2" {...props}>
                    {children}
                  </ol>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <SidebarInset>
        <div className="flex flex-col h-svh">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="font-medium truncate max-w-[200px] md:max-w-md">
                {chat?.title || "Chat"}
              </div>
              <ModeToggle />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4 min-h-0">
            {isChatLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : chat?.messages && chat.messages.length > 0 ? (
              <>
                {chat.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    content={msg.content}
                    isUser={msg.messageRole === "USER"}
                  />
                ))}
                {/* Streaming message bubble */}
                {isStreaming && streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2 max-w-[80%] flex-row">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="rounded-lg px-4 py-2 bg-muted text-foreground max-w-full overflow-hidden">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {streamingContent}
                        </ReactMarkdown>
                        <span className="inline-block w-2 h-4 bg-foreground/50 animate-pulse ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                {/* Typing indicator when streaming starts but no content yet */}
                {isStreaming && !streamingContent && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2 max-w-[80%] flex-row">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
                        <div className="flex gap-1">
                          <span
                            className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center items-center h-full text-muted-foreground">
                No messages yet.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-background border-t shrink-0">
            <ChatMessageForm
              initialMessage=""
              onMessageChange={handleMessageChange}
              chatId={id}
              initialModel={chat?.model}
              onStartStreaming={handleStartStreaming}
              isStreaming={isStreaming}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
