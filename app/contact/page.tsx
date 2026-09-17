import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/sections/FAQ'
import { Section, Wrap, Title, Lead, Arrow, d } from '@/components/ui'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact : parlons de votre projet',
  description: 'Téléphone, WhatsApp, e-mail ou formulaire : l’équipe Corsiva Prime vous répond 7j/7 de 9h à 18h et vous reçoit à Paris, sur rendez-vous.',
  alternates: { canonical: `${SITE.url}/contact` },
}

export default function Page() {
  const cartes = [
    { t: 'Téléphone', v: SITE.phone, s: '7j/7, de 9h à 18h', href: SITE.phoneTel, icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /> },
    { t: 'WhatsApp', v: 'Écrire un message', s: 'Réponse rapide, photos et annonces bienvenues', href: SITE.whatsapp, ext: true, icon: <path d="M4 20l1.3-3.9A8 8 0 1 1 8.2 19.1L4 20zM9 9.5c.3 2.4 2.8 4.9 5.2 5.2l1.2-1.2-1.8-.9-.9.6c-.9-.4-1.8-1.3-2.2-2.2l.6-.9-.9-1.8L9 9.5z" /> },
    { t: 'E-mail', v: SITE.email, s: 'Réponse sous 24 h', href: `mailto:${SITE.email}`, icon: <path d="M4 6h16v12H4zM4 7l8 6 8-6" /> },
    { t: 'Nos équipes', v: 'Paris, sur rendez-vous', s: 'Groupe Corsiva · siège à Chambéry', href: '#formulaire', icon: <path d="M12 21s7-4.4 7-10.5A7 7 0 0 0 5 10.5C5 16.6 12 21 12 21zM12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /> },
  ]
  return (
    <>
      <PageHero
        a="Votre prochaine voiture"
        b="vous attend en Allemagne."
        lead="Parlons de votre projet. Un conseiller vous répond sous 24 h, avec un premier chiffrage."
        image="/media/photos/m3-volant.jpg"
        imageMobile="/media/photos/m3-lac-portrait.jpg"
        position="center 45%"
      />

      <Section tone="light" id="formulaire">
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <Title a="Parlons" b="de votre projet." />
              <Lead className="mt-6">Modèle visé, budget, calendrier, neuf ou occasion : dites-nous l’essentiel, on revient vers vous avec un premier chiffrage.</Lead>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 list-none">
                {cartes.map((c, i) => (
                  <li key={c.t} className="rise" style={d(0.08 * (i + 1))}>
                    <a href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noopener noreferrer' : undefined} className="card lift flex items-center gap-4 p-4 sm:p-5 group">
                      <span className="w-11 h-11 rounded-full inline-flex items-center justify-center flex-shrink-0" style={{ background: 'var(--blue-tint)' }} aria-hidden="true">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0045ff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12.5px]" style={{ color: 'var(--ink-3)' }}>{c.t}</span>
                        <span className="block text-[16px] font-semibold leading-snug truncate" style={{ letterSpacing: '-0.01em' }}>{c.v}</span>
                        <span className="block text-[13px] mt-0.5" style={{ color: 'var(--ink-2)' }}>{c.s}</span>
                      </span>
                      <Arrow className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 rise" style={d(0.12)}>
              <Suspense fallback={null}><ContactForm /></Suspense>
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <Section>
        <Wrap>
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:items-center">
            <div className="lg:col-span-6 rise rise-scale zoom-media relative overflow-hidden rounded-[30px]" style={{ aspectRatio: '16 / 10' }}>
              <Image src="/media/photos/taycan-profil.jpg" alt="Porsche Taycan du groupe Corsiva" fill quality={86} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="lg:col-span-6">
              <Title a="Une équipe à Paris," b="un groupe en Savoie." />
              <Lead className="mt-6">Corsiva Prime est une entité du groupe Corsiva : location de prestige, conciergerie et sourcing depuis Chambéry, 4,9 sur Google. Nos conseillers vous reçoivent à Paris, sur rendez-vous.</Lead>
              <div className="rise grid grid-cols-2 gap-4 mt-8" style={d(0.16)}>
                <div className="card p-5"><p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Horaires</p><p className="text-[16px] font-semibold mt-1">7j/7 · 9h – 18h</p></div>
                <div className="card p-5"><p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Siège du groupe</p><p className="text-[16px] font-semibold mt-1">Chambéry, Savoie</p></div>
              </div>
            </div>
          </Reveal>
        </Wrap>
      </Section>

      <FAQ tone="light" />
    </>
  )
}
