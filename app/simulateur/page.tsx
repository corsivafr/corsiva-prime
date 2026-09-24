import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import SimulateurSection from '@/components/sections/SimulateurSection'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap, d } from '@/components/ui'
import { SITE, metaPage } from '@/lib/site'
import { euro, malusCO2, malusMasse, decoteOccasion, ANNEE_BAREME, PLAFOND_MALUS, SEUIL_CO2, SEUIL_MASSE, TVA } from '@/lib/malus'

export const metadata: Metadata = metaPage('/simulateur', 'Simulateur malus 2026 : votre économie', 'Calculez votre économie en important d’Allemagne : écart de prix, TVA de 20 % et malus 2026 (plafond 80 000 €). Règle de calcul et sources officielles.', 'home')

const CO2_ROWS = [108, 120, 130, 140, 150, 160, 170, 180, 190, 191, 192]
const MASSE_ROWS = [1500, 1699, 1799, 1899, 1999, 2200, 2545]
const DECOTE_ROWS = [3, 12, 24, 36, 60, 120, 180, 181]

function Tab({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="tbl-scroll"><table className="w-full text-[14px] tabular">
      <thead><tr className="text-left text-[12.5px]" style={{ color: 'var(--ink-3)' }}><th className="py-2 font-medium">{head[0]}</th><th className="py-2 font-medium text-right">{head[1]}</th></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]} className="border-t" style={{ borderColor: 'var(--hairline)' }}><td className="py-2.5">{r[0]}</td><td className="py-2.5 text-right font-medium">{r[1]}</td></tr>
        ))}
      </tbody>
    </table></div>
  )
}

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Simulateur', href: '/simulateur' }]} />
      <PageHero
        a="Simulez"
        b="votre gain."
        lead="Prix France, prix Allemagne, CO₂, masse : la règle complète du malus 2026 et la TVA, appliquées à la voiture que vous visez."
        hero="simulateur"
      />
      <SimulateurSection full />

      <Section id="regle">
        <Wrap>
          <SecHead a="La règle" b="de calcul, complète.">Rien n’est caché : les barèmes ci-dessous sont ceux publiés par l’administration pour {ANNEE_BAREME}. Le simulateur les applique tels quels.</SecHead>

          <Reveal as="ol" className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none mb-5">
            {[
              { t: 'Écart d’achat', s: 'Prix du véhicule en France (TTC) moins prix en Allemagne (HT). C’est l’écart de marché, celui que vous constatez sur les annonces.' },
              { t: 'TVA non supportée', s: `${Math.round(TVA * 100)} % du prix d’achat hors taxes. Un particulier qui importe paie la TVA française ; une société européenne assujettie la récupère.` },
              { t: 'Malus CO₂', s: `Barème ${ANNEE_BAREME}, gramme par gramme, à partir de ${SEUIL_CO2} g/km WLTP, jusqu’au plafond de ${euro(PLAFOND_MALUS)} atteint dès 192 g/km. Pour une occasion importée, ce malus est décoté selon l’ancienneté.` },
              { t: 'Malus au poids', s: `Par tranche de masse en ordre de marche, à partir de ${SEUIL_MASSE} kg : 10 €/kg jusqu’à 1 699 kg, puis 15, 20, 25 et 30 €/kg au-delà de 2 000 kg. Électrique exonéré ; hybride rechargeable (> 50 km) : abattement de 200 kg.` },
              { t: 'Plafond', s: `Le cumul du malus CO₂ et du malus au poids ne peut dépasser ${euro(PLAFOND_MALUS)}.` },
              { t: 'Avantage total', s: 'Écart d’achat + TVA non supportée + malus total évité. C’est le montant affiché par le simulateur.' },
            ].map((r, i) => (
              <li key={r.t} className="rise card p-6 sm:p-7" style={d(0.06 * i)}>
                <div className="flex items-baseline gap-3">
                  <span className="display tabular text-[28px] leading-none" style={{ color: 'var(--blue)' }}>0{i + 1}</span>
                  <h3 className="text-[19px] leading-snug">{r.t}</h3>
                </div>
                <p className="text-[14.5px] leading-relaxed mt-3" style={{ color: 'var(--ink-2)' }}>{r.s}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rise card p-6" style={d(0.1)}>
              <h3 className="text-[17px] mb-3">Malus CO₂ {ANNEE_BAREME}</h3>
              <Tab head={['g/km WLTP', 'Malus']} rows={CO2_ROWS.map((g) => [g >= 192 ? '192 et plus' : `${g}`, euro(malusCO2(g))])} />
            </div>
            <div className="rise card p-6" style={d(0.16)}>
              <h3 className="text-[17px] mb-3">Malus au poids {ANNEE_BAREME}</h3>
              <Tab head={['Masse (kg)', 'Malus']} rows={MASSE_ROWS.map((kg) => [`${kg.toLocaleString('fr-FR')}`, euro(malusMasse(kg, 'thermique'))])} />
            </div>
            <div className="rise card p-6" style={d(0.22)}>
              <h3 className="text-[17px] mb-3">Décote occasion importée</h3>
              <Tab head={['Ancienneté', 'Décote du malus CO₂']} rows={DECOTE_ROWS.map((m) => [m > 180 ? 'plus de 180 mois' : `${m} mois`, `${Math.round(decoteOccasion(m) * 100)} %`])} />
            </div>
          </Reveal>

          <Reveal className="rise mt-8 text-[13px] leading-relaxed max-w-3xl" style={{ color: 'var(--ink-3)' }}>
            <p>Sources : loi de finances n° 2025-127 du 14 février 2025 (trajectoire 2025-2027 du malus à l’immatriculation) ; fiche service-public.gouv.fr F35947 « Malus écologique », barème {ANNEE_BAREME}. Les montants dépendent des valeurs figurant sur le certificat de conformité du véhicule. Simulation indicative et non contractuelle : le montage effectif est validé, pour votre situation, avec nos avocats partenaires.</p>
          </Reveal>
        </Wrap>
      </Section>

      <CTA title={['Validons ensemble', 'votre simulation.']} text="Un conseiller reprend vos chiffres avec vous, vérifie le certificat de conformité et vous adresse une proposition complète." />
    </>
  )
}
