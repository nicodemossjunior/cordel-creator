const openaiProvider = require("./openai-provider")
const geminiProvider = require("./gemini-provider")

async function createCordel(briefing) {
    const hasOpenAI = Boolean(process.env.OPENAI_API_KEY)
    const hasGemini = Boolean(process.env.GEMINI_API_KEY)

    if (hasOpenAI) {
        try {
            return await openaiProvider.createCordel(briefing)
        } catch (error) {
            if (!hasGemini) {
                throw error
            }

            console.warn("OpenAI falhou. Tentando Gemini como fallback.")
        }
    }

    if (hasGemini) {
        return geminiProvider.createCordel(briefing)
    }

    throw new Error("Configure OPENAI_API_KEY ou GEMINI_API_KEY no .env")
}

module.exports = { createCordel }
