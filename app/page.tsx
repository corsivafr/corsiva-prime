import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import BrandMarquee from '@/components/sections/BrandMarquee'
import Arguments from '@/components/sections/Arguments'
import Services from '@/components/sections/Services'
import Exemples from '@/components/sections/Exemples'
import Process from '@/components/sections/Process'
import SimulateurSection from '@/components/sections/SimulateurSection'
import Temoignages from '@/components/sections/Temoignages'
import Reassurance from '@/components/sections/Reassurance'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { SITE, FAQ as FAQ_ITEMS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Corsiva Prime — Import et immatriculation européenne de voitures premium',
  description: 'Import de voitures premium depuis l’Allemagne, clé en main : sourcing, contrôle, transport, immatriculation européenne via une société de location porteuse. Le vrai prix allemand, sans malus ni TVA à supporter. Une entité du groupe Corsiva.',
  alternates: { canonical: SITE.url },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE.url}#org`, name: SITE.name, url: SITE.url, logo: `${SITE.url}/media/logos/logo-prime-blanc.png`, telephone: '+33480819138', parentOrganization: { '@type': 'Organization', name: 'Corsiva', url: 'https://corsiva.fr' }, areaServed: ['FR', 'EU'] },
    { '@type': 'Service', name: 'Import de véhicule depuis l’Allemagne', provider: { '@id': `${SITE.url}#org` }, description: 'Sourcing, inspection, négociation, transport fermé et carte grise. Livraison en France en 3 à 4 semaines.', url: `${SITE.url}/import` },
    { '@type': 'Service', name: 'Immatriculation en société européenne', provider: { '@id': `${SITE.url}#org` }, description: 'Société de location porteuse structurée avec avocat partenaire : malus et TVA non supportés, véhicule circulant dans toute l’Union européenne.', url: `${SITE.url}/immatriculation` },
    { '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <BrandMarquee />
      <Arguments lead="Le même modèle, la même finition, une fiscalité qui n’a rien à voir. Nous prenons tout en charge, de la première annonce à la remise des clés." />
      <Services />
      <Exemples />
      <Process compact />
      <SimulateurSection />
      <Temoignages />
      <Reassurance />
      <FAQ />
      <CTA />
    </>
  )
}
