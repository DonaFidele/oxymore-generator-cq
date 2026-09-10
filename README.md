<div align="center">

# 🌙 Lunogramme

![Lunogramme banner](./docs/banner.svg)

**Where feelings meet AI poetry.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![Vercel AI SDK](https://img.shields.io/badge/Vercel-AI%20SDK-black?logo=vercel)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

🌑 · 🌒 · 🌓 · 🌔 · 🌕 · 🌖 · 🌗 · 🌘

</div>

---

## 🌗 Poem of the Day

<table>
<tr>
<td width="40%" align="center">

<img width="1379" height="910" alt="image" src="https://github.com/user-attachments/assets/886c4330-c3e2-4a43-b6cf-2658d429637b" />


</td>
<td width="60%">

> *the room stays empty*
> *covered with a film of dust*
> *for the story never told*

— **Lunogramme** · 🌕 Full Moon · Sep 05, 2026

</td>
</tr>
</table>

---

## About

Lunogramme turns feelings into poetry. Instead of a generic "AI poem generator," it ties writing to two anchors familiar to anyone who has ever needed to put something into words at 2am: **opposing emotions** and **moon phases**. No fine-tuned model, no training data — just careful prompt engineering on top of a language model, tuned for raw and sincere verses rather than generic AI filler.

## Features

- 🌗 **Oxymore Generator** — enter two opposing emotions and receive 10 punchy oxymoron phrases plus a full poem exploring the tension between them
- 🌙 **Lunar Ritual** — a daily writing ritual: today's moon phase + your mood in, a poem and a writing prompt tuned to that phase's intent out
- 🖋️ **Structured generation** — the model always answers in strict JSON, validated with Zod, so the UI never has to guess where the poem ends and the prompt begins
- 🎨 **Distinct visual identity** — Geist for UI, Cormorant Garamond for verses, a black/silver/violet palette built for reading at night

## How It Works

1. **Collect** — the frontend gathers two emotions, or a mood and the current moon phase
2. **Validate** — the payload is checked with Zod before it ever reaches the model
3. **Generate** — a Next.js Route Handler (`/api/generate`) calls the model configured in `AI_MODEL` via the Vercel AI SDK, with a system prompt tuned for raw, cliché-free verse
4. **Parse** — the model's strict JSON response (`{ oxymores, poeme }` or `{ poeme, prompt_ecriture }`) is parsed directly, no post-processing needed
5. **Render** — the poem appears typeset in Cormorant Garamond, ready to read, screenshot, or share

## Quick Start

```bash
git clone https://github.com/<your-username>/lunogramme.git
cd lunogramme
npm install
cp .env.example .env   # set AI_MODEL and your provider's API key
npm run dev
```

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Next.js Route Handler (`/api/generate`) |
| AI | Vercel AI SDK, configurable model via `AI_MODEL` |
| Validation | Zod |
| Typography | Geist, Cormorant Garamond (`next/font`) |
| Deployment | Vercel |

## Roadmap

- [ ] Persist generated poems per user
- [ ] Text-to-speech playback (calm, deep, or spoken-word tone)
- [ ] Living library: users post their own verses, others "react in verse" instead of liking
- [ ] Rate limiting on `/api/generate`

## Disclaimer

This is an early-stage creative/experimental project, not a mental health tool. If a feature ever touches on distress, grief, or crisis writing, it is designed to point toward real support — never to replace it.

## License

This project is licensed under the [MIT License](./LICENSE) — feel free to reuse, modify, and contribute.

---

<div align="center">
