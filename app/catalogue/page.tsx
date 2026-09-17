import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Catalogue from '@/components/Catalogue'
import BrandMarquee from '@/components/sections/BrandMarquee'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Catalogue : véhicules et packages',
  description: 'BMW M3 Competition, Mercedes Classe G, Porsche 911 GTS, Taycan, Cayenne… Fiches véhicule avec prix France / Allemagne, malus et TVA évités, et configurateur de package : import seul ou import + immatriculation européenne, options.',
  alternates: { canonical: `${SITE.url}/catalogue` },
}

export default function Page() {
  return (
    <>
      <PageHero
        a="Le catalogue,"
        b="et votre package."
        lead="Des véhicules relevés sur le marché allemand, la fiscalité qu’ils évitent, et le package qui vous convient — composé en quelques clics."
        image="/media/photos/m3-lac-2.jpg"
        imageMobile="/media/photos/m3-lac-portrait.jpg"
        position="center 50%"
        primary={{ href: '#catalogue', label: 'Voir les véhicules' }}
        secondary={{ href: '/simulateur', label: 'Simuler un autre modèle' }}
      />
      <Section tone="light-2" id="catalogue">
        <Wrap>
          <SecHead a="Choisissez" b="votre prochaine voiture.">Ouvrez une fiche : photos, prix France et Allemagne, malus et TVA évités, puis composez votre package. Un modèle absent ? On le source.</SecHead>
          <Suspense fallback={<div className="card p-10 text-center text-[14px]" style={{ color: 'var(--ink-3)' }}>Chargement du catalogue…</div>}>
            <Catalogue />
          </Suspense>
        </Wrap>
      </Section>
      <BrandMarquee />
      <CTA title={['Un modèle précis', 'en tête ?']} text="Décrivez-nous la voiture : configuration, budget, calendrier. On la trouve en Allemagne et on revient vers vous avec un chiffrage." />
    </>
  )
}
