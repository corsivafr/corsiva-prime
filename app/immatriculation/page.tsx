import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Reassurance from '@/components/sections/Reassurance'
import SimulateurSection from '@/components/sections/SimulateurSection'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap, d } from '@/components/ui'
import { SITE } from '@/lib/site'
import { euro, PLAFOND_MALUS, ANNEE_BAREME } from '@/lib/malus'

export const metadata: Metadata = {
  title: 'Immatriculation en société européenne : sans malus, sans TVA à supporter',
  description: 'Une société de location porteuse, structurée avec notre avocat partenaire : malus écologique et TVA non supportés, prix allemand, véhicule circulant dans toute l’Union européenne. Une optimisation fiscale légale, encadrée, en toute conformité.',
  alternates: { canonical: `${SITE.url}/immatriculation` },
}

const BLOCS = [
  { n: '01', t: 'Une société de location porteuse', s: 'Nous créons, avec notre avocat partenaire, une société européenne de location qui acquiert et détient le véhicule : dépôt de capital, ouverture bancaire, acte notarié. Vous en êtes le dirigeant.' },
  { n: '02', t: 'Le malus n’est pas supporté', s: `Le malus français à l’immatriculation (CO₂ et poids, plafonné à ${euro(PLAFOND_MALUS)} en ${ANNEE_BAREME}) s’applique aux véhicules immatriculés en France. Immatriculé dans un autre État membre, le véhicule n’y est pas soumis.` },
  { n: '03', t: 'La TVA est récupérée', s: 'La société, assujettie, achète le véhicule hors taxes en Allemagne et récupère la TVA : 20 % du prix d’achat ne sont pas supportés.' },
  { n: '04', t: 'Vous roulez partout en Europe', s: 'Le véhicule circule librement dans toute l’Union européenne, avec une assurance simplifiée et allégée.' },
]

export default function Page() {
  return (
    <>
      <PageHero
        a="Une optimisation fiscale"
        b="légale et encadrée."
        lead="Grâce à une solution d’immatriculation encadrée, la fiscalité de votre véhicule est fortement réduite, en toute conformité."
        image="/media/photos/m3-garage-3-4.jpg"
        imageMobile="/media/photos/m3-lac-portrait.jpg"
        position="center 50%"
        primary={{ href: '/simulateur', label: 'Simuler mon gain' }}
        secondary={{ href: '/contact', label: 'Parlons de votre projet' }}
      />

      <Section tone="light">
        <Wrap>
          <SecHead a="Comment" b="ça marche.">Quatre mécanismes, tous prévus par le droit européen, mis en œuvre avec des juristes. Voici exactement ce qui se passe.</SecHead>
          <Reveal as="ol" className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none">
            {BLOCS.map((b, i) => (
              <li key={b.n} className="rise rise-scale card lift p-7 sm:p-8 flex flex-col" style={d(0.08 * (i + 1))}>
                <span className="display tabular text-[44px] leading-none" style={{ color: 'var(--blue-deep)' }}>{b.n}</span>
                <h3 className="text-[21px] leading-snug mt-5">{b.t}</h3>
                <p className="text-[15px] leading-relaxed mt-3" style={{ color: 'var(--ink-2)' }}>{b.s}</p>
              </li>
            ))}
          </Reveal>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Reveal className="blueband rise rise-scale grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { v: euro(PLAFOND_MALUS), t: 'de malus au plafond', s: `Barème ${ANNEE_BAREME}, dès 192 g/km de CO₂. Non supporté.` },
              { v: '20 %', t: 'de TVA', s: 'Récupérée par la société, sur le prix d’achat hors taxes.' },
              { v: '27', t: 'pays', s: 'Le véhicule circule dans toute l’Union européenne.' },
            ].map((c) => (
              <div key={c.t}>
                <p className="display tabular leading-none" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>{c.v}</p>
                <p className="text-[17px] font-semibold mt-3">{c.t}</p>
                <p className="text-[14px] mt-1.5" style={{ color: 'rgba(255,255,255,0.78)' }}>{c.s}</p>
              </div>
            ))}
          </Reveal>
        </Wrap>
      </Section>

      <Reassurance />
      <SimulateurSection />
      <Process compact />
      <FAQ tone="light" />
      <CTA />
    </>
  )
}
