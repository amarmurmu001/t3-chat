"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="font-medium">New Chat</div>
            <ModeToggle/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 lg:p-8">
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                 <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">How can I help you today?</h2>
                 <p className="max-w-[500px]">I'm here to assist you with coding, questions, or just to chat. Start by typing a message below.</p>
            </div>
            
            <div className="max-w-3xl w-full mx-auto relative mb-4">
                 <div className="relative flex items-center w-full">
                    <input 
                        className="flex h-12 lg:h-14 w-full rounded-2xl border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-12 shadow-sm"
                        placeholder="Message T3 Chat..."
                     />
                     <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 lg:h-10 lg:w-10 rounded-full" variant="ghost">
                        <Send className="h-5 w-5" />
                     </Button>
                 </div>
                 <p className="text-xs text-center text-muted-foreground mt-2">
                    AI can make mistakes. Please verify important information.
                 </p>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

