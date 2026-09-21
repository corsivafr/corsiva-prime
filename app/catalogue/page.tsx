import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Catalogue from '@/components/Catalogue'
import BrandMarquee from '@/components/sections/BrandMarquee'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Les pépites du mois : véhicules négociés, tarif final tout compris',
  description: 'Chaque mois, cinq pépites dénichées et négociées chez nos concessions partenaires en Allemagne : tarif final client tout compris, face au coût en France malus inclus. Configurées et optionnées à votre goût, accompagnées de A à Z.',
  alternates: { canonical: `${SITE.url}/catalogue` },
}

export default function Page({ searchParams }: { searchParams?: { v?: string } }) {
  return (
    <>
      <PageHero
        a="Les pépites"
        b="du mois."
        lead="Chaque mois, cinq véhicules dénichés et négociés chez nos concessions partenaires en Allemagne. Tarif final tout compris, configuration et options à votre goût, accompagnement Corsiva de A à Z."
        hero="catalogue"
        primary={{ href: '#catalogue', label: 'Voir les pépites' }}
        secondary={{ href: '/simulateur', label: 'Simuler un autre modèle' }}
      />
      <Section tone="light-2" id="catalogue">
        <Wrap>
          <SecHead a="Choisissez" b="votre pépite.">Ouvrez une fiche : photos, tarif final tout compris face au coût en France malus inclus, puis dites-nous vos options. Un autre modèle en tête ? On le déniche chez nos concessions partenaires.</SecHead>
          <Catalogue openId={searchParams?.v} />
        </Wrap>
      </Section>
      <BrandMarquee />
      <CTA title={['Un modèle précis', 'en tête ?']} text="Décrivez-nous la voiture : configuration, options, budget, calendrier. On la déniche chez nos concessions partenaires et on revient vers vous avec le tarif final." />
    </>
  )
}
