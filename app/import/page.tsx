import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Arguments from '@/components/sections/Arguments'
import Exemples from '@/components/sections/Exemples'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import BrandMarquee from '@/components/sections/BrandMarquee'
import { Section, Wrap, Title, Lead, Check, d } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Import de voiture depuis l’Allemagne, clé en main',
  description: 'Sourcing, inspection, historique, négociation, transport fermé privé et carte grise : Corsiva Prime importe votre voiture d’Allemagne et vous la livre en France. Le vrai prix allemand, sans contrainte.',
  alternates: { canonical: `${SITE.url}/import` },
}

const INCLUS = [
  { t: 'Cahier des charges', s: 'Modèle, finition, options, budget, calendrier : on cadre précisément la voiture que vous cherchez.' },
  { t: 'Sourcing et présélection', s: 'Veille sur l’ensemble du marché allemand, concessions et distributeurs officiels, présélection pour validation.' },
  { t: 'Inspection et historique', s: 'Contrôle documentaire, historique d’entretien, kilométrage, état réel. Rien n’est acheté sur une photo.' },
  { t: 'Négociation', s: 'On négocie pour vous, en allemand, sur le prix net. Vous achetez au bon prix.' },
  { t: 'Transport fermé privé', s: 'Acheminement en camion fermé jusqu’à votre adresse. Aucune route, aucun kilomètre inutile.' },
  { t: 'Carte grise et formalités', s: 'Quitus fiscal, certificat de conformité, immatriculation : on gère jusqu’aux plaques.' },
]

export default function Page() {
  return (
    <>
      <PageHero
        a="La bonne voiture,"
        b="au vrai prix allemand."
        lead="On la trouve, on la contrôle, on la négocie, on la livre chez vous. Vous n’avez qu’à récupérer les clés."
        image="/media/photos/m3-chambery.jpg"
        imageMobile="/media/photos/m3-lac-portrait.jpg"
        position="center 55%"
        primary={{ href: '/contact', label: 'Parlons de votre projet' }}
        secondary={{ href: '/catalogue', label: 'Voir le catalogue' }}
      />
      <BrandMarquee title={false} />

      <Section tone="light">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <Title a="Tout est géré," b="de A à Z." />
              <Lead className="mt-6">Six étapes, un seul interlocuteur. Vous validez la voiture, nous faisons le reste, en France comme en Allemagne.</Lead>
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
      <Exemples />
      <Arguments title={['Pourquoi passer', 'par Corsiva Prime.']} />
      <FAQ tone="dark" />
      <CTA />
    </>
  )
}
