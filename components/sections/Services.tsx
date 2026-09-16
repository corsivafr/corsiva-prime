import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, Title, Lead, Arrow, d } from '@/components/ui'

/* Les deux services, deux grandes cartes image : indépendants, cumulables. */
const SERVICES = [
  {
    href: '/import',
    n: 'Service 1',
    title: 'Import depuis l’Allemagne',
    text: 'On trouve la voiture, on la contrôle, on la négocie, on la livre en France. Vous n’avez qu’à récupérer les clés.',
    img: '/media/photos/m3-3-4-avant.jpg',
    pos: 'center 55%',
  },
  {
    href: '/immatriculation',
    n: 'Service 2',
    title: 'Immatriculation en société européenne',
    text: 'Une société de location porteuse, structurée avec notre avocat partenaire : ni malus, ni TVA à supporter, ni prix français.',
    img: '/media/photos/taycan-3-4-avant.jpg',
    pos: 'center 60%',
  },
]

export default function Services() {
  return (
    <Section id="services">
      <Wrap>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7"><Title a="Deux services," b="indépendants, cumulables." /></div>
          <div className="lg:col-span-5"><Lead>Import seul, ou import et immatriculation européenne. Dans les deux cas, tout est géré de A à Z.</Lead></div>
        </Reveal>
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <Link key={s.href} href={s.href} className="rise rise-scale group relative overflow-hidden rounded-[30px] block lift" style={{ ...d(0.1 * (i + 1)), minHeight: 460, background: '#0a0a0a' }}>
              <Image src={s.img} alt="" fill quality={86} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" style={{ objectPosition: s.pos, transitionTimingFunction: 'var(--ease)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.05) 30%, rgba(9,9,9,0.85) 100%)' }} />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[13px] font-medium" style={{ color: 'var(--blue)' }}>{s.n}</p>
                <h3 className="display text-[30px] sm:text-[38px] leading-[1.02] mt-2" style={{ letterSpacing: '-0.035em' }}>{s.title}</h3>
                <p className="text-[15px] leading-relaxed mt-3 max-w-md" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.text}</p>
                <span className="btn btn-primary mt-6">Découvrir <Arrow /></span>
              </div>
            </Link>
          ))}
        </Reveal>
      </Wrap>
    </Section>
  )
}
