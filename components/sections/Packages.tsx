import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Tilt from '@/components/fx/Tilt'
import { Section, Wrap, Title, Lead, Arrow, Check, d } from '@/components/ui'
import { PACKAGES, OPTIONS } from '@/lib/catalogue'

/* Le catalogue de prestations : deux packages et les options. Les montants ne sont pas publiés (brief) :
   chaque projet reçoit une proposition personnalisée, indexée sur la valeur réellement créée. */
export default function Packages({ lead = true }: { lead?: boolean }) {
  const cards = [
    ...PACKAGES.map((p) => ({ name: p.name, accroche: p.accroche, items: p.items, duree: p.duree, featured: !!p.featured, href: `/catalogue` })),
    { name: 'Options', accroche: 'Pour aller au bout de votre projet.', items: OPTIONS.map((o) => o.name), duree: 'sur mesure', featured: false, href: '/tarifs#configurateur' },
  ]
  return (
    <Section id="packages" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gridlines" aria-hidden="true" />
      <Wrap className="relative">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7"><Title a="Trois façons" b="de travailler ensemble." /></div>
          {lead && (
            <div className="lg:col-span-5">
              <Lead>Les deux services sont indépendants. Notre rémunération est une proposition personnalisée, indexée sur la valeur réellement créée.</Lead>
            </div>
          )}
        </Reveal>

        <Reveal as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-5 list-none">
          {cards.map((p, i) => (
            <li key={p.name} className="rise rise-scale" style={d(0.08 * (i + 1))}>
              <Tilt className="h-full" style={{ borderRadius: 30 }}>
                <div className={`lift flex flex-col h-full p-6 sm:p-8 ${p.featured ? 'spotlight' : 'card'}`} style={{ borderRadius: 30 }}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display text-[26px] sm:text-[28px] leading-tight" style={{ letterSpacing: '-0.03em' }}>{p.name}</h3>
                    {p.featured && <span className="text-[10.5px] font-semibold uppercase px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', letterSpacing: '0.06em' }}>Le plus demandé</span>}
                  </div>
                  <p className={`text-[15px] leading-relaxed mt-3 ${p.featured ? 'muted' : ''}`} style={p.featured ? undefined : { color: 'var(--ink-2)' }}>{p.accroche}</p>
                  <ul className="flex flex-col gap-3 mt-7 list-none">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-[14.5px] leading-snug">
                        {p.featured ? (
                          <span className="flex-shrink-0 w-5 h-5 rounded-full inline-flex items-center justify-center mt-0.5" style={{ background: 'rgba(255,255,255,0.2)' }} aria-hidden="true">
                            <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                          </span>
                        ) : <Check />}
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8 flex items-end justify-between gap-4 tilt-layer">
                    <div>
                      <p className={`text-[12px] ${p.featured ? 'muted' : ''}`} style={p.featured ? undefined : { color: 'var(--ink-3)' }}>Délai indicatif</p>
                      <p className="text-[15px] font-semibold mt-0.5">{p.duree}</p>
                    </div>
                    <Link href={p.href} className={`btn ${p.featured ? 'btn-primary' : 'btn-secondary'} min-h-[44px] text-[13.5px]`}>
                      Configurer <Arrow />
                    </Link>
                  </div>
                </div>
              </Tilt>
            </li>
          ))}
        </Reveal>
      </Wrap>
    </Section>
  )
}
