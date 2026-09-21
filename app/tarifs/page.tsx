import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Packages from '@/components/sections/Packages'
import Configurateur from '@/components/Configurateur'
import Exemples from '@/components/sections/Exemples'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap, d } from '@/components/ui'
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
        image="/media/photos/m3c-3-4.jpg"
        position="center 50%"
        primary={{ href: '/contact', label: 'Demander une proposition' }}
        secondary={{ href: '/simulateur', label: 'Simuler mon gain' }}
      />
      <Packages />
      <Section tone="light-3" id="configurateur">
        <Wrap>
          <SecHead a="Composez" b="votre package.">Choisissez le service, cochez les options, sélectionnez un véhicule du catalogue si vous le souhaitez : le récapitulatif se met à jour et part avec votre demande.</SecHead>
          <Reveal className="rise"><Configurateur allowVehicule /></Reveal>
        </Wrap>
      </Section>
      <Section glow>
        <Wrap>
          <SecHead a="Pourquoi" b="pas de prix affiché.">Parce qu’une citadine premium et une supercar ne demandent ni le même travail, ni la même structuration. Trois principes, en revanche, ne changent jamais.</SecHead>
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
      <CTA title={['Recevez votre proposition', 'rapidement.']} text="Décrivez-nous la voiture visée : un conseiller vous rappelle et vous adresse un chiffrage complet, poste par poste." />
    </>
  )
}
