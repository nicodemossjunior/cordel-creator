const { GoogleGenAI } = require("@google/genai")
const {
    buildGeminiPrompt,
    getMaxOutputTokens,
    getTemperature
} = require("./prompt-builder")

async function createCordel(briefing) {
    const client = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    })

    const response = await client.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        contents: buildGeminiPrompt(briefing),
        config: {
            temperature: getTemperature(),
            maxOutputTokens: getMaxOutputTokens(briefing),
        }
    })

    return response.text
}

module.exports = { createCordel }
