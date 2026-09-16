import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, Title, Lead, Check, d } from '@/components/ui'

/* Cadre et réassurance : montage structuré avec des avocats partenaires, en Bulgarie et en France,
   dans le cadre du droit européen. Formulations factuelles, aucune garantie inventée. */
const POINTS = [
  { t: 'Un cadre juridique encadré', s: 'Chaque montage est structuré avec nos avocats partenaires, en Bulgarie et en France, dans le cadre du droit européen : société de location porteuse, acte notarié, ouverture bancaire.' },
  { t: 'Une optimisation fiscale légale', s: 'Grâce à une solution d’immatriculation encadrée, la fiscalité de votre véhicule est fortement réduite, en toute conformité.' },
  { t: 'Assurance simplifiée et allégée', s: 'Une couverture adaptée, souvent plus simple et moins coûteuse.' },
  { t: 'Roulez partout en Europe', s: 'Le véhicule circule librement dans toute l’Union européenne.' },
]

export default function Reassurance() {
  return (
    <Section tone="light-2" id="cadre">
      <Wrap>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-center">
          <div className="lg:col-span-6">
            <Title a="Un cadre solide," b="des experts à vos côtés." />
            <Lead className="mt-6">Nous ne faisons rien à la légère : le montage est revu par des juristes, les documents sont contrôlés et vous savez, à chaque phase, où vous en êtes.</Lead>
            <ul className="mt-8 flex flex-col gap-4 list-none">
              {POINTS.map((p, i) => (
                <li key={p.t} className="rise flex items-start gap-3.5" style={d(0.1 + i * 0.06)}>
                  <Check blue />
                  <div>
                    <h3 className="text-[16.5px] leading-snug">{p.t}</h3>
                    <p className="text-[14px] leading-relaxed mt-1" style={{ color: 'var(--ink-2)' }}>{p.s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rise rise-scale zoom-media relative overflow-hidden rounded-[20px] col-span-2" style={{ ...d(0.1), aspectRatio: '16 / 9' }}>
              <Image src="/media/photos/m3-detail.jpg" alt="Détail d’une BMW M3 Competition, contrôle avant livraison" fill quality={86} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="rise rise-scale spotlight p-6 flex flex-col justify-between min-h-[190px]" style={d(0.18)}>
              <p className="text-[13px] muted">Le groupe Corsiva</p>
              <p className="display text-[40px] leading-none tabular">4,9</p>
              <p className="text-[13.5px] muted">sur Google · 100+ avis · Chambéry, Paris</p>
            </div>
            <div className="rise rise-scale card p-6 flex flex-col justify-between min-h-[190px]" style={d(0.24)}>
              <p className="text-[13px]" style={{ color: 'var(--ink-3)' }}>Nos équipes</p>
              <p className="text-[22px] leading-tight font-semibold" style={{ letterSpacing: '-0.02em' }}>Paris, sur rendez-vous</p>
              <p className="text-[13.5px]" style={{ color: 'var(--ink-2)' }}>7j/7, de 9h à 18h</p>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  )
}
