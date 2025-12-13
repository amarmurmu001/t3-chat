import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createChatWithMessage, updateChatWithMessage, getChatById, deleteChat } from "../actions"
import { toast } from "sonner"
import { useState, useCallback } from "react"

export const useCreateChat = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (values) => createChatWithMessage(values),
        onSuccess: (response) => {
            if (response.success && response.chat) {
                queryClient.invalidateQueries(
                    ["chats"]
                );
                router.push(`/chat/${response.chat.id}`)
            }
        },
        onError: () => {
            console.log("Failed to create chat")
            toast.error("Failed to create chat")

        }
    });
}

export const useUpdateChat = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (values) => updateChatWithMessage(values),
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries(["chat", response.newMessage.chatId])
                queryClient.invalidateQueries(["chats"])
            }
        },
        onError: () => {
            console.log("Failed to update chat")
            toast.error("Failed to update chat")
        }
    })
}

export const useDeleteChat = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (id) => deleteChat(id),
        onSuccess: (response) => {
            if (response.success) {
                queryClient.invalidateQueries(["chats"])
                toast.success("Chat deleted")
                router.push("/")
            }
        },
        onError: () => {
            console.log("Failed to delete chat")
            toast.error("Failed to delete chat")
        }
    })
}

export const useGetChat = (id) => {
    return useQuery({
        queryKey: ["chat", id],
        queryFn: async () => {
            const response = await getChatById(id)
            return response
        },
        enabled: !!id
    })
}

export const useStreamChat = () => {
    const [isStreaming, setIsStreaming] = useState(false)
    const [streamingContent, setStreamingContent] = useState("")
    const queryClient = useQueryClient()

    const startStreaming = useCallback(async ({ messages, model, chatId, onChunk }) => {
        setIsStreaming(true)
        setStreamingContent("")

        try {
            const response = await fetch("/api/chat/stream", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ messages, model, chatId })
            })

            if (!response.ok) {
                throw new Error("Failed to start streaming")
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let fullContent = ""

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                fullContent += chunk
                setStreamingContent(fullContent)
                if (onChunk) onChunk(chunk, fullContent)
            }

            // Invalidate chat query to fetch the saved message
            if (chatId) {
                queryClient.invalidateQueries(["chat", chatId])
            }

            return fullContent
        } catch (error) {
            console.error("Streaming error:", error)
            toast.error("Failed to get AI response")
            throw error
        } finally {
            setIsStreaming(false)
        }
    }, [queryClient])

    const resetStream = useCallback(() => {
        setStreamingContent("")
    }, [])

    return {
        isStreaming,
        streamingContent,
        startStreaming,
        resetStream
    }
}