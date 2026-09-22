import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import PackagesCompare from '@/components/sections/PackagesCompare'
import Configurateur from '@/components/Configurateur'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap, d } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Tarifs import Allemagne : packages sur devis',
  description: 'Import, import + immatriculation européenne, options : trois packages sur devis, rémunération indexée sur la valeur réellement créée pour vous.',
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
      <Breadcrumb items={[{ name: 'Tarifs', href: '/tarifs' }]} />
      <PageHero
        a="Deux services,"
        b="un chiffrage sur mesure."
        lead="Import seul, ou import avec immatriculation européenne : comparez ce qui est compris, composez votre package, recevez une proposition écrite."
        hero="tarifs"
        primary={{ href: '#packages', label: 'Comparer les packages' }}
        secondary={{ href: '/contact', label: 'Demander une proposition' }}
      >
        <div className="hin herotrust" style={{ ['--d' as string]: '0.58s' }}>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3.5h7.5L19 8v12.5H7z" /><path d="M14.5 3.5V8H19M9.8 13.6l1.9 1.9 3.5-3.8" /></svg> Chiffrage écrit avant tout engagement</span>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /><path d="M20 12a8 8 0 1 1-4-6.9" /></svg> Tout inclus, sans frais découverts</span>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></svg> Indexé sur la valeur créée</span>
        </div>
      </PageHero>
      <PackagesCompare />
      <Section tone="light-3" id="configurateur">
        <Wrap>
          <SecHead a="Composez" b="votre package.">Choisissez le service, cochez les options, sélectionnez une pépite du mois si vous le souhaitez : le récapitulatif se met à jour et part avec votre demande.</SecHead>
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
      <FAQ tone="dark" />
      <CTA title={['Recevez votre proposition', 'rapidement.']} text="Décrivez-nous la voiture visée : un conseiller vous rappelle et vous adresse un chiffrage complet, poste par poste." />
    </>
  )
}
