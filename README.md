# Cordel Creator

Aplicação para criar histórias de cordel com IA, construída a partir da base do `chatgpt-clone`.

## Estrutura

- `web/`: frontend React com formulário de briefing e visual do folheto.
- `server/`: API Express que monta o prompt especializado e chama a OpenAI API.

## Rodando localmente

Terminal 1:

```bash
cd server
npm install
cp .env.example .env
npm start
```

Terminal 2:

```bash
cd web
npm install
npm start
```

O servidor usa `http://localhost:5555` e o frontend abre em `http://localhost:3000`.
