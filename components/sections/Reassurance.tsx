import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Check, d } from '@/components/ui'
import { SITE } from '@/lib/site'
import { Arrow } from '@/components/ui'

/* Cadre et réassurance : montage structuré avec des avocats partenaires, en Bulgarie et en France,
   dans le cadre du droit européen ; badges de conformité ; nos conseillers partout en France. */
const POINTS = [
  { t: 'Un cadre juridique encadré', s: 'Chaque montage est structuré avec nos avocats partenaires, en Bulgarie et en France, dans le cadre du droit de l’Union européenne. Les détails vous sont présentés lors d’un appel.' },
  { t: 'Une optimisation fiscale légale', s: 'Grâce à une solution d’immatriculation encadrée, la fiscalité de votre véhicule est fortement réduite, en toute conformité.' },
  { t: 'Assurance simplifiée et allégée', s: 'Une couverture adaptée, souvent plus simple et moins coûteuse.' },
  { t: 'Roulez partout en Europe', s: 'Le véhicule circule librement dans toute l’Union européenne.' },
]
const BADGES = [
  { img: '/media/logos/eu-flag.svg', a: 'Union européenne', txt: <>Droit de l’<b>Union européenne</b></> },
  { img: '/media/logos/rgpd.svg', a: 'RGPD', txt: <>Données protégées <b>RGPD</b></> },
  { txt: <>Avocats partenaires <b>France · Bulgarie</b></> },
  { txt: <>TVA <b>intracommunautaire</b></> },
]

export default function Reassurance() {
  return (
    <Section id="cadre" glow>
      <Wrap>
        <SecHead a="Un cadre légal," b="des experts à vos côtés.">Le montage est structuré avec nos avocats partenaires, les documents sont contrôlés et vous savez, à chaque phase, où vous en êtes. Une optimisation fiscale légale, encadrée, en toute conformité.</SecHead>
        <Reveal className="rise flex flex-wrap justify-center gap-2.5 -mt-6 mb-10">
          {BADGES.map((b, i) => (
            <span key={i} className="legalbadge">
              {b.img ? <Image src={b.img} alt={b.a || ''} width={24} height={16} unoptimized style={{ height: 16, width: 'auto', borderRadius: 2 }} /> : <Check />}
              <span>{b.txt}</span>
            </span>
          ))}
        </Reveal>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:items-stretch">
          <div className="rise relative overflow-hidden rounded-[24px] lg:col-span-6" style={{ ...d(0.05), minHeight: 380, border: '1px solid var(--hairline)' }}>
            <Image src="/media/photos/paris.jpg" alt="Paris" fill quality={82} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" style={{ objectPosition: 'center 40%' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.1) 20%, rgba(9,9,9,0.9) 100%)' }} />
            <div className="absolute left-7 right-7 bottom-6">
              <p className="display text-[40px] leading-none">Paris</p>
              <p className="text-[15px] mt-2 text-white/90">Nos conseillers vous reçoivent à Paris et se déplacent partout en France.</p>
              <p className="text-[13.5px] mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{SITE.villes.join(' · ')} · 7j/7, 9h – 18h</p>
            </div>
          </div>
          <ul className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
            {POINTS.map((p, i) => (
              <li key={p.t} className="rise card-dense" style={d(0.1 + i * 0.06)}>
                <Check />
                <h3>{p.t}</h3>
                <p>{p.s}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="rise mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-[14.5px] sm:mr-3" style={{ color: 'var(--ink-2)' }}>Envie d’en savoir plus sur la structure ? Parlons-en de vive voix.</p>
          <a href={SITE.phoneTel} className="btn-cta">Prendre un appel <Arrow /></a>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w">Réserver un créneau <Arrow /></a>
        </Reveal>
      </Wrap>
    </Section>
  )
}
