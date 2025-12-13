import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import db from "@/lib/db"
import { MessageRole, MessageType } from "@/generated/prisma"

export async function POST(request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { messages, model, chatId } = await request.json()

        if (!messages || !model) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Call OpenRouter with streaming enabled
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                stream: true
            })
        })

        if (!response.ok) {
            throw new Error("Failed to fetch AI response")
        }

        // Create a TransformStream to accumulate the full response
        let fullContent = ""

        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body.getReader()
                const decoder = new TextDecoder()

                try {
                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) break

                        const chunk = decoder.decode(value, { stream: true })
                        const lines = chunk.split("\n").filter(line => line.trim() !== "")

                        for (const line of lines) {
                            if (line.startsWith("data: ")) {
                                const data = line.slice(6)

                                if (data === "[DONE]") {
                                    // Save the complete message to database
                                    if (chatId && fullContent) {
                                        await db.message.create({
                                            data: {
                                                messageRole: MessageRole.ASSISTANT,
                                                messageType: MessageType.NORMAL,
                                                content: fullContent,
                                                model,
                                                chatId
                                            }
                                        })
                                    }
                                    controller.close()
                                    return
                                }

                                try {
                                    const parsed = JSON.parse(data)
                                    const content = parsed.choices?.[0]?.delta?.content || ""
                                    if (content) {
                                        fullContent += content
                                        controller.enqueue(new TextEncoder().encode(content))
                                    }
                                } catch (e) {
                                    // Skip invalid JSON
                                }
                            }
                        }
                    }

                    // If we exit the loop without [DONE], still save what we have
                    if (chatId && fullContent) {
                        await db.message.create({
                            data: {
                                messageRole: MessageRole.ASSISTANT,
                                messageType: MessageType.NORMAL,
                                content: fullContent,
                                model,
                                chatId
                            }
                        })
                    }
                    controller.close()
                } catch (error) {
                    console.error("Stream error:", error)
                    controller.error(error)
                }
            }
        })

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked"
            }
        })

    } catch (error) {
        console.error("Streaming error:", error)
        return NextResponse.json({ error: "Failed to stream response" }, { status: 500 })
    }
}
