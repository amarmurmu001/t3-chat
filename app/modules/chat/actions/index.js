"use server"
import db from "@/lib/db"
import { randomUUID } from "crypto"
import { MessageRole, MessageType } from "@/generated/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { success } from "zod"
import { revalidatePath } from "next/cache"


const getAIResponse = async (messages, model) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: messages
            })
        })

        if (!response.ok) {
            throw new Error("Failed to fetch AI response")
        }

        const data = await response.json()
        return data.choices[0].message.content

    } catch (error) {
        console.error("AI Response Error:", error)
        return "Sorry, I am unable to process your request at the moment."
    }
}

export const createChatWithMessage = async (values) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }
        const { content, model } = values

        if (!content || !content.trim()) {
            return {
                success: false,
                message: "Content is required"
            }
        }

        const title = content.slice(0, 50) + (content.length > 50 ? "..." : "")
        const chat = await db.chat.create({
            data: {
                id: randomUUID(),
                title,
                model,
                userId: session.user.id,
                messages: {
                    create: {
                        messageRole: MessageRole.USER,
                        messageType: MessageType.NORMAL,
                        content,
                        model
                    }
                },

            },
            include: {
                messages: true
            }
        })

        revalidatePath("/")

        return {
            success: true,
            message: "Chat created successfully",
            chat
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Faild to create chat"
        }
    }

}

export const getAllChats = async () => {
    try {
        const user = await auth.api.getSession({
            headers: await headers()
        })
        if (!user) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }
        const chats = await db.chat.findMany({
            where: {
                userId: user.user.id
            },
            include: {
                messages: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return {
            success: true,
            message: "Chat fetched successfully",
            chats
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Faild to fetch chat"
        }
    }
}

export const getChatById = async (id) => {
    try {
        const user = await auth.api.getSession({
            headers: await headers()
        })
        if (!user) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }
        const chat = await db.chat.findUnique({
            where: {
                id,
                userId: user.user.id
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })
        return {
            success: true,
            chat
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch chat"
        }
    }
}

export const updateChatWithMessage = async (values) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }
        const { chatId, content, model } = values

        if (!content || !content.trim()) {
            return {
                success: false,
                message: "Content is required"
            }
        }

        // Save User Message
        const message = await db.message.create({
            data: {
                messageRole: MessageRole.USER,
                messageType: MessageType.NORMAL,
                content,
                model,
                chatId
            }
        })

        // Update Chat Model
        await db.chat.update({
            where: {
                id: chatId
            },
            data: {
                model
            }
        })

        // Fetch Chat History for Context
        const previousMessages = await db.message.findMany({
            where: { chatId },
            orderBy: { createdAt: "asc" }
        })

        const formattedMessages = previousMessages.map(msg => ({
            role: msg.messageRole.toLowerCase(),
            content: msg.content
        }))

        revalidatePath(`/chat/${chatId}`)

        return {
            success: true,
            message: "Message added successfully",
            newMessage: message,
            previousMessages: formattedMessages
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to add message"
        }
    }
}

export const deleteChat = async (id) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }
        await db.chat.delete({
            where: {
                id,
                userId: session.user.id
            }
        })
        revalidatePath("/")
        return {
            success: true,
            message: "Chat deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete chat"
        }
    }
}