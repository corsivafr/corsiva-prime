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
import SeoTexte from '@/components/sections/SeoTexte'
import CTA from '@/components/sections/CTA'
import { SITE, FAQ as FAQ_ITEMS } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Import voiture de luxe sans malus ni TVA | Corsiva Prime' },
  description: 'Import de voitures de luxe d’Allemagne : immatriculation européenne sans malus ni TVA, cinq pépites négociées par mois, livraison partout en France.',
  alternates: { canonical: SITE.url },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'AutoDealer'],
      '@id': `${SITE.url}#org`,
      name: SITE.name,
      alternateName: 'Corsiva Prime — import de voitures de luxe',
      url: SITE.url,
      logo: `${SITE.url}/media/logos/logo-prime-blanc.png`,
      image: `${SITE.url}/media/hero/home.jpg`,
      telephone: '+33480819138',
      email: SITE.email,
      description: 'Import de voitures de luxe depuis l’Allemagne et immatriculation européenne pour éviter le malus écologique et la TVA. Pépites négociées chez des concessions partenaires, livraison partout en France.',
      areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'City', name: 'Paris' }, { '@type': 'City', name: 'Lyon' }, { '@type': 'City', name: 'Chambéry' }, { '@type': 'City', name: 'Annecy' }],
      knowsLanguage: ['fr', 'de', 'en'],
      sameAs: ['https://www.instagram.com/corsiva.eu', 'https://www.tiktok.com/@corsivafr', 'https://corsiva.fr'],
      parentOrganization: { '@type': 'Organization', name: 'Corsiva', url: 'https://corsiva.fr' },
      contactPoint: [{ '@type': 'ContactPoint', telephone: '+33480819138', contactType: 'sales', areaServed: 'FR', availableLanguage: ['fr'], hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '18:00' } }],
    },
    { '@type': 'WebSite', '@id': `${SITE.url}#site`, url: SITE.url, name: SITE.name, inLanguage: 'fr-FR', publisher: { '@id': `${SITE.url}#org` } },
    { '@type': 'Service', serviceType: 'Import de voiture de luxe depuis l’Allemagne', name: 'Import de voiture de luxe depuis l’Allemagne', provider: { '@id': `${SITE.url}#org` }, areaServed: 'FR', description: 'Pépites dénichées chez des concessions partenaires allemandes, deal négocié, options au choix, inspection, transport fermé privé et immatriculation en France. Livraison en 3 à 4 semaines.', url: `${SITE.url}/import` },
    { '@type': 'Service', serviceType: 'Immatriculation européenne sans malus', name: 'Immatriculation européenne : éviter le malus écologique et la TVA', provider: { '@id': `${SITE.url}#org` }, areaServed: 'FR', description: 'Structure européenne encadrée par nos avocats partenaires : malus écologique (jusqu’à 80 000 €) et TVA (20 %) non supportés, véhicule circulant dans toute l’Union européenne.', url: `${SITE.url}/immatriculation` },
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
      <SeoTexte />
      <FAQ />
      <CTA />
    </>
  )
}
