class CordelBriefing {
    constructor({
        tema,
        personagem = "",
        cenario = "",
        tom = "bem-humorado",
        tamanho = "6 estrofes",
        publico = "geral",
        detalhe = "",
    }) {
        this.tema = tema
        this.personagem = personagem
        this.cenario = cenario
        this.tom = tom
        this.tamanho = tamanho
        this.publico = publico
        this.detalhe = detalhe
    }
}

module.exports = CordelBriefing
