import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Check, d } from '@/components/ui'

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
    <Section id="cadre" glow>
      <Wrap>
        <SecHead a="Un cadre solide," b="des experts à vos côtés.">Le montage est revu par des juristes, les documents sont contrôlés et vous savez, à chaque phase, où vous en êtes.</SecHead>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:items-stretch">
          <div className="rise relative overflow-hidden rounded-[24px] lg:col-span-6" style={{ ...d(0.05), minHeight: 360, border: '1px solid var(--hairline)' }}>
            <Image src="/media/photos/m3-detail.jpg" alt="Remise des clés d’une BMW M3 Competition" fill quality={84} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 photo-veil" />
            <div className="absolute left-7 right-7 bottom-6">
              <p className="display text-[40px] leading-none">Paris</p>
              <p className="text-[14px] mt-1.5" style={{ color: 'rgba(255,255,255,0.72)' }}>Nos conseillers vous reçoivent sur rendez-vous · 7j/7, 9h – 18h</p>
            </div>
          </div>
          <ul className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
            {POINTS.map((p, i) => (
              <li key={p.t} className="rise fvcard !p-6" style={d(0.1 + i * 0.06)}>
                <Check />
                <h3 className="!text-[18px] !mt-4">{p.t}</h3>
                <p>{p.s}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Wrap>
    </Section>
  )
}
