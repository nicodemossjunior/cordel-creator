const { OpenAI } = require("openai")
const {
    buildBriefingText,
    buildSystemPrompt,
    getMaxOutputTokens,
    getTemperature
} = require("./prompt-builder")

function assertCompleteResponse(response) {
    const finishReason = response.choices?.[0]?.finish_reason

    if (finishReason === "length") {
        throw new Error("A resposta da OpenAI foi interrompida por limite de tokens. Aumente MAX_OUTPUT_TOKENS no .env.")
    }
}

async function createCordel(briefing) {
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: buildSystemPrompt()
            },
            {
                role: "user",
                content: buildBriefingText(briefing)
            }
        ],
        temperature: getTemperature(),
        max_tokens: getMaxOutputTokens(briefing),
    })

    assertCompleteResponse(response)

    return response.choices[0].message.content
}

module.exports = { createCordel }
