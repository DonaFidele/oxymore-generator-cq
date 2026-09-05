import Link from "next/link"
import { ArrowUpRight, Moon, Sparkles, PenLine } from "lucide-react"
import { GuidedTour } from "@/components/guided-tour"
import { PageShell, SectionIntro } from "@/components/lunar-nav"

export default function HomePage() {
  return <PageShell><div className="home-page"><GuidedTour /><SectionIntro eyebrow="Un atelier nocturne pour les émotions" title={<>Écris depuis<br /><em>l&apos;entre-deux.</em></>}>Lunogramme transforme tes contradictions intérieures en fragments poétiques. Choisis ton chemin, entre l&apos;oxymore et la lune.</SectionIntro><div className="path-grid">
    <Link href="/oxymores" className="path-card path-card-oxymore"><div className="path-symbol"><Sparkles size={24} /></div><div><p className="eyebrow">01 · Le laboratoire</p><h2>Oxymores</h2><p>Deux forces contraires. Une étincelle entre les deux. Compose un poème à partir de ce qui te divise.</p></div><ArrowUpRight className="path-arrow" size={21} /></Link>
    <Link href="/lunogramme" className="path-card path-card-lune"><div className="path-symbol"><Moon size={24} /></div><div><p className="eyebrow">02 · Le journal lunaire</p><h2>Lunogramme</h2><p>La lune change, toi aussi. Dépose ton humeur du jour et laisse-la ouvrir un espace d&apos;écriture.</p></div><ArrowUpRight className="path-arrow" size={21} /></Link>
  </div><div className="home-note"><PenLine size={15} /><span>Un espace lent pour des mots qui restent.</span></div></div></PageShell>
}
