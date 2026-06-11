const CordelBriefing = require("../models/cordel-briefing")
const ai = require("../services/ai")

module.exports = {
    async createCordel(req, res) {
        const briefing = new CordelBriefing(req.body)

        if (!briefing.tema || !briefing.tema.trim()) {
            return res.status(400).json({
                success: false,
                error: "O tema do cordel é obrigatório"
            })
        }

        try {
            const content = await ai.createCordel(briefing)

            return res.status(200).json({
                success: true,
                data: content
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                error: error.message || "Não foi possível gerar o cordel"
            })
        }
    }
}
