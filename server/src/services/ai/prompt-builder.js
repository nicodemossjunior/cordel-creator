function buildBriefingText(briefing) {
    const verseLimit = getVerseLimit(briefing)

    return [
        `Tema: ${briefing.tema}`,
        `Personagem principal: ${briefing.personagem || "livre"}`,
        `Cenario: ${briefing.cenario || "livre"}`,
        `Tom: ${briefing.tom || "bem-humorado"}`,
        `Tamanho: ${briefing.tamanho || "6 estrofes"}`,
        `Limite: no maximo ${verseLimit} versos, sem contar o titulo`,
        `Publico: ${briefing.publico || "geral"}`,
        `Detalhes adicionais: ${briefing.detalhe || "nenhum"}`
    ].join("\n")
}

function buildSystemPrompt() {
    return [
        "Voce e um poeta popular especialista em literatura de cordel brasileira.",
        "Crie somente texto: nao gere imagens, prompts de imagem, markdown, comentarios ou explicacoes.",
        "Crie uma historia original em portugues do Brasil, com musicalidade, referencias sensoriais nordestinas e narrativa clara.",
        "Use sextilhas: estrofes de 6 versos curtos, com rimas naturais nos versos pares.",
        "Respeite rigorosamente o limite de versos pedido pelo usuario.",
        "Evite caricaturas ofensivas, estereotipos pobres e imitacao direta de autores vivos.",
        "Entregue apenas um titulo curto e o cordel."
    ].join(" ")
}

function buildGeminiPrompt(briefing) {
    return `${buildSystemPrompt()}\n\nBriefing:\n${buildBriefingText(briefing)}`
}

function getVerseLimit(briefing) {
    const stanzaCount = Number.parseInt(briefing.tamanho, 10)
    const safeStanzaCount = Number.isNaN(stanzaCount) ? 6 : stanzaCount
    const cappedStanzaCount = Math.min(Math.max(safeStanzaCount, 1), 10)

    return cappedStanzaCount * 6
}

function getMaxOutputTokens(briefing) {
    const verseLimit = getVerseLimit(briefing)
    const estimatedTokens = 120 + verseLimit * 14
    const envLimit = Number.parseInt(process.env.MAX_OUTPUT_TOKENS, 10)
    const hardLimit = Number.isNaN(envLimit) ? 900 : envLimit

    return Math.min(estimatedTokens, hardLimit)
}

function getTemperature() {
    const envTemperature = Number.parseFloat(process.env.AI_TEMPERATURE)

    if (Number.isNaN(envTemperature)) {
        return 0.75
    }

    return Math.min(Math.max(envTemperature, 0), 1)
}

module.exports = {
    buildBriefingText,
    buildSystemPrompt,
    buildGeminiPrompt,
    getMaxOutputTokens,
    getTemperature,
    getVerseLimit
}
