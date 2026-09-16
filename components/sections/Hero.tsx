import Link from 'next/link'
import AutoVideo from '@/components/AutoVideo'
import { Wrap, Arrow } from '@/components/ui'
import { SITE } from '@/lib/site'

const FAITS = [
  { v: '≈ 5', u: 'semaines', s: 'de l’accord à la livraison' },
  { v: '80 000 €', u: 'de malus', s: 'plafond 2026, non supporté' },
  { v: '20 %', u: 'de TVA', s: 'non supportée par la société' },
]

/* Hero de la home : vidéo M3 plein écran, accroche du brief, deux boutons, trois faits. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '100svh', background: '#0a0a0a' }}>
      <div className="absolute inset-0">
        <AutoVideo src="/media/video/m3-garage-1080.mp4" poster="/media/video/m3-garage-poster.jpg" alt="BMW M3 Competition dans le garage Corsiva" sizes="100vw" objectPosition="center 45%" />
        <div className="absolute inset-0 hero-veil" />
      </div>

      <Wrap className="relative flex flex-col justify-end" style={{ minHeight: '100svh', paddingTop: 120, paddingBottom: 40 }}>
        <div className="max-w-4xl">
          <h1 className="hero-in" style={{ fontSize: 'clamp(44px, 8vw, 112px)', animationDelay: '0.15s' }}>
            Votre voiture
            <br />
            d’Allemagne, <span style={{ color: 'var(--blue)' }}>clé en main.</span>
          </h1>
          <p className="hero-in text-[17px] sm:text-[20px] leading-[1.45] mt-6 max-w-2xl" style={{ color: 'rgba(255,255,255,0.74)', animationDelay: '0.32s' }}>
            Sourcing, import, immatriculation. Votre voiture de vos rêves livrée sans une seule contrainte.
          </p>
          <div className="hero-in flex flex-col sm:flex-row gap-3 mt-8" style={{ animationDelay: '0.46s' }}>
            <Link href="/contact" className="btn btn-primary">Parlons de votre projet <Arrow /></Link>
            <Link href="/simulateur" className="btn btn-blue">Simuler mon gain</Link>
            <a href={SITE.phoneTel} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)' }}>{SITE.phone}</a>
          </div>
        </div>

        <ul className="hero-in grid grid-cols-1 sm:grid-cols-3 gap-px mt-14 sm:mt-20 rounded-[20px] overflow-hidden list-none" style={{ animationDelay: '0.62s', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {FAITS.map((f) => (
            <li key={f.u} className="px-6 py-4 sm:py-5 flex flex-col items-start gap-1" style={{ background: 'rgba(9,9,9,0.35)' }}>
              <span className="display tabular text-[30px] sm:text-[36px] leading-none whitespace-nowrap">{f.v} <span className="text-[16px] sm:text-[18px]" style={{ color: 'var(--blue)' }}>{f.u}</span></span>
              <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.62)' }}>{f.s}</span>
            </li>
          ))}
        </ul>
      </Wrap>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 hidden sm:block scroll-cue" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </div>
    </section>
  )
}
