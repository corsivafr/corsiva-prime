import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Packages from '@/components/sections/Packages'
import Configurateur from '@/components/Configurateur'
import Exemples from '@/components/sections/Exemples'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { Section, Wrap, Title, Lead, d } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Tarifs : une proposition personnalisée, indexée sur la valeur créée',
  description: 'Import, import + immatriculation européenne, options : trois packages Corsiva Prime, sur devis. Notre rémunération est indexée sur la valeur réellement créée pour vous.',
  alternates: { canonical: `${SITE.url}/tarifs` },
}

const PRINCIPES = [
  { t: 'Un chiffrage avant tout engagement', s: 'Vous recevez une proposition écrite, poste par poste, avant la phase de sourcing. Rien n’est engagé sans votre accord.' },
  { t: 'Indexé sur la valeur créée', s: 'Notre rémunération est proportionnée à l’avantage réel : écart de prix, malus et TVA non supportés. Plus le projet est ambitieux, plus la valeur est nette.' },
  { t: 'Tout est inclus', s: 'Déplacement, hôtel, avocat, transport fermé, formalités : le package couvre l’ensemble. Pas de frais découverts en cours de route.' },
]

export default function Page() {
  return (
    <>
      <PageHero
        a="Des packages clairs,"
        b="une proposition sur mesure."
        lead="Les montants ne sont pas publiés : chaque projet reçoit une proposition personnalisée, indexée sur la valeur réellement créée."
        image="/media/photos/m3-lac-5.jpg"
        imageMobile="/media/photos/m3-lac-portrait.jpg"
        position="center 60%"
        primary={{ href: '/contact', label: 'Demander une proposition' }}
        secondary={{ href: '/simulateur', label: 'Simuler mon gain' }}
      />
      <Packages />
      <Section tone="light-3" id="configurateur">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-10">
            <div className="lg:col-span-7"><Title a="Composez" b="votre package." /></div>
            <div className="lg:col-span-5"><Lead>Choisissez le service, cochez les options, sélectionnez un véhicule du catalogue si vous le souhaitez : le récapitulatif se met à jour et part avec votre demande.</Lead></div>
          </Reveal>
          <Reveal className="rise"><Configurateur allowVehicule /></Reveal>
        </Wrap>
      </Section>
      <Section tone="light">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-12">
            <div className="lg:col-span-7"><Title a="Pourquoi" b="pas de prix affiché." /></div>
            <div className="lg:col-span-5"><Lead>Parce qu’un import à 60 000 € et un import à 250 000 € ne demandent ni le même travail, ni la même structuration. Trois principes, en revanche, ne changent jamais.</Lead></div>
          </Reveal>
          <Reveal as="ul" className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none">
            {PRINCIPES.map((p, i) => (
              <li key={p.t} className="rise rise-scale card lift p-7" style={d(0.08 * (i + 1))}>
                <span className="display tabular text-[36px] leading-none" style={{ color: 'var(--blue-deep)' }}>0{i + 1}</span>
                <h3 className="text-[19px] leading-snug mt-4">{p.t}</h3>
                <p className="text-[14.5px] leading-relaxed mt-2.5" style={{ color: 'var(--ink-2)' }}>{p.s}</p>
              </li>
            ))}
          </Reveal>
        </Wrap>
      </Section>
      <Exemples />
      <FAQ tone="dark" />
      <CTA title={['Recevez votre proposition', 'sous 48 h.']} text="Décrivez-nous la voiture visée : un conseiller vous rappelle et vous adresse un chiffrage complet, poste par poste." />
    </>
  )
}
