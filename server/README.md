# Cordel Creator Server

API Express que recebe um briefing e gera um cordel usando a OpenAI API.

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
PORT=5555
```

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
