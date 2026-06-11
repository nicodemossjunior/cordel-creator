const CordelBriefing = require("../models/cordel-briefing")
const openai = require("../config/openai")

module.exports = {
    async createCordel(req, res) {
        const briefing = new CordelBriefing(req.body)

        if (!briefing.tema || !briefing.tema.trim()) {
            return res.status(400).json({
                success: false,
                error: "O tema do cordel é obrigatório"
            })
        }

        const openaiAPI = openai.configuration()

        try {
            const response = await openaiAPI.chat.completions.create(openai.cordelCompletion(briefing))
            const content = response.choices[0].message.content

            return res.status(200).json({
                success: true,
                data: content
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error.response
                    ? error.response.data
                    : "there was an issue on the server"
            })
        }
    }
}
