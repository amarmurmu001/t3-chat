import { NextResponse } from "next/server"
import { getAvailableModels } from "@/lib/ai-providers"

export async function GET() {
    try {
        const formattedModels = getAvailableModels()

        return NextResponse.json({ success: true, models: formattedModels })

    } catch (error) {
        console.log("Error fetching models", error)

        return NextResponse.json({ success: false, error: "Failed to fetch models" }, { status: 500 })
    }
}