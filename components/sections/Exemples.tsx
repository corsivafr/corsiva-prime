import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Arrow, d } from '@/components/ui'
import { VEHICULES } from '@/lib/catalogue'
import { euro, simuler } from '@/lib/malus'

/* Fiches véhicule : photo, puis la comparaison qui compte — le coût réel en France, malus inclus,
   face au prix allemand hors taxes ; la TVA non supportée ; l'avantage total. Ouvre le catalogue. */
export default function Exemples({ showCta = true, ids = ['m3', 'g', '911-gts'] }: { showCta?: boolean; ids?: string[] }) {
  const cars = ids.map((id) => VEHICULES.find((v) => v.id === id)!).filter(Boolean)
  return (
    <Section tone="light" id="exemples">
      <Wrap>
        <SecHead a="Des écarts" b="qui changent tout.">Trois véhicules relevés chez nos concessions partenaires. Le coût réel en France — malus compris — face au prix allemand : la différence saute aux yeux.</SecHead>
        <Reveal as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-5 list-none">
          {cars.map((v, i) => {
            const c = v.chiffres!
            const r = simuler(c)
            const coutFrance = c.prixFranceTTC + r.malusTotal
            const ratio = Math.round((c.prixAllemagneHT / coutFrance) * 100)
            return (
              <li key={v.id} className="rise rise-scale" style={d(0.08 * (i + 1))}>
                <Link href={`/catalogue?v=${v.id}`} className="card lift flex flex-col h-full overflow-hidden rounded-[24px] group">
                  <div className="relative" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
                    {v.cover && <Image src={v.cover} alt={`${v.marque} ${v.modele}`} fill quality={84} sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" style={{ objectPosition: v.coverPosition, transitionTimingFunction: 'var(--ease)' }} />}
                    <div className="absolute inset-0 photo-veil" />
                    <span className="absolute top-4 left-4 text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{v.etat === 'neuf' ? 'Neuf' : 'Occasion · moins de 5 000 km'}</span>
                    <div className="absolute left-5 right-5 bottom-4">
                      <p className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{v.marque}</p>
                      <h3 className="display text-[26px] leading-none text-white" style={{ letterSpacing: '-0.03em' }}>{v.modele}{v.version ? ` ${v.version}` : ''}</h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div>
                      <div className="flex items-baseline justify-between text-[13px] gap-3">
                        <span style={{ color: 'var(--ink-2)' }}>Coût en France, <b style={{ color: 'var(--ink)' }}>malus inclus</b></span>
                        <span className="tabular font-semibold text-[15px]">{euro(coutFrance)}</span>
                      </div>
                      <p className="text-[12px] mt-0.5 tabular" style={{ color: 'var(--ink-3)' }}>{euro(c.prixFranceTTC)} TTC + {euro(r.malusTotal)} de malus 2026{r.decote ? ` (décoté ${Math.round(r.decote * 100)} %, ancienneté retenue ${c.occasionMois} mois)` : ''}</p>
                      <div className="bar mt-2"><span className="bar-fill" style={{ ['--w' as string]: '100%', background: 'var(--ink)' }} /></div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between text-[13px] gap-3">
                        <span style={{ color: 'var(--ink-2)' }}>Prix en Allemagne, <b style={{ color: 'var(--blue-deep)' }}>hors taxes</b></span>
                        <span className="tabular font-semibold text-[15px]" style={{ color: 'var(--blue-deep)' }}>{euro(c.prixAllemagneHT)}</span>
                      </div>
                      <p className="text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>via nos concessions partenaires, sans malus ni TVA</p>
                      <div className="bar mt-2"><span className="bar-fill" style={{ ['--w' as string]: `${ratio}%`, background: 'var(--blue-deep)' }} /></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-5">
                      {[
                        { k: 'Écart de prix', v: euro(r.ecartAchat) },
                        { k: 'Malus évité', v: euro(r.malusTotal) },
                        { k: 'TVA 20 % évitée', v: euro(r.tvaEvitee) },
                      ].map((x) => (
                        <div key={x.k} className="rounded-[12px] px-2.5 py-2.5" style={{ background: 'var(--surface-1)' }}>
                          <p className="text-[12px] leading-tight" style={{ color: 'var(--ink-3)' }}>{x.k}</p>
                          <p className="tabular text-[13.5px] font-semibold mt-0.5 leading-tight">{x.v}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between gap-4 mt-auto pt-5">
                      <div>
                        <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Avantage total estimé (écart + malus + TVA)</p>
                        <p className="display tabular text-[32px] leading-none mt-1" style={{ color: 'var(--blue-deep)' }}>{euro(r.avantageTotal)}</p>
                      </div>
                      <span className="btn-w btn-sm">Fiche <Arrow /></span>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </Reveal>

        <Reveal className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="rise text-[12.5px] max-w-2xl" style={{ color: 'var(--ink-3)' }}>
            Prix relevés sur des offres réelles ; malus calculé sur le barème 2026 (plafond 80 000 €) et ajouté au prix France pour refléter le coût réel ; TVA de 20 % sur le prix hors taxes. Simulation indicative, chiffrage personnalisé pour chaque projet.
          </p>
          {showCta && (
            <Link href="/catalogue" className="rise btn-cta flex-shrink-0" style={d(0.1)}>
              Tout le catalogue <Arrow />
            </Link>
          )}
        </Reveal>
      </Wrap>
    </Section>
  )
}
