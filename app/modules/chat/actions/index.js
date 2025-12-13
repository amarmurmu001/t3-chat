"use server"
import db from "@/lib/db"
import { randomUUID } from "crypto"
import { MessageRole, MessageType } from "@/generated/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { success } from "zod"
import { revalidatePath } from "next/cache"

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