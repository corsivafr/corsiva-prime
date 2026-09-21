import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Arrow, Check, d } from '@/components/ui'
import Image from 'next/image'
import { PACKAGES, OPTIONS, OPTIONS_IMG } from '@/lib/catalogue'

/* Les formules, façon Corsiva OS : cartes charbon à grand rayon, la formule phare cerclée de bleu
   avec son badge. Aucun montant (brief) : proposition personnalisée. */
export default function Packages({ lead = true }: { lead?: boolean }) {
  const cards = [
    ...PACKAGES.map((p) => ({ name: p.name, accroche: p.accroche, items: p.items, duree: p.duree, featured: !!p.featured, href: '/catalogue', img: p.img })),
    { name: 'Options', accroche: 'Pour aller au bout de votre projet.', items: OPTIONS.map((o) => o.name), duree: 'sur mesure', featured: false, href: '/tarifs#configurateur', img: OPTIONS_IMG },
  ]
  return (
    <Section id="packages" glow>
      <Wrap>
        <SecHead a="Trois façons" b="de travailler ensemble.">{lead ? 'Les deux services sont indépendants. Notre rémunération est une proposition personnalisée, indexée sur la valeur réellement créée.' : undefined}</SecHead>
        <Reveal as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-4 list-none pt-3">
          {cards.map((p, i) => (
            <li key={p.name} className={`rise plan ${p.featured ? 'featured' : ''}`} style={d(0.08 * i)}>
              {p.featured && <span className="plan-badge">Le plus demandé</span>}
              <div className="plan-media"><Image src={p.img} alt="" fill quality={80} sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover" style={{ objectPosition: 'center 50%' }} /></div>
              <h3 className="plan-name">{p.name}</h3>
              <p className="text-[14.5px] leading-relaxed mt-3" style={{ color: 'var(--ink-2)' }}>{p.accroche}</p>
              <p className="plan-price">{p.duree}</p>
              <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>délai indicatif</p>
              <ul className="flex flex-col gap-3 mt-7 mb-8 list-none">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[14.5px] leading-snug"><Check /><span>{it}</span></li>
                ))}
              </ul>
              <Link href={p.href} className={`${p.featured ? 'btn-cta' : 'btn-dark'} mt-auto w-full`}>
                {p.featured ? 'Configurer ce package' : 'Configurer'} <Arrow />
              </Link>
            </li>
          ))}
        </Reveal>
      </Wrap>
    </Section>
  )
}
