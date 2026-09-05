'use client'

import { FormEvent, useState } from 'react'
import { Moon, Sparkles } from 'lucide-react'

type Generation = {
  oxymores: string[]
  poem: string
}

export default function Home() {
  const [emotionOne, setEmotionOne] = useState('')
  const [emotionTwo, setEmotionTwo] = useState('')
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!emotionOne.trim() || !emotionTwo.trim()) {
      setError('Choisis deux émotions pour commencer le rituel.')
      return
    }

    setError('')
    setGeneration(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotionOne, emotionTwo }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Une erreur est survenue.')
      setGeneration(data)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Le rituel a été interrompu.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-7 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-border/70 pb-6">
          <a href="#top" className="flex items-center gap-3 font-serif text-lg tracking-[0.18em] text-foreground">
            <span className="flex size-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
              <Moon className="size-4" strokeWidth={1.5} />
            </span>
            LUNOGRAMME
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Atelier 01</span>
        </header>

        <section id="top" className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="max-w-xl">
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.32em] text-accent">Générateur d&apos;oxymores</p>
            <h1 className="max-w-lg font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-7xl">
              Ce qui se contredit <span className="italic text-accent">nous révèle.</span>
            </h1>
            <p className="mt-8 max-w-md font-serif text-lg leading-8 text-muted-foreground">
              Deux émotions contraires. Une nuit pour les écouter. Transforme tes contradictions intérieures en matière poétique.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />
            <form onSubmit={handleSubmit} className="relative border border-border bg-card/70 p-7 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Le rituel commence ici</span>
                <Sparkles className="size-4 text-accent" strokeWidth={1.5} />
              </div>
              <div className="space-y-8">
                <label className="block">
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Première émotion</span>
                  <input value={emotionOne} onChange={(event) => setEmotionOne(event.target.value)} placeholder="ex. joie" className="w-full border-0 border-b border-border bg-transparent px-0 py-3 font-serif text-2xl text-foreground outline-none placeholder:text-muted-foreground/45 focus:border-accent focus:ring-0" aria-label="Première émotion" />
                </label>
                <label className="block">
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Seconde émotion</span>
                  <input value={emotionTwo} onChange={(event) => setEmotionTwo(event.target.value)} placeholder="ex. mélancolie" className="w-full border-0 border-b border-border bg-transparent px-0 py-3 font-serif text-2xl text-foreground outline-none placeholder:text-muted-foreground/45 focus:border-accent focus:ring-0" aria-label="Seconde émotion" />
                </label>
              </div>
              {error && <p role="alert" className="mt-6 text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={isLoading} className="mt-10 flex w-full items-center justify-center gap-3 bg-primary px-5 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-wait disabled:opacity-60">
                {isLoading ? 'La lune compose…' : 'Révéler l’oxymore'}
              </button>
            </form>
          </div>
        </section>

        {generation && (
          <section aria-live="polite" className="border-t border-border/70 py-16">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Fragments trouvés</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {generation.oxymores.map((oxymore) => <span key={oxymore} className="border border-accent/30 bg-accent/10 px-3 py-2 font-serif text-sm text-accent">{oxymore}</span>)}
                </div>
              </div>
              <blockquote className="whitespace-pre-line border-l border-accent/50 pl-7 font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">{generation.poem}</blockquote>
            </div>
          </section>
        )}

        <footer className="flex items-center justify-between border-t border-border/70 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Écrire entre les lignes</span><span>© Lunogramme</span>
        </footer>
      </div>
    </main>
  )
}
