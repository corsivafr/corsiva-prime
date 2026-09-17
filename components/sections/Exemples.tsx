import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, Arrow, d, SecHead } from '@/components/ui'
import { VEHICULES } from '@/lib/catalogue'
import { euro, simuler } from '@/lib/malus'

/* Fiches véhicule : photo (jamais de vidéo), comparaison France / Allemagne en barres animées,
   fiscalité évitée, avantage total. Chaque fiche ouvre le catalogue. */
export default function Exemples({ showCta = true, ids = ['m3', 'g', '911-gts'] }: { showCta?: boolean; ids?: string[] }) {
  const cars = ids.map((id) => VEHICULES.find((v) => v.id === id)!).filter(Boolean)
  return (
    <Section tone="light" id="exemples">
      <Wrap>
        <SecHead a="Des écarts" b="qui changent tout.">Trois véhicules relevés sur des offres réelles. Prix France, prix Allemagne, malus 2026 et TVA : l’avantage total, poste par poste.</SecHead>

        <Reveal as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-5 list-none">
          {cars.map((v, i) => {
            const c = v.chiffres!
            const r = simuler(c)
            const ratio = Math.round((c.prixAllemagneHT / c.prixFranceTTC) * 100)
            return (
              <li key={v.id} className="rise rise-scale" style={d(0.08 * (i + 1))}>
                <div className="h-full rounded-[24px]">
                  <Link href={`/catalogue?v=${v.id}`} className="card lift flex flex-col h-full overflow-hidden rounded-[24px] group">
                    <div className="relative" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
                      {v.cover ? (
                        <Image src={v.cover} alt={`${v.marque} ${v.modele}`} fill quality={84} sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" style={{ objectPosition: v.coverPosition, transitionTimingFunction: 'var(--ease)' }} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(120% 120% at 20% 0%, #1c1c1c, #070707)' }}>
                          <Image src={v.logo} alt={v.marque} width={200} height={40} unoptimized style={{ width: 160, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                          <span className="absolute bottom-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Photos du véhicule sélectionné sur demande</span>
                        </div>
                      )}
                      <div className="absolute inset-0 photo-veil" />
                      <span className="absolute top-4 left-4 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{v.etat === 'neuf' ? 'Neuf' : 'Occasion'}</span>
                      <div className="absolute left-5 right-5 bottom-4 tilt-layer">
                        <p className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{v.marque}</p>
                        <h3 className="display text-[26px] leading-none text-white" style={{ letterSpacing: '-0.03em' }}>{v.modele}{v.version ? ` ${v.version}` : ''}</h3>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex flex-col gap-3">
                        <div>
                          <div className="flex items-baseline justify-between text-[13px]"><span style={{ color: 'var(--ink-2)' }}>Prix en France (TTC)</span><span className="tabular font-medium">{euro(c.prixFranceTTC)}</span></div>
                          <div className="bar mt-1.5"><span className="bar-fill" style={{ ['--w' as string]: '100%', background: 'var(--ink)' }} /></div>
                        </div>
                        <div>
                          <div className="flex items-baseline justify-between text-[13px]"><span style={{ color: 'var(--ink-2)' }}>Prix en Allemagne (HT)</span><span className="tabular font-medium" style={{ color: 'var(--blue-deep)' }}>{euro(c.prixAllemagneHT)}</span></div>
                          <div className="bar mt-1.5"><span className="bar-fill" style={{ ['--w' as string]: `${ratio}%`, background: 'var(--blue-deep)' }} /></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-5">
                        {[
                          { k: 'Écart', v: euro(r.ecartAchat) },
                          { k: `Malus${r.decote ? ` (−${Math.round(r.decote * 100)} %)` : ''}`, v: euro(r.malusTotal) },
                          { k: 'TVA 20 %', v: euro(r.tvaEvitee) },
                        ].map((x) => (
                          <div key={x.k} className="rounded-[12px] px-2.5 py-2.5" style={{ background: 'var(--surface-1)' }}>
                            <p className="text-[11px] leading-tight" style={{ color: 'var(--ink-3)' }}>{x.k}</p>
                            <p className="tabular text-[13.5px] font-semibold mt-0.5 leading-tight">{x.v}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-end justify-between gap-4 mt-auto pt-5 tilt-layer">
                        <div>
                          <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Avantage total estimé</p>
                          <p className="display tabular text-[32px] leading-none mt-1" style={{ color: 'var(--blue-deep)' }}>{euro(r.avantageTotal)}</p>
                        </div>
                        <span className="btn btn-primary min-h-[42px] px-4 text-[13px]">Fiche <Arrow /></span>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            )
          })}
        </Reveal>

        <Reveal className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="rise text-[12.5px] max-w-2xl" style={{ color: 'var(--ink-3)' }}>
            Prix relevés sur des offres réelles ; malus calculé sur le barème 2026 (plafond 80 000 €) ; TVA de 20 % sur le prix hors taxes. Simulation indicative, chiffrage personnalisé pour chaque projet.
          </p>
          {showCta && (
            <Link href="/catalogue" className="rise btn btn-blue flex-shrink-0" style={d(0.1)}>
              Tout le catalogue <Arrow />
            </Link>
          )}
        </Reveal>
      </Wrap>
    </Section>
  )
}
