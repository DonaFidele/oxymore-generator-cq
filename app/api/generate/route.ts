import { gateway, generateObject } from 'ai'
import { z } from 'zod'

const generationSchema = z.object({
  poem: z.string().min(1),
  promptEcriture: z.string().min(1),
})

const phaseIntentions: Record<string, string> = {
  New: 'le deuil, le silence et le recommencement',
  'Waxing Crescent': 'un élan fragile et le désir de naître',
  'First Quarter': 'le choix, la tension et le passage à l’acte',
  'Waxing Gibbous': 'la maturation et la lumière intérieure',
  Full: 'la colère, l’amour brut et la vérité exposée',
  'Waning Gibbous': 'la transmission, la gratitude et le partage',
  'Last Quarter': 'le tri, la lucidité et le détachement',
  'Waning Crescent': 'le repos, la mémoire et le retour à soi',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const mood = typeof body.mood === 'string' ? body.mood.trim() : ''
    const moonPhase = typeof body.moonPhase === 'string' ? body.moonPhase : ''
    const intention = phaseIntentions[moonPhase] || 'l’écoute et la transformation'

    if (!mood || mood.length > 500 || !moonPhase) {
      return Response.json({ error: 'Ton humeur et la phase lunaire sont nécessaires.' }, { status: 400 })
    }

    const { object } = await generateObject({
      model: gateway('openai/gpt-4o-mini'),
      schema: generationSchema,
      system: 'Tu es Lunogramme, un atelier de poésie française nocturne. Tu écris avec précision, douceur et une légère étrangeté. Ne sois jamais thérapeutique, moralisateur ou explicatif.',
      prompt: `L’humeur de la personne est : « ${mood} ».
La phase lunaire est : « ${moonPhase} », avec cette intention poétique : ${intention}.
Écris un poème français de 5 à 8 vers, sans titre, qui accueille cette humeur et laisse l’intention lunaire agir comme une contrainte poétique. Puis propose un prompt d’écriture personnel, concret et évocateur en français, en une ou deux phrases.`,
    })

    return Response.json(object)
  } catch {
    return Response.json({ error: 'La lune est voilée pour le moment. Réessaie dans un instant.' }, { status: 500 })
  }
}
