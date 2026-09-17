import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Process from '@/components/sections/Process'
import Packages from '@/components/sections/Packages'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { Section, Wrap, Title, Lead, Check, d } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Comment ça fonctionne : 5 phases, environ 5 semaines',
  description: 'Validation, sourcing en Allemagne, structuration européenne, acquisition et immatriculation, livraison en France : le déroulé complet d’un projet Corsiva Prime, phase par phase.',
  alternates: { canonical: `${SITE.url}/comment-ca-fonctionne` },
}

const SEMAINES = [
  { s: 'S1', t: 'Validation', c: 'var(--blue)' },
  { s: 'S1–S2', t: 'Sourcing Allemagne', c: 'var(--blue)' },
  { s: 'S1–S3', t: 'Structuration européenne', c: 'var(--blue-deep)' },
  { s: 'S4', t: 'Acquisition et immatriculation', c: 'var(--blue-deep)' },
  { s: 'S5', t: 'Livraison France', c: '#fff' },
]

const SEJOUR = [
  'Déplacement organisé de 3 à 4 jours, en parallèle du sourcing',
  'Rendez-vous avec l’avocat partenaire : dépôt de capital, banque, acte notarié',
  'Hôtel 5 étoiles, transports et restauration inclus',
  'Un accompagnant Corsiva Prime du départ au retour',
]

export default function Page() {
  return (
    <>
      <PageHero
        a="Cinq phases,"
        b="environ cinq semaines."
        lead="De l’accord à la remise des clés, vous savez à chaque instant où en est votre voiture. Voici le déroulé, sans zone d’ombre."
        image="/media/photos/m3-lac-route.jpg"
        imageMobile="/media/photos/m3-lac-portrait.jpg"
        position="center 60%"
        primary={{ href: '/contact', label: 'Parlons de votre projet' }}
        secondary={{ href: '/tarifs', label: 'Voir les packages' }}
      />

      <Section tone="light">
        <Wrap>
          <Reveal>
            <Title a="Le calendrier" b="en un coup d’œil." />
            <ol className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-5 gap-3 list-none">
              {SEMAINES.map((w, i) => (
                <li key={w.t} className="rise card p-5 flex md:flex-col items-center md:items-start gap-4 md:gap-3" style={d(0.07 * i)}>
                  <span className="display tabular text-[26px] leading-none flex-shrink-0" style={{ color: 'var(--blue-deep)' }}>{w.s}</span>
                  <div className="h-px md:h-1 w-6 md:w-full rounded-full" style={{ background: i === 4 ? '#0a0a0a' : 'var(--blue-deep)', opacity: 0.25 + i * 0.18 }} aria-hidden="true" />
                  <p className="text-[14.5px] font-medium leading-snug">{w.t}</p>
                </li>
              ))}
            </ol>
            <p className="rise text-[13px] mt-5" style={{ ...d(0.4), color: 'var(--ink-3)' }}>Durées indicatives, données par phase ci-dessous. La structuration européenne se déroule en parallèle du sourcing.</p>
          </Reveal>
        </Wrap>
      </Section>

      <Process />

      <Section tone="light-2">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-center">
            <div className="lg:col-span-6 rise rise-scale zoom-media relative overflow-hidden rounded-[30px]" style={{ aspectRatio: '4 / 3' }}>
              <Image src="/media/photos/cayenne-interieur.jpg" alt="Intérieur d’un Porsche Cayenne" fill quality={86} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="lg:col-span-6">
              <Title a="Le déplacement," b="organisé de bout en bout." />
              <Lead className="mt-6">La création de la société demande votre présence quelques jours. On s’occupe de tout : vous n’avez qu’à signer.</Lead>
              <ul className="mt-8 flex flex-col gap-3.5 list-none">
                {SEJOUR.map((s, i) => (
                  <li key={s} className="rise flex items-start gap-3 text-[15.5px] leading-snug" style={d(0.1 + i * 0.06)}><Check blue /><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <Packages lead={false} />
      <FAQ tone="light" />
      <CTA />
    </>
  )
}
