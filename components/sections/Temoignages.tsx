import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, d } from '@/components/ui'
import { AVIS } from '@/lib/site'

/* Avis réels du groupe Corsiva : la grande note à gauche, façon carte avis OS, puis les avis. */
export default function Temoignages() {
  return (
    <Section id="avis" grad>
      <Wrap>
        <SecHead a="Ils font confiance" b="au groupe Corsiva.">Location de prestige, conciergerie, sourcing : la même exigence, déjà notée par nos clients.</SecHead>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="rise rcard lg:col-span-4 justify-center" style={d(0.05)}>
            <Image src="/media/logos/google-logo.png" alt="Google" width={72} height={24} style={{ width: 72, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            <p className="display text-[clamp(44px,5vw,64px)] leading-none tabular">4,9<span className="text-[22px]" style={{ color: 'var(--ink-3)' }}> / 5</span></p>
            <p className="rcard-stars" aria-label="5 étoiles sur 5">★★★★★</p>
            <p className="text-[14px]" style={{ color: 'var(--ink-2)' }}>Plus de 100 avis Google · Chambéry, Paris</p>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
            {AVIS.map((a, i) => (
              <li key={a.nom} className="rise rcard" style={d(0.1 + i * 0.06)}>
                <p className="rcard-stars text-[13px]">★★★★★</p>
                <blockquote className="text-[15px] leading-relaxed">« {a.texte} »</blockquote>
                <p className="text-[12.5px] mt-auto" style={{ color: 'var(--ink-3)' }}>{a.nom} · {a.source} · Groupe Corsiva</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Wrap>
    </Section>
  )
}
