import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import BrandMarquee from '@/components/sections/BrandMarquee'
import Arguments from '@/components/sections/Arguments'
import Chiffres from '@/components/sections/Chiffres'
import Reel from '@/components/sections/Reel'
import Services from '@/components/sections/Services'
import Exemples from '@/components/sections/Exemples'
import Process from '@/components/sections/Process'
import SimulateurSection from '@/components/sections/SimulateurSection'
import Reassurance from '@/components/sections/Reassurance'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { SITE, FAQ as FAQ_ITEMS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Corsiva Prime — Import et immatriculation européenne de voitures premium',
  description: 'Import de voitures premium depuis l’Allemagne, clé en main : sourcing, contrôle, transport, immatriculation européenne via une structure encadrée par nos avocats partenaires. Le vrai prix allemand, sans malus ni TVA à supporter. Chaque mois, cinq pépites négociées chez nos concessions partenaires. Une entité du groupe Corsiva.',
  alternates: { canonical: SITE.url },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE.url}#org`, name: SITE.name, url: SITE.url, logo: `${SITE.url}/media/logos/logo-prime-blanc.png`, telephone: '+33480819138', parentOrganization: { '@type': 'Organization', name: 'Corsiva', url: 'https://corsiva.fr' }, areaServed: ['FR', 'EU'] },
    { '@type': 'Service', name: 'Import de véhicule depuis l’Allemagne', provider: { '@id': `${SITE.url}#org` }, description: 'Sourcing, inspection, négociation, transport fermé et carte grise. Livraison en France en 3 à 4 semaines.', url: `${SITE.url}/import` },
    { '@type': 'Service', name: 'Immatriculation en société européenne', provider: { '@id': `${SITE.url}#org` }, description: 'Structure européenne encadrée par nos avocats partenaires : malus et TVA non supportés, véhicule circulant dans toute l’Union européenne.', url: `${SITE.url}/immatriculation` },
    { '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <BrandMarquee />
      <Arguments lead="Le même modèle, la même finition, une fiscalité qui n’a rien à voir. Nous prenons tout en charge, de la concession partenaire à la remise des clés." />
      <Chiffres />
      <Services />
      <Exemples />
      <Reel />
      <Process compact />
      <SimulateurSection />
      <Reassurance />
      <FAQ />
      <CTA />
    </>
  )
}
