"use client"

import { MapPin, Navigation, Send } from "lucide-react"
import { useState } from "react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"

const places = [{ city: "Dakar", country: "Sénégal", poem: "Le soleil a posé son nom sur l’eau.", x: "23%", y: "57%" }, { city: "Paris", country: "France", poem: "La pluie connaît toutes les rues du cœur.", x: "47%", y: "31%" }, { city: "Kyoto", country: "Japon", poem: "Un pétale tombe sans faire de bruit.", x: "82%", y: "40%" }]
export default function CartePage() { const [selected, setSelected] = useState(places[1]); return <PageShell><div className="feature-page map-page"><SectionIntro eyebrow="Carte mondiale des poèmes" title={<>Le monde<br /><em>écrit avec nous.</em></>}>Chaque fragment déposé rejoint une constellation. Explore les mots publics, par ville, par langue, par nuit.</SectionIntro><div className="poem-map"><div className="map-grid-lines" />{places.map(place => <button key={place.city} className={`map-pin ${selected.city === place.city ? "is-active" : ""}`} style={{ left: place.x, top: place.y }} onClick={() => setSelected(place)} aria-label={`Poème de ${place.city}`}><MapPin size={20} /></button>)}<div className="map-card"><span className="eyebrow"><Navigation size={12} /> {selected.city} · {selected.country}</span><p>{selected.poem}</p><button className="secondary-button"><Send size={14} /> Répondre avec un fragment</button></div></div></div></PageShell> }
