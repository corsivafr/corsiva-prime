import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import Arguments from '@/components/sections/Arguments'
import Catalogue from '@/components/Catalogue'
import PepitesOuvrir from '@/components/PepitesOuvrir'
import PepitesInline from '@/components/PepitesInline'
import { VEHICULES, prixImportTTC } from '@/lib/catalogue'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import BrandMarquee from '@/components/sections/BrandMarquee'
import { Section, Wrap, SecHead, Title, Lead, Check, d } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Import voiture de luxe Allemagne, tout géré',
  description: 'Pépites dénichées chez nos concessions partenaires en Allemagne, deal négocié, options au choix, transport fermé et carte grise française : tout est géré.',
  alternates: { canonical: `${SITE.url}/import` },
}

const INCLUS = [
  { t: 'On déniche la pépite', s: 'Nos concessions partenaires en Allemagne nous confient leurs meilleures voitures : neuves, configurables, ou occasions récentes triées sur le volet.' },
  { t: 'On négocie le deal', s: 'Remises négociées, prix net défendu en allemand. Vous achetez la bonne voiture au bon prix.' },
  { t: 'Vous choisissez vos options', s: 'Couleur, jantes, sellerie, packs : vous configurez, nous validons chaque détail avec la concession.' },
  { t: 'On contrôle tout', s: 'Inspection, historique d’entretien, kilométrage, contrôle documentaire. Rien n’est acheté sur une photo.' },
  { t: 'On livre en transport fermé', s: 'Acheminement en camion fermé privé jusqu’à votre adresse. Aucun kilomètre inutile.' },
  { t: 'On immatricule en France', s: 'Quitus fiscal, certificat de conformité, carte grise : les formalités françaises sont gérées jusqu’aux plaques.' },
]

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Les pépites du mois — import depuis l’Allemagne',
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
      url: `${SITE.url}/import?v=${v.id}`,
      offers: { '@type': 'Offer', priceCurrency: 'EUR', price: prixImportTTC(v.chiffres!), priceSpecification: { '@type': 'PriceSpecification', price: prixImportTTC(v.chiffres!), priceCurrency: 'EUR', valueAddedTaxIncluded: true }, availability: 'https://schema.org/InStock', url: `${SITE.url}/import?v=${v.id}`, seller: { '@type': 'Organization', name: SITE.name } },
    },
  })),
}

export default function Page({ searchParams }: { searchParams?: { v?: string } }) {
  return (
    <>
      <Breadcrumb items={[{ name: 'Import', href: '/import' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <PageHero
        a="Import d’Allemagne,"
        b="immatriculée en France."
        lead="On déniche la pépite chez nos concessions partenaires, on négocie le deal, vous choisissez vos options. Tout est géré, jusqu’aux plaques françaises."
        hero="import"
        primary={{ href: '#pepites', label: 'Voir les pépites du mois' }}
        secondary={{ href: '/contact', label: 'Parlons de votre projet' }}
      />
      <BrandMarquee title={false} />

      <Section tone="light">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <Title a="Tout est géré," b="de la pépite aux plaques." />
              <Lead className="mt-6">Un seul interlocuteur, du premier appel à la remise des clés. Vous validez la voiture et vos options, Corsiva accompagne tout le reste, en Allemagne comme en France.</Lead>
              <div className="rise rise-scale zoom-media relative overflow-hidden rounded-[20px] mt-8" style={{ ...d(0.16), aspectRatio: '4 / 3' }}>
                <Image src="/media/photos/m3-interieur.jpg" alt="Intérieur d’une BMW M3 Competition" fill quality={86} sizes="(max-width: 1023px) 100vw, 40vw" className="object-cover" />
              </div>
            </div>
            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none">
              {INCLUS.map((p, i) => (
                <li key={p.t} className="rise card lift p-6" style={d(0.06 * (i + 1))}>
                  <div className="flex items-start gap-3">
                    <Check blue />
                    <div>
                      <h3 className="text-[17px] leading-snug">{p.t}</h3>
                      <p className="text-[14px] leading-relaxed mt-1.5" style={{ color: 'var(--ink-2)' }}>{p.s}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Wrap>
      </Section>

      <Process compact />
      <Section tone="light" id="pepites">
        <Wrap>
          <SecHead a="Nos pépites" b="du mois.">Chaque mois, cinq véhicules dénichés et négociés chez nos concessions partenaires en Allemagne. Prix affichés TTC, transport et formalités inclus. Vous choisissez vos options, Corsiva gère l’import jusqu’aux plaques françaises.</SecHead>
          <Catalogue openId={searchParams?.v} />
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[12.5px] leading-relaxed max-w-2xl" style={{ color: 'var(--ink-3)' }}>Prix TTC indicatifs : prix négocié chez la concession partenaire, transport fermé, formalités d’immatriculation en France et TVA française de 20 % inclus. Hors malus écologique, dû lors de l’immatriculation en France et propre à chaque modèle. Proposition personnalisée après un premier appel.</p>
            <PepitesOuvrir className="btn-cta flex-shrink-0">Recevoir les pépites chaque mois</PepitesOuvrir>
          </div>
          <Reveal className="mt-10"><PepitesInline /></Reveal>
        </Wrap>
      </Section>
      <Arguments title={['Pourquoi passer', 'par Corsiva Prime.']} />
      <FAQ tone="dark" />
      <CTA />
    </>
  )
}
