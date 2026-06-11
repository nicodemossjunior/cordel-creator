# Cordel Creator Server

API Express que recebe um briefing e gera um cordel usando OpenAI ou Gemini.

## Rodando

```bash
npm install
cp .env.example .env
npm start
```

Variáveis:

```env
OPENAI_API_KEY=sua_chave_aqui
OPENAI_MODEL=gpt-4o-mini
GEMINI_API_KEY=sua_chave_gemini
GEMINI_MODEL=gemini-2.5-flash
MAX_OUTPUT_TOKENS=900
AI_TEMPERATURE=0.75
PORT=5555
```

Ordem de uso:

- Se `OPENAI_API_KEY` existir, a API tenta OpenAI primeiro.
- Se OpenAI falhar e `GEMINI_API_KEY` existir, usa Gemini como fallback.
- Se não houver `OPENAI_API_KEY`, mas houver `GEMINI_API_KEY`, usa Gemini direto.
- Se nenhuma chave existir, retorna erro pedindo uma das duas variáveis.

Economia de tokens:

- O tamanho escolhido no frontend vira limite de versos: 4 estrofes = 24 versos, 6 = 36, 8 = 48, 10 = 60.
- `MAX_OUTPUT_TOKENS` define um teto global para a resposta, mesmo quando o usuário pede um cordel maior.
- `AI_TEMPERATURE` controla criatividade. Valores menores tendem a respostas mais previsíveis e menos expansivas.

## Endpoint

`POST /api/cordel`

```json
{
  "tema": "a chegada da chuva no sertão",
  "personagem": "Dona Severina",
  "cenario": "feira de Caruaru",
  "tom": "bem-humorado",
  "tamanho": "6 estrofes",
  "publico": "geral",
  "detalhe": "terminar com esperança"
}
```
