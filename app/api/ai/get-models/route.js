import { NextResponse } from "next/server"

export async function GET() {
   try{

    const response = await fetch("https://openrouter.ai/api/v1/models",{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){
        throw new Error("Failed to fetch models")
    }
    const data = await response.json()
    const freeModels = data.data.filter((model) =>{
        const promptPrice = parseFloat(model.pricing?.prompt||"0")
        const completionPrice= parseFloat(model.pricing?.completion||"0")
        return promptPrice === 0 && completionPrice === 0
    })

    const formattedModels = freeModels.map((model) => ({
       id: model.id,
       name: model.name,
       description: model.description,
      context_length: model.context_length,
      architecture: model.architecture,
      pricing: model.pricing,
      top_provider: model.top_provider,
    }))

    return NextResponse.json({success: true, models:formattedModels})

   }catch(error){
    console.log("Error fetching models",error)

    return NextResponse.json({success: false, error: "Failed to fetch models"}, {status: 500})
   }
}