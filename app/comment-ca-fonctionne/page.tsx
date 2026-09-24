import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import Process from '@/components/sections/Process'
import PackagesCompare from '@/components/sections/PackagesCompare'
import Calendrier from '@/components/Calendrier'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import { Section, Wrap, SecHead, Title, Lead, Check, d } from '@/components/ui'
import { SITE, metaPage } from '@/lib/site'

export const metadata: Metadata = metaPage('/comment-ca-fonctionne', 'Importer sans malus : 5 phases, 5 semaines', 'Validation, sourcing en Allemagne, structuration européenne, acquisition, immatriculation, livraison en France : le déroulé d’un import Corsiva Prime.', 'process')

const SEJOUR = [
  'Déplacement organisé de 3 à 4 jours, en parallèle du sourcing',
  'Rendez-vous avec nos avocats partenaires — les détails vous sont présentés lors d’un appel',
  'Hôtel 5 étoiles, transports et restauration inclus',
  'Un accompagnant Corsiva Prime du départ au retour',
]

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Comment ça fonctionne', href: '/comment-ca-fonctionne' }]} />
      <PageHero
        a="Cinq phases,"
        b="environ cinq semaines."
        lead="De l’accord à la remise des clés, vous savez à chaque instant où en est votre voiture. Voici le déroulé, sans zone d’ombre."
        hero="process"
        video={{ src: '/media/video/reel-m3-garage-480.mp4', poster: '/media/video/reel-m3-garage-poster.jpg' }}
        primary={{ href: '/contact', label: 'Parlons de votre projet' }}
        secondary={{ href: '/tarifs', label: 'Voir les packages' }}
      />

      <Section tone="light">
        <Wrap>
          <SecHead a="Le calendrier" b="en un coup d’œil.">Cinq phases, environ cinq semaines. Touchez une étape, ou laissez la frise avancer.</SecHead>
          <Reveal className="rise rise-scale"><Calendrier /></Reveal>
          <p className="rise text-[13px] mt-5 text-center" style={{ ...d(0.3), color: 'var(--ink-3)' }}>Durées indicatives. La structuration européenne se déroule en parallèle du sourcing.</p>
        </Wrap>
      </Section>

      <Process />

      <Section tone="light-2">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 lg:items-center">
            <div className="lg:col-span-6 rise rise-scale zoom-media relative overflow-hidden rounded-[30px]" style={{ aspectRatio: '4 / 3' }}>
              <Image src="/media/photos/urus-interieur-2.jpg" alt="Intérieur d’un véhicule importé" fill quality={86} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="lg:col-span-6">
              <Title a="Le déplacement," b="organisé de bout en bout." />
              <Lead className="mt-6">La structuration européenne demande votre présence quelques jours. On s’occupe de tout : vous n’avez qu’à signer.</Lead>
              <ul className="mt-8 flex flex-col gap-3.5 list-none">
                {SEJOUR.map((s, i) => (
                  <li key={s} className="rise flex items-start gap-3 text-[15.5px] leading-snug" style={d(0.1 + i * 0.06)}><Check blue /><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <PackagesCompare lead={false} />
      <FAQ />
      <CTA />
    </>
  )
}
