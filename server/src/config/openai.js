const { OpenAI } = require("openai")

module.exports = class openai {
    static configuration() {
        return new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        })
    }

    static cordelCompletion(briefing) {
        const userPrompt = [
            `Tema: ${briefing.tema}`,
            `Personagem principal: ${briefing.personagem || "livre"}`,
            `Cenario: ${briefing.cenario || "livre"}`,
            `Tom: ${briefing.tom}`,
            `Tamanho: ${briefing.tamanho}`,
            `Publico: ${briefing.publico || "geral"}`,
            `Detalhes adicionais: ${briefing.detalhe || "nenhum"}`
        ].join("\n")

        return {
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: [
                        "Voce e um poeta popular especialista em literatura de cordel brasileira.",
                        "Crie uma historia original em portugues do Brasil, com musicalidade, imagens nordestinas e narrativa clara.",
                        "Use sextilhas sempre que possivel: estrofes de 6 versos curtos, com rimas naturais nos versos pares.",
                        "Evite caricaturas ofensivas, estereotipos pobres e imitacao direta de autores vivos.",
                        "Entregue apenas o titulo e o cordel, sem explicacoes sobre as regras."
                    ].join(" ")
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            temperature: 0.9,
            max_tokens: 1600,
        }
    }
}
