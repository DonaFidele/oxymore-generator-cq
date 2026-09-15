<div align="center">

# 🌙 Oxymore — the contradictory poem generator

**Pair two words that were never meant to meet. Watch poetry emerge from the collision.**

Oxymore turns two opposing forces — *tenderness* and *distance*, *war* and *peace* — into a unique AI-generated poetic fragment. Publish it, let the community react, or generate a poem straight from an image.

[**✨ Try it live**](https://oxymore-generator.vercel.app) · [Report a bug](../../issues) · [Suggest an idea](../../issues)

<!-- Replace the line below with a GIF showing a poem being generated -->
![Oxymore generator demo](./docs/demo.gif)

[![Build](https://img.shields.io/github/actions/workflow/status/DonaFidele/oxymore-generator-cq/deploy.yml?label=build&style=flat-square)](../../actions)
[![License](https://img.shields.io/badge/license-MIT-blueviolet?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-purple?style=flat-square)](../../releases)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)

</div>

---

## Why Oxymore?

Every poem is born from tension: two words, two images, two emotions that were never supposed to collide. The space between them becomes poetry. Built for:

- ✍️ **Writing enthusiasts** who want a creative spark without a blank page
- 🎨 **Visual creatives** who'd rather start from an image than words
- 🌐 **A quiet community** — no account required, anonymous posting, built-in comments and likes

## Features

- 🪄 Generate a poem from **two contrasting words/expressions**
- 🖼️ Generate a poem from an **uploaded image**
- 💬 Nested comments (replies to replies) and a like system
- 🌍 Auto-translated interface, user content stays untouched
- 📱 Responsive design, glassmorphism, zero friction — no sign-up needed

## Quick start

Clone and run locally in under two minutes:

```bash
git clone https://github.com/DonaFidele/oxymore-generator-cq.git
cd oxymore-generator-cq
npm install
```

Copy the example env file and add your API key:

```bash
cp .env.example .env.local
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're set.

## One-liner usage

Call the generation API directly:

```bash
curl -X POST http://localhost:3000/api/oxymores \
  -H "Content-Type: application/json" \
  -d '{"first": "tenderness", "second": "distance"}'
```

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Next.js Route Handler (`/api/oxymores`) |
| AI | Vercel AI Gateway via AI SDK, configurable model via `AI_MODEL` |
| Validation | Zod |
| Typography | Geist, Cormorant Garamond (`next/font`) |
| Deployment | Vercel |

## Contributing

Contributions are welcome! Open an [issue](../../issues) or a pull request — see `CONTRIBUTING.md` for details.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center"> Made with 🧠✨ by <a href="https://github.com/DonaFidele">Dona😎</a> </div>
