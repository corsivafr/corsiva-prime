import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import Catalogue from '@/components/Catalogue'
import BrandMarquee from '@/components/sections/BrandMarquee'
import CTA from '@/components/sections/CTA'
import { SecHead, Section, Wrap } from '@/components/ui'
import { SITE } from '@/lib/site'
import { VEHICULES, prixFinal } from '@/lib/catalogue'

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Les pépites du mois — Corsiva Prime',
  itemListElement: VEHICULES.filter((v) => v.chiffres).map((v, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `${v.marque} ${v.modele}${v.version ? ` ${v.version}` : ''}`,
      brand: { '@type': 'Brand', name: v.marque },
      image: v.cover ? `${SITE.url}${v.cover}` : undefined,
      description: v.detail,
      itemCondition: v.etat === 'neuf' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      url: `${SITE.url}/catalogue?v=${v.id}`,
      offers: { '@type': 'Offer', priceCurrency: 'EUR', price: prixFinal(v.chiffres!), availability: 'https://schema.org/InStock', url: `${SITE.url}/catalogue?v=${v.id}`, seller: { '@type': 'Organization', name: SITE.name } },
    },
  })),
}

export const metadata: Metadata = {
  title: 'Pépites du mois : voitures de luxe d’Allemagne',
  description: 'Cinq pépites par mois, négociées chez nos concessions partenaires en Allemagne : tarif final tout compris face au coût en France malus inclus, options au choix.',
  alternates: { canonical: `${SITE.url}/catalogue` },
}

export default function Page({ searchParams }: { searchParams?: { v?: string } }) {
  return (
    <>
      <Breadcrumb items={[{ name: 'Pépites du mois', href: '/catalogue' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
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
