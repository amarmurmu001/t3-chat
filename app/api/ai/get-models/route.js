import { NextResponse } from "next/server"

export async function GET() {
    try {
        const formattedModels = [
            {
                id: "qwen/qwen3.5-397b-a17b",
                name: "Qwen 3.5 397B",
                description: "NVIDIA hosted Qwen 3.5 397B",
                context_length: 16384,
                architecture: { modility: "text-text" },
                pricing: { prompt: "0", completion: "0" },
                top_provider: "NVIDIA",
            }
        ];

        return NextResponse.json({ success: true, models: formattedModels })

    } catch (error) {
        console.log("Error fetching models", error)

        return NextResponse.json({ success: false, error: "Failed to fetch models" }, { status: 500 })
    }
}