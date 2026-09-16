import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Wrap, Arrow, d } from '@/components/ui'
import { SITE } from '@/lib/site'

/* Appel à l'action final : la carte spotlight bleue, seule touche de dégradé de la page. */
export default function CTA({ title = ['Votre prochaine voiture', 'vous attend en Allemagne.'], text = 'Parlons de votre projet. Un conseiller vous répond sous 24 h, avec un premier chiffrage.' }: { title?: [string, string]; text?: string }) {
  return (
    <section className="grain relative py-20 sm:py-28">
      <Wrap>
        <Reveal className="spotlight rise rise-scale relative overflow-hidden px-6 py-12 sm:px-14 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="display" style={{ fontSize: 'clamp(34px, 5.4vw, 64px)' }}>
              {title[0]}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.72)' }}>{title[1]}</span>
            </h2>
            <p className="text-[16px] sm:text-[17.5px] leading-relaxed mt-5 max-w-xl muted">{text}</p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href="/contact" className="btn btn-primary w-full">Parlons de votre projet <Arrow /></Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn w-full" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.28)' }}>Écrire sur WhatsApp</a>
            <a href={SITE.phoneTel} className="btn w-full" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.28)' }}>{SITE.phone}</a>
          </div>
          <div className="pointer-events-none absolute -right-24 -bottom-32 w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 60%)' }} aria-hidden="true" />
        </Reveal>
      </Wrap>
    </section>
  )
}
