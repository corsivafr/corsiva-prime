import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import CTA from '@/components/sections/CTA'
import ArticlesSection, { dateFR } from '@/components/sections/ArticlesSection'
import FichesArticle from '@/components/sections/FichesArticle'
import { Section, Wrap, Title, Check, Arrow } from '@/components/ui'
import { ARTICLES, articleParSlug } from '@/lib/articles'
import { ficheParId, nomFiche } from '@/lib/acquisitions'
import { SITE } from '@/lib/site'

export const dynamicParams = false
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleParSlug(params.slug)
  if (!a) return {}
  const url = `${SITE.url}/articles/${a.slug}`
  return {
    title: a.metaTitle,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: a.title, description: a.description, publishedTime: a.date, modifiedTime: a.updated, images: [{ url: a.cover, alt: a.coverAlt }], locale: 'fr_FR', siteName: SITE.name },
    twitter: { card: 'summary_large_image', title: a.title, description: a.description, images: [a.cover] },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const a = articleParSlug(params.slug)
  if (!a) notFound()
  const url = `${SITE.url}/articles/${a.slug}`
  const fiche = ficheParId(a.fiche)
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: a.title,
        description: a.description,
        image: [`${SITE.url}${a.cover}`],
        datePublished: a.date,
        dateModified: a.updated,
        inLanguage: 'fr-FR',
        keywords: a.keywords.join(', '),
        articleSection: 'Malus, import et immatriculation',
        author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url, logo: { '@type': 'ImageObject', url: `${SITE.url}/media/logos/logo-prime-512.png`, width: 512, height: 512 } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      ...(a.faq ? [{ '@type': 'FAQPage', mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
    ],
  }
  return (
    <>
      <Breadcrumb items={[{ name: 'Articles', href: '/articles' }, { name: a.title, href: `/articles/${a.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <header className="relative overflow-hidden" style={{ padding: '140px 0 0', background: '#090909' }}>
        <div className="hero-glow" aria-hidden="true" />
        <Wrap className="relative">
          <nav aria-label="Fil d’Ariane" className="hin flex flex-wrap items-center gap-x-2 text-[13px]" style={{ color: 'var(--ink-3)' }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/articles" className="hover:text-white">Articles</Link>
          </nav>
          <h1 className="h-hero h-hero-sm hin mt-6" style={{ ['--d' as string]: '0.05s', maxWidth: 980 }}>
            {a.h1[0]}
            <br />
            <span className="grad-blue">{a.h1[1]}</span>
          </h1>
          <p className="hin mt-6 text-[13.5px]" style={{ ['--d' as string]: '0.14s', color: 'var(--ink-2)' }}>
            Publié le {dateFR(a.date)}{a.updated !== a.date ? ` · mis à jour le ${dateFR(a.updated)}` : ''} · {a.minutes} min de lecture · Par l’équipe {SITE.name}
          </p>
          {fiche ? (
            <Link href={`/immatriculation?fiche=${fiche.id}#catalogue`} className="artcover artcover-link hin mt-10 block" style={{ ['--d' as string]: '0.22s' }} aria-label={`Voir la fiche ${nomFiche(fiche)} sur le site`}>
              <Image src={a.cover} alt={a.coverAlt} fill priority quality={82} sizes="(max-width: 1279px) 100vw, 1200px" className="object-cover" />
              <span className="artcover-cta">Voir la fiche {nomFiche(fiche)} <Arrow className="w-3.5 h-3.5" /></span>
            </Link>
          ) : (
            <div className="artcover hin mt-10" style={{ ['--d' as string]: '0.22s' }}>
              <Image src={a.cover} alt={a.coverAlt} fill priority quality={82} sizes="(max-width: 1279px) 100vw, 1200px" className="object-cover" />
            </div>
          )}
        </Wrap>
      </header>

      <Section className="!pt-14 sm:!pt-16">
        <Wrap>
          <article className="art">
            <p className="intro">{a.intro}</p>
            {a.blocs.map((b) => (
              <Reveal key={b.h2}>
                <h2 className="rise">{b.h2}</h2>
                {b.paras?.map((p) => <p key={p.slice(0, 40)} className="rise">{p}</p>)}
                {b.list && (
                  <ul className="rise">
                    {b.list.map((li) => (
                      <li key={li.slice(0, 40)}><Check /><span>{li}</span></li>
                    ))}
                  </ul>
                )}
                {b.note && <div className="note rise"><p>{b.note}</p></div>}
              </Reveal>
            ))}
            <Reveal className="rise flex flex-wrap gap-3 mt-10">
              <Link href="/simulateur" className="btn-cta">Simuler mon gain <Arrow /></Link>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w">Prendre un appel <Arrow /></a>
              <Link href="/immatriculation" className="btn-dark">Le service Zéro malus</Link>
            </Reveal>
            {a.liens && a.liens.length > 0 && (
              <Reveal className="voir-aussi rise">
                <p>À lire aussi</p>
                <ul>
                  {a.liens.map((l) => (
                    <li key={l.href}><Link href={l.href}>{l.label} <Arrow className="w-3.5 h-3.5" /></Link></li>
                  ))}
                </ul>
              </Reveal>
            )}
            <p className="legal">
              Barème 2026 : loi de finances n° 2025-127 du 14 février 2025 et fiche service-public.gouv.fr F35947. Prix relevés sur des offres réelles ; CO₂ et masse constructeur indicatifs. Simulation indicative et non contractuelle. La structure européenne vous est présentée lors d’un appel avec un conseiller.
            </p>
          </article>

          {a.faq && (
            <Reveal className="art mt-16">
              <Title a="Questions" b="fréquentes." />
              <div className="faq rise mt-6">
                {a.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          )}
        </Wrap>
      </Section>

      <FichesArticle ids={a.fiches ?? [a.fiche]} />
      <ArticlesSection exclude={a.slug} related={a.related} a="Poursuivre" b="la lecture." lead="Trois autres guides, pour avoir toutes les cartes en main avant d’acheter." />
      <CTA appel title={['Votre voiture, sans malus ni TVA :', 'parlons-en.']} text="Un conseiller chiffre votre projet et vous présente la structure européenne, sans engagement." />
    </>
  )
}
