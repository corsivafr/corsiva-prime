'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV, SITE } from '@/lib/site'

/* En-tête : transparent sur le hero, fond canvas dès le premier défilement. Menu mobile plein
   écran, liens de 56 px, verrou du défilement, fermeture par Échap et au changement de page. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled || open ? 'rgba(9,9,9,0.9)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(14px)' : 'none',
        borderBottom: scrolled || open ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center min-h-[44px]" aria-label="Corsiva Prime, accueil">
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} priority style={{ width: 'clamp(150px, 28vw, 196px)', height: 'auto' }} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV.map((n) => {
            const active = pathname === n.href
            return (
              <Link
                key={n.href}
                href={n.href}
                className="relative px-3.5 min-h-[44px] inline-flex items-center text-[14px] font-medium transition-colors whitespace-nowrap"
                style={{ color: active ? '#fff' : 'rgba(255,255,255,0.68)' }}
              >
                {n.label}
                {active && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px" style={{ background: 'var(--blue)' }} aria-hidden="true" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={SITE.phoneTel} className="hidden xl:inline-flex btn btn-ghost min-h-[44px] px-4 text-[13.5px]" aria-label={`Appeler le ${SITE.phone}`}>
            {SITE.phone}
          </a>
          <Link href="/simulateur" className="btn btn-primary min-h-[44px] px-5 text-[13.5px] hidden sm:inline-flex">
            Simuler mon gain
          </Link>
          <button
            type="button"
            className="lg:hidden w-11 h-11 rounded-full inline-flex items-center justify-center"
            style={{ border: '1px solid rgba(255,255,255,0.14)' }}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Le backdrop-filter de l'en-tête en fait le bloc conteneur : hauteur explicite plutôt que bottom-0. */}
      {open && (
        <div id="menu-mobile" className="lg:hidden fixed inset-x-0 top-[68px] overflow-y-auto" style={{ background: 'rgba(9,9,9,0.98)', height: 'calc(100dvh - 68px)', minHeight: 'calc(100vh - 68px)' }}>
          <nav className="max-w-wrap mx-auto px-5 py-6 flex flex-col" aria-label="Navigation mobile">
            {NAV.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className="hero-in flex items-center justify-between min-h-[58px] text-[24px] font-semibold border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)', animationDelay: `${i * 0.05}s`, letterSpacing: '-0.02em' }}
              >
                {n.label}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-8">
              <Link href="/simulateur" className="btn btn-primary w-full">Simuler mon gain</Link>
              <a href={SITE.phoneTel} className="btn btn-ghost w-full">Appeler le {SITE.phone}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-tonal w-full">Écrire sur WhatsApp</a>
            </div>
            <p className="text-[13px] mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>7j/7, de 9h à 18h · équipe à Paris, sur rendez-vous</p>
          </nav>
        </div>
      )}
    </header>
  )
}
