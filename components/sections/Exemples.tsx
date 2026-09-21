import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import PepitesOuvrir from '@/components/PepitesOuvrir'
import { Section, Wrap, SecHead, Arrow, d } from '@/components/ui'
import { VEHICULES, prixFinal } from '@/lib/catalogue'
import { euro, simuler } from '@/lib/malus'

/* Les pépites du mois : photo, tarif final client tout compris, puis « vs » le coût en France malus inclus
   et l'économie. Chaque carte ouvre la fiche du catalogue. */
export default function Exemples({ showCta = true, ids = ['m3', 'g', '911-gts'] }: { showCta?: boolean; ids?: string[] }) {
  const cars = ids.map((id) => VEHICULES.find((v) => v.id === id)!).filter(Boolean)
  return (
    <Section tone="light" id="pepites">
      <Wrap>
        <SecHead a="Nos pépites" b="du mois.">Chaque mois, cinq véhicules dénichés et négociés chez nos concessions partenaires en Allemagne. Configurés et optionnés à votre goût, accompagnés de A à Z par Corsiva.</SecHead>
        <Reveal as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-5 list-none">
          {cars.map((v, i) => {
            const c = v.chiffres!
            const r = simuler(c)
            const coutFrance = c.prixFranceTTC + r.malusTotal
            const final = prixFinal(c)
            return (
              <li key={v.id} className="rise rise-scale" style={d(0.08 * (i + 1))}>
                <Link href={`/catalogue?v=${v.id}`} className="card lift flex flex-col h-full overflow-hidden rounded-[24px] group">
                  <div className="relative" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
                    {v.cover && <Image src={v.cover} alt={`${v.marque} ${v.modele}`} fill quality={84} sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" style={{ objectPosition: v.coverPosition, transitionTimingFunction: 'var(--ease)' }} />}
                    <div className="absolute inset-0 photo-veil" />
                    <span className="absolute top-4 left-4 text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#0099ff', color: '#fff' }}>Pépite du mois</span>
                    <span className="absolute top-4 right-4 text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{v.etat === 'neuf' ? 'Neuf' : 'Occasion · moins de 5 000 km'}</span>
                    <div className="absolute left-5 right-5 bottom-4">
                      <p className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{v.marque}</p>
                      <h3 className="display text-[26px] leading-none text-white" style={{ letterSpacing: '-0.03em' }}>{v.modele}{v.version ? ` ${v.version}` : ''}</h3>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Tarif final client, tout compris</p>
                    <p className="display tabular leading-none mt-1" style={{ fontSize: 'clamp(34px, 3vw, 40px)', color: 'var(--blue-deep)' }}>{euro(final)}</p>
                    <p className="text-[12.5px] mt-1.5" style={{ color: 'var(--ink-2)' }}>Véhicule, structure européenne, déplacement, transport et immatriculation inclus. Sans malus ni TVA.</p>

                    <div className="grid grid-cols-2 gap-2 mt-5">
                      <div className="rounded-[14px] px-3.5 py-3" style={{ background: 'var(--surface-1)' }}>
                        <p className="text-[12px] leading-tight" style={{ color: 'var(--ink-3)' }}>vs en France, malus inclus</p>
                        <p className="tabular text-[17px] font-semibold mt-1 leading-tight line-through decoration-1" style={{ textDecorationColor: 'rgba(10,10,10,0.35)' }}>{euro(coutFrance)}</p>
                        <p className="text-[12px] mt-0.5 tabular" style={{ color: 'var(--ink-3)' }}>{euro(c.prixFranceTTC)} TTC + {euro(r.malusTotal)} de malus</p>
                      </div>
                      <div className="rounded-[14px] px-3.5 py-3" style={{ background: 'var(--blue-tint)' }}>
                        <p className="text-[12px] leading-tight" style={{ color: 'var(--blue-ink)' }}>Votre économie</p>
                        <p className="tabular text-[17px] font-semibold mt-1 leading-tight" style={{ color: 'var(--blue-deep)' }}>{euro(coutFrance - final)}</p>
                        <p className="text-[12px] mt-0.5" style={{ color: 'var(--blue-ink)' }}>par rapport à l’achat en France</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-auto pt-5">
                      <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>{v.points[0]}</p>
                      <span className="btn-w btn-sm flex-shrink-0">Voir la pépite <Arrow /></span>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </Reveal>

        <Reveal className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="rise text-[12.5px] max-w-2xl" style={{ color: 'var(--ink-3)' }}>
            Tarif final indicatif : prix négocié chez la concession partenaire + package tout compris ; coût en France = prix constructeur TTC + malus 2026 (plafond 80 000 €). Chaque projet fait l’objet d’une proposition personnalisée.
          </p>
          {showCta && (
            <div className="rise flex flex-wrap gap-3 flex-shrink-0" style={d(0.1)}>
              <PepitesOuvrir className="btn-dark">Recevoir les pépites <Arrow /></PepitesOuvrir>
              <Link href="/catalogue" className="btn-cta">Toutes les pépites <Arrow /></Link>
            </div>
          )}
        </Reveal>
      </Wrap>
    </Section>
  )
}
