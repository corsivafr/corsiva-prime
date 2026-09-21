import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Catalogue from '@/components/Catalogue'
import BrandMarquee from '@/components/sections/BrandMarquee'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Catalogue : véhicules et packages',
  description: 'BMW M3 Competition, Mercedes Classe G, Porsche 911 GTS : fiches véhicule avec le coût réel en France malus inclus face au prix allemand, la TVA évitée, et le configurateur de package : import + immatriculation européenne ou import seul, options.',
  alternates: { canonical: `${SITE.url}/catalogue` },
}

export default function Page({ searchParams }: { searchParams?: { v?: string } }) {
  return (
    <>
      <PageHero
        a="Le catalogue,"
        b="et votre package."
        lead="Les trois modèles les plus demandés, relevés chez nos concessions partenaires, la fiscalité qu’ils évitent, et le package qui vous convient — composé en quelques clics."
        image="/media/photos/g63-face.jpg"
        position="center 50%"
        primary={{ href: '#catalogue', label: 'Voir les véhicules' }}
        secondary={{ href: '/simulateur', label: 'Simuler un autre modèle' }}
      />
      <Section tone="light-2" id="catalogue">
        <Wrap>
          <SecHead a="Choisissez" b="votre prochaine voiture.">Ouvrez une fiche : photos, coût réel en France malus inclus face au prix allemand, TVA évitée, puis composez votre package. Un autre modèle en tête ? On le source chez nos concessions partenaires.</SecHead>
          <Catalogue openId={searchParams?.v} />
        </Wrap>
      </Section>
      <BrandMarquee />
      <CTA title={['Un modèle précis', 'en tête ?']} text="Décrivez-nous la voiture : configuration, budget, calendrier. On la trouve en Allemagne et on revient vers vous avec un chiffrage." />
    </>
  )
}
