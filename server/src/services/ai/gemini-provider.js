const { GoogleGenAI } = require("@google/genai")
const {
    buildGeminiPrompt,
    getMaxOutputTokens,
    getTemperature
} = require("./prompt-builder")

function buildGenerationConfig(briefing, model) {
    const config = {
        temperature: getTemperature(),
        maxOutputTokens: getMaxOutputTokens(briefing),
    }

    if (model.startsWith("gemini-2.5")) {
        config.thinkingConfig = {
            thinkingBudget: 0
        }
    }

    return config
}

function assertCompleteResponse(response) {
    const finishReason = response.candidates?.[0]?.finishReason

    if (finishReason === "MAX_TOKENS") {
        throw new Error("A resposta do Gemini foi interrompida por limite de tokens. Aumente MAX_OUTPUT_TOKENS no .env.")
    }
}

async function createCordel(briefing) {
    const client = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    })
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash"

    const response = await client.models.generateContent({
        model,
        contents: buildGeminiPrompt(briefing),
        config: buildGenerationConfig(briefing, model)
    })

    assertCompleteResponse(response)

    return response.text
}

module.exports = { createCordel }
