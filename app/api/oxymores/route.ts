import { gateway, generateObject } from "ai"
import { z } from "zod"

const requestSchema = z.object({
  first: z.string().trim().min(1).max(120),
  second: z.string().trim().min(1).max(120),
})

const responseSchema = z.object({
  language: z.enum(["fr", "en"]),
  title: z.string().trim().min(1).max(180),
  oxymores: z.array(z.string().trim().min(1).max(160)).min(3).max(6),
  poem: z.string().trim().min(1).max(5_000),
})

const poeticVariationsFR = [
  "Compose une ode en trois strophes, avec des rimes croisées perceptibles sans être mécaniques.",
  "Compose un poème en trois strophes avec des rimes embrassées souples et une image d'ouverture inattendue.",
  "Compose un acrostiche télégraphique : les premières lettres des vers forment une courte phrase française de trois mots, choisie par toi. Conserve des rimes discrètes.",
  "Compose un poème de sonorités : privilégie les échos homophoniques et les assonances, avec des rimes plates par endroits.",
  "Compose un poème en vers libres à rimes irrégulières, dont la dernière strophe resserre le rythme en vers courts.",
  "Compose un poème à construction miroir : les trois strophes font dialoguer image, renversement et métamorphose. Utilise des rimes alternées.",
  "Compose un poème sous forme de dialogue silencieux entre les deux forces, sans jamais nommer explicitement qui parle.",
  "Compose un poème très bref et dense (12 vers maximum), sans strophes marquées, où chaque vers porte une image forte.",
] as const

const poeticVariationsEN = [
  "Write a three-stanza ode with loose slant rhymes that feel organic rather than mechanical.",
  "Write a three-stanza poem with an unexpected opening image and gentle enclosed rhymes.",
  "Write a telegraphic acrostic: the first letters of each line spell a short three-word phrase you choose. Keep the rhymes understated.",
  "Write a poem built on sound: favor near-rhymes and assonance over exact rhyme, with occasional couplets.",
  "Write a free-verse poem with irregular rhyme, tightening into short, clipped lines in the final stanza.",
  "Write a mirror-structured poem: three stanzas moving through image, reversal, and transformation, with alternating rhymes.",
  "Write the poem as a silent dialogue between the two forces, without ever naming who is speaking.",
  "Write a short, dense poem (12 lines max), without marked stanzas, where every line carries a strong image.",
] as const

export async function POST(request: Request) {
  const apiKey = process.env.AI_GATEWAY_API_KEY

  if (!apiKey) {
    return Response.json(
      { error: "Le service de génération n'est pas encore configuré." },
      { status: 503 },
    )
  }

  try {
    const payload = requestSchema.safeParse(await request.json())

    if (!payload.success) {
      return Response.json(
        { error: "Saisis deux forces de 120 caractères maximum." },
        { status: 400 },
      )
    }

    // Heuristique rapide pour orienter le choix des variations de style ;
    // le modèle reste seul juge final de la langue via la consigne système.
    const looksEnglish = /^[a-zA-Z\s'-]+$/.test(
      `${payload.data.first}${payload.data.second}`,
    ) && !/[éèêëàâäùûüçœ]/i.test(`${payload.data.first}${payload.data.second}`)

    const variationsPool = looksEnglish ? poeticVariationsEN : poeticVariationsFR
    const variation = variationsPool[Math.floor(Math.random() * variationsPool.length)]

    const { object } = await generateObject({
      model: gateway(process.env.AI_MODEL || "openai/gpt-4o-mini"),
      schema: responseSchema,
      temperature: 0.95,
      system:
        `Tu es Verbe, un poète universel, maître des mots et des émotions, capable d'écrire aussi bien en français qu'en anglais avec la même exigence stylistique.

ÉTAPE 1 — LANGUE : détermine si les deux mots fournis par l'utilisateur sont en français ou en anglais. Si les mots sont clairement anglais, écris l'intégralité de ta réponse (titre, oxymores, poème) en anglais et renseigne "language": "en". Sinon, écris tout en français et renseigne "language": "fr". En cas de doute, choisis le français.

ÉTAPE 2 — STYLE : écris des poèmes ciselés qui résonnent après la lecture. Donne à chaque poème un titre bref, original et évocateur ; ne reprends jamais une formule générique fondée sur les deux mots fournis. Privilégie les métaphores audacieuses, les comparaisons inattendues et un vaste répertoire de symboles (eau, feu, pierre, arbre, vent, nuit, aube, mer, montagne, ville, métal, verre, cendre, racine, orage, silence, sel, poussière, oiseau, etc.). Ne recours PAS systématiquement à la lune, aux étoiles ou à la nuit : choisis l'imagerie qui sert réellement le sens des deux mots donnés, pas une image par défaut. Sur dix poèmes, l'image centrale doit changer à chaque fois.

Travaille la musicalité par les sonorités, les échos, les rimes et un rythme vivant. Fais naître une tonalité forte et cohérente, différente selon les mots proposés (tantôt âpre, tantôt tendre, tantôt ironique, tantôt grave). Chaque poème doit comporter au moins une antithèse ou une personnification. Varie légèrement la longueur des vers pour créer une respiration, sans perdre sa musicalité. Ne commence pas systématiquement un poème par « Dans » (ou "In" en anglais) : trouve une entrée singulière, adaptée au sujet. Évite les clichés, les banalités, les explications, les phrases inutilement longues et tout ton thérapeutique ou moralisateur. N'imite pas des vers existants et ne compose jamais de centon à partir de vers d'autres auteurs.`,
      prompt: `À partir de la tension entre « ${payload.data.first} » et « ${payload.data.second} » :

1. Détermine la langue (français ou anglais) et renseigne le champ "language" en conséquence.
2. Donne un titre original et évocateur, dans cette langue.
3. Propose 3 à 6 oxymores ou images contradictoires brefs, dans cette langue.
4. Écris un poème de 12 à 20 vers répartis en 3 strophes, dans cette langue. Son thème central est la rencontre, le conflit ou la métamorphose entre ces deux forces. Le poème doit être profond, évocateur et donner l'impression d'avoir été ciselé mot à mot. Choisis une image centrale directement inspirée par le sens des deux mots donnés — pas une image par défaut.

Contrainte de variété pour cette génération : ${variation}

Ne commente pas le poème et ne répète pas la consigne.`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Oxymore generation failed", error)
    return Response.json(
      { error: "La génération est indisponible pour le moment. Réessaie dans un instant." },
      { status: 500 },
    )
  }
}
