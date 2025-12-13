import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createChatWithMessage } from "../actions"

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