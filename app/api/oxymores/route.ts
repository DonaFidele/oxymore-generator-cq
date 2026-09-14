import { gateway, generateObject } from "ai"
import { z } from "zod"

const requestSchema = z.object({
  first: z.string().trim().min(1).max(120),
  second: z.string().trim().min(1).max(120),
})

const responseSchema = z.object({
  title: z.string().trim().min(1).max(180),
  oxymores: z.array(z.string().trim().min(1).max(160)).min(3).max(6),
  poem: z.string().trim().min(1).max(5_000),
})

const poeticVariations = [
  "Compose une ode en trois strophes, avec des rimes croisées perceptibles sans être mécaniques.",
  "Compose un poème en trois strophes avec des rimes embrassées souples et une image d'ouverture inattendue.",
  "Compose un acrostiche télégraphique: les premières lettres des vers forment une courte phrase française de trois mots, choisie par toi. Conserve des rimes discrètes.",
  "Compose un poème de sonorités: privilégie les échos homophoniques et les assonances, avec des rimes plates par endroits.",
  "Compose un poème en vers libres à rimes irrégulières, dont la dernière strophe resserre le rythme en vers courts.",
  "Compose un poème à construction miroir: les trois strophes font dialoguer image, renversement et métamorphose. Utilise des rimes alternées.",
] as const

export async function POST(request: Request) {
  const apiKey = process.env.AI_GATEWAY_API_KEY

  if (!apiKey) {
    return Response.json(
      { error: "Le service de génération n’est pas encore configuré." },
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

    const variation = poeticVariations[Math.floor(Math.random() * poeticVariations.length)]

    const { object } = await generateObject({
      model: gateway(process.env.AI_MODEL || "openai/gpt-4o-mini"),
      schema: responseSchema,
      temperature: 0.9,
      system:
        `Tu es Lunogramme, un poète français universel, maître des mots et des émotions. Ta langue est précise, incarnée, profonde et évocatrice, dans la grande tradition de la poésie lyrique et mystique.

Écris des poèmes ciselés qui résonnent après la lecture. Donne à chaque poème un titre bref, original et évocateur; ne reprends jamais une formule générique fondée sur les deux mots fournis. Privilégie les métaphores audacieuses, les comparaisons inattendues et les symboles universels (eau, feu, arbre, vent, nuit, aube). Travaille la musicalité par les sonorités, les échos, les rimes et un rythme vivant. Fais naître une tonalité forte et cohérente.

Chaque poème doit comporter au moins une antithèse ou une personnification. Varie légèrement la longueur des vers pour créer une respiration, sans perdre sa musicalité. Ne commence pas systématiquement un poème par « Dans »: trouve une entrée singulière, adaptée au sujet. Évite les clichés, les banalités, les explications, les phrases inutilement longues et tout ton thérapeutique ou moralisateur. N'imite pas des vers existants et ne compose jamais de centon à partir de vers d'autres auteurs.`,
      prompt: `À partir de la tension entre « ${payload.data.first} » et « ${payload.data.second} » :

1. Donne un titre original et évocateur.
2. Propose 3 à 6 oxymores ou images contradictoires brefs, en français.
3. Écris un poème français de 12 à 20 vers répartis en 3 strophes. Son thème central est la rencontre, le conflit ou la métamorphose entre ces deux forces. Le poème doit être profond, évocateur et donner l'impression d'avoir été ciselé mot à mot.

Contrainte de variété pour cette génération: ${variation}

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
