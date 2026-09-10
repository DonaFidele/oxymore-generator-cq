# Lunogramme

> **Where inner contradictions become poetry.**
>
> **Quand les contradictions intérieures deviennent poésie.**

🌙 · 🌙 · 🌙

## Description technique — Français

Lunogramme est une application web poétique qui transforme deux émotions, idées ou états contradictoires en oxymores originaux et en fragments poétiques. L'interface propose une expérience d'écriture nocturne, tandis qu'une route serveur prépare la génération structurée de contenus avec le Vercel AI SDK.

### Fonctionnalités

- Génération d'oxymores à partir de deux émotions ou concepts
- Production d'un poème court et d'une interprétation littéraire
- Interface responsive en français, pensée pour l'écriture introspective
- Validation des entrées, états de chargement et gestion des erreurs
- Réponse structurée côté serveur pour faciliter l'évolution vers plusieurs modèles

### Architecture technique

- **Frontend** : Next.js 16, React, TypeScript, Tailwind CSS
- **Backend** : Route Handler Next.js (`/api/generate`)
- **IA** : Vercel AI SDK, avec modèle configurable via `AI_MODEL`
- **Validation** : Zod
- **Typographie** : Geist et Cormorant Garamond via `next/font`
- **Déploiement recommandé** : Vercel

### Flux de génération

1. L'utilisateur saisit deux émotions ou concepts.
2. Le navigateur envoie une requête `POST` à `/api/generate`.
3. Le serveur valide et normalise les entrées.
4. Le modèle génère des oxymores, un poème et une interprétation.
5. L'interface affiche le résultat sous forme de cartes poétiques.

## Technical Description — English

Lunogramme is a poetic web application that turns two conflicting emotions, ideas, or states into original oxymorons and short poetic fragments. It combines a nocturnal writing interface with a server-side generation route designed for structured AI output.

### Features

- Generate original oxymorons from two emotions or concepts
- Produce a short poem and a literary interpretation
- Responsive French-first interface designed for introspective writing
- Input validation, loading states, and error handling
- Structured server responses ready for multiple model providers

### Technical Architecture

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Backend**: Next.js Route Handler (`/api/generate`)
- **AI**: Vercel AI SDK, with a configurable model through `AI_MODEL`
- **Validation**: Zod
- **Typography**: Geist and Cormorant Garamond through `next/font`
- **Recommended deployment**: Vercel

### Generation Flow

1. The user enters two emotions or concepts.
2. The browser sends a `POST` request to `/api/generate`.
3. The server validates and normalizes the inputs.
4. The model generates oxymorons, a poem, and an interpretation.
5. The interface renders the result as poetic cards.

## Quick Start

```bash
git clone https://github.com/<your-username>/oxymore-generator.git
cd oxymore-generator
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```bash
AI_GATEWAY_API_KEY=your_key
AI_MODEL=your-provider/your-model
```

The AI Gateway configuration can be managed from the Vercel project settings. Never commit secret values to GitHub.

## Hashtags GitHub

GitHub does not render hashtags as repository topics automatically. Add these terms in the repository **About → Topics** field, without the `#` symbol:

`poetry` `poem-generator` `oxymoron` `generative-ai` `ai-poetry` `creative-writing` `nextjs` `typescript` `react` `vercel-ai-sdk` `tailwindcss` `french-tech`

For a social post or project description, use:

```text
#poetry #poemgenerator #oxymoron #generativeAI #aipoetry #creativewriting #NextJS #TypeScript #React #VercelAI #TailwindCSS #FrenchTech
```

## Roadmap

- Add saved poetic sessions
- Add sharing and exportable poetry cards
- Add lunar prompts and themed writing rituals
- Add multilingual generation
- Add model and tone selection

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

🌙 · 🌙 · 🌙

© 2026 Lunogramme

---

## Connexion à GitHub / Connecting GitHub

Dans v0, ouvre **Settings → GitHub**, connecte ton compte, puis sélectionne ou crée le dépôt `oxymore-generator`. Le dépôt n'est pas encore lié dans cet environnement : la commande `gh repo view` n'a trouvé aucun remote GitHub configuré.

In v0, open **Settings → GitHub**, connect your account, then select or create the `oxymore-generator` repository. This environment is not linked to a GitHub remote yet: `gh repo view` found no configured GitHub remote.

Après la connexion, utilise **Git → Push changes** ou crée une pull request depuis l'interface v0. Vérifie le README et remplace `<your-username>` par ton identifiant GitHub avant de publier.

After connecting, use **Git → Push changes** or create a pull request from the v0 interface. Review the README and replace `<your-username>` with your GitHub username before publishing.
