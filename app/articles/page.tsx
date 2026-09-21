import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import CTA from '@/components/sections/CTA'
import { ArticleCard } from '@/components/sections/ArticlesSection'
import { Section, Wrap } from '@/components/ui'
import { ARTICLES } from '@/lib/articles'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Articles : malus, import, immatriculation',
  description: 'Nos guides pour payer le juste prix : éviter le malus écologique 2026, importer une voiture d’Allemagne, immatriculer en Europe, exemples chiffrés.',
  alternates: { canonical: `${SITE.url}/articles` },
}

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Articles Corsiva Prime : malus, import, immatriculation',
    url: `${SITE.url}/articles`,
    inLanguage: 'fr-FR',
    hasPart: ARTICLES.map((a) => ({ '@type': 'Article', headline: a.title, url: `${SITE.url}/articles/${a.slug}`, datePublished: a.date, dateModified: a.updated, image: `${SITE.url}${a.cover}` })),
  }
  return (
    <>
      <Breadcrumb items={[{ name: 'Articles', href: '/articles' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero
        a="Malus, import, immatriculation :"
        b="nos guides pour payer le juste prix."
        lead="Le barème 2026 expliqué, l’import allemand pas à pas, le cadre de l’immatriculation européenne et des exemples chiffrés. Tout ce qu’il faut savoir avant d’acheter."
        hero="articles"
        primary={{ href: '/simulateur', label: 'Simuler mon gain' }}
        secondary={{ href: SITE.calendly, label: 'Prendre un appel', external: true }}
      />
      <Section grad>
        <Wrap>
          <Reveal className="artgrid">
            {ARTICLES.map((a, i) => <ArticleCard key={a.slug} a={a} i={i} priority={i < 2} />)}
          </Reveal>
        </Wrap>
      </Section>
      <CTA appel title={['Une question sur votre projet ?', 'Parlons-en de vive voix.']} text="Un conseiller vous explique la structure européenne et chiffre votre véhicule, sans engagement." />
    </>
  )
}
