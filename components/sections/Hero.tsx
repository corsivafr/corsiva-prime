import Image from 'next/image'
import Link from 'next/link'
import Parallax from '@/components/fx/Parallax'
import CountUp from '@/components/fx/CountUp'
import { Wrap, Arrow } from '@/components/ui'
import { SITE } from '@/lib/site'

/* Hero de la home : la M3 CS du groupe en plein cadre (paysage sur grand écran, portrait sur mobile),
   Ken Burns lent + parallaxe, titre révélé ligne par ligne, trois faits en cartes de verre. */
export default function Hero() {
  return (
    <>
    <section className="relative overflow-hidden" style={{ minHeight: '100svh', background: '#070707' }}>
      <Parallax speed={0.18} className="absolute inset-0" style={{ inset: '-8% 0' }}>
        <div className="absolute inset-0 kenburns">
          <Image src="/media/photos/m3-lac-1.jpg" alt="BMW M3 CS du groupe Corsiva au bord du lac" fill priority quality={84} sizes="100vw" className="object-cover hidden sm:block" style={{ objectPosition: '62% 55%' }} />
          <Image src="/media/photos/m3-lac-portrait.jpg" alt="BMW M3 CS du groupe Corsiva au bord du lac" fill priority quality={84} sizes="100vw" className="object-cover sm:hidden" style={{ objectPosition: '50% 70%' }} />
        </div>
      </Parallax>
      <div className="absolute inset-0 hero-veil" />
      <div className="absolute inset-x-0 top-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.55), transparent)' }} />
      <div className="pointer-events-none absolute -left-40 bottom-0 w-[620px] h-[420px] glow-blue" aria-hidden="true" />

      <Wrap className="relative flex flex-col justify-end" style={{ minHeight: '100svh', paddingTop: 120, paddingBottom: 36 }}>
        <div className="max-w-4xl">
          <h1 className="lines" style={{ fontSize: 'clamp(46px, 8.2vw, 116px)' }}>
            <span className="ln"><span style={{ ['--d' as string]: '0.15s' }}>Votre voiture</span></span>
            <span className="ln"><span style={{ ['--d' as string]: '0.28s' }}>d’Allemagne,</span></span>
            <span className="ln"><span style={{ ['--d' as string]: '0.41s', color: 'var(--blue)' }}>clé en main.</span></span>
          </h1>
          <p className="hero-in text-[17px] sm:text-[20px] leading-[1.45] mt-6 max-w-2xl" style={{ color: 'rgba(255,255,255,0.76)', animationDelay: '0.7s' }}>
            Sourcing, import, immatriculation. Votre voiture de vos rêves livrée sans une seule contrainte.
          </p>
          <div className="hero-in flex flex-col sm:flex-row gap-3 mt-8" style={{ animationDelay: '0.85s' }}>
            <Link href="/catalogue" className="btn btn-primary">Voir le catalogue <Arrow /></Link>
            <Link href="/simulateur" className="btn btn-blue">Simuler mon gain</Link>
            <a href={SITE.phoneTel} className="btn glass" style={{ color: '#fff' }}>{SITE.phone}</a>
          </div>
        </div>

        <ul className="hero-in hidden sm:grid sm:grid-cols-3 gap-3 mt-20 list-none" style={{ animationDelay: '1.05s' }}>
          <li className="glass rounded-[20px] px-6 py-5">
            <p className="display text-[34px] sm:text-[40px] leading-none">≈ <CountUp value={5} /> <span className="text-[17px]" style={{ color: 'var(--blue)' }}>semaines</span></p>
            <p className="text-[13px] mt-2" style={{ color: 'rgba(255,255,255,0.66)' }}>de l’accord à la livraison</p>
          </li>
          <li className="glass rounded-[20px] px-6 py-5">
            <p className="display text-[34px] sm:text-[40px] leading-none"><CountUp value={80000} format="euro" /> <span className="text-[17px]" style={{ color: 'var(--blue)' }}>de malus</span></p>
            <p className="text-[13px] mt-2" style={{ color: 'rgba(255,255,255,0.66)' }}>plafond 2026, non supporté</p>
          </li>
          <li className="glass rounded-[20px] px-6 py-5">
            <p className="display text-[34px] sm:text-[40px] leading-none"><CountUp value={20} suffix=" %" /> <span className="text-[17px]" style={{ color: 'var(--blue)' }}>de TVA</span></p>
            <p className="text-[13px] mt-2" style={{ color: 'rgba(255,255,255,0.66)' }}>non supportée par la société</p>
          </li>
        </ul>
      </Wrap>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 hidden sm:block scroll-cue" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </div>
    </section>

      {/* Sur mobile, les trois chiffres passent sous la photo pour laisser la M3 visible. */}
      <ul className="sm:hidden grid grid-cols-1 gap-3 px-5 pb-8 -mt-2 list-none relative" style={{ background: 'var(--canvas)' }}>
        <li className="card px-5 py-4"><p className="display text-[30px] leading-none">≈ <CountUp value={5} /> <span className="text-[15px]" style={{ color: 'var(--blue)' }}>semaines</span></p><p className="text-[12.5px] mt-1.5" style={{ color: 'var(--ink-2)' }}>de l’accord à la livraison</p></li>
        <li className="card px-5 py-4"><p className="display text-[30px] leading-none"><CountUp value={80000} format="euro" /> <span className="text-[15px]" style={{ color: 'var(--blue)' }}>de malus</span></p><p className="text-[12.5px] mt-1.5" style={{ color: 'var(--ink-2)' }}>plafond 2026, non supporté</p></li>
        <li className="card px-5 py-4"><p className="display text-[30px] leading-none"><CountUp value={20} suffix=" %" /> <span className="text-[15px]" style={{ color: 'var(--blue)' }}>de TVA</span></p><p className="text-[12.5px] mt-1.5" style={{ color: 'var(--ink-2)' }}>non supportée par la société</p></li>
      </ul>
    </>
  )
}
