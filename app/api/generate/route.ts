import { gateway, generateObject } from 'ai'
import { z } from 'zod'

const generationSchema = z.object({
  oxymores: z.array(z.string()).min(3).max(5),
  poem: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const emotionOne = typeof body.emotionOne === 'string' ? body.emotionOne.trim() : ''
    const emotionTwo = typeof body.emotionTwo === 'string' ? body.emotionTwo.trim() : ''

    if (!emotionOne || !emotionTwo || emotionOne.length > 80 || emotionTwo.length > 80) {
      return Response.json({ error: 'Les deux émotions sont nécessaires.' }, { status: 400 })
    }

    const { object } = await generateObject({
      model: gateway('openai/gpt-4o-mini'),
      schema: generationSchema,
      system: `Tu es Lunogramme, un atelier de poésie française nocturne. Tu transformes les contradictions émotionnelles en oxymores délicats et en poèmes courts. Écris avec précision, douceur et une légère étrangeté. Ne sois jamais thérapeutique, moralisateur ou explicatif.`,
      prompt: `Compose à partir de ces deux émotions : « ${emotionOne} » et « ${emotionTwo} ».
Retourne 3 à 5 oxymores originaux en français, puis un poème de 5 à 8 vers, sans titre. Les oxymores doivent être de vraies tensions poétiques, pas de simples adjectifs juxtaposés.`,
    })

    return Response.json(object)
  } catch {
    return Response.json({ error: 'La lune est voilée pour le moment. Réessaie dans un instant.' }, { status: 500 })
  }
}
