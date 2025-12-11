import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"

export function ChatMessageForm({initialMessage, onMessageChange}) {

    const [message, setMessage] = useState("")
    useEffect(() => {
        if(initialMessage){
            setMessage(initialMessage)
            onMessageChange("")
        }
    }, [initialMessage,onMessageChange])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Message Sent")
        onMessageChange(message)
        setMessage("")
    }
    return (
        <div className="max-w-3xl w-full mx-auto relative mb-4">
             <div className="relative flex items-center w-full">
                <form action="" onSubmit={handleSubmit} className="w-full">
                <textarea
                    className="flex  h-12 lg:h-14 w-full rounded-2xl border border-input bg-background px-4 py-2 text-base ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pr-12 shadow-sm"
                    placeholder="Message T3 Chat..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault()
                            handleSubmit(e)
                        }
                    }}
                 />
                 <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 lg:h-10 lg:w-10 rounded-full" variant="ghost">
                    <Send className="h-5 w-5" />
                 </Button>
             </form>
             </div>
             <p className="text-xs text-center text-muted-foreground mt-2">
                AI can make mistakes. Please verify important information.
             </p>
        </div>
    )
}
