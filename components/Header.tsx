'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV, SITE } from '@/lib/site'

/* En-tête façon Corsiva OS : liens gris en pills au survol, pill bleue « Simuler mon gain », pill blanche
   « Parlons de votre projet », téléphone en rond. Fond flouté dès le premier défilement. */
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

  const on = scrolled || open
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      style={{ background: on ? 'rgba(9,9,9,0.78)' : 'transparent', backdropFilter: on ? 'blur(14px)' : 'none', borderBottom: `1px solid ${on ? 'var(--hairline-soft)' : 'transparent'}` }}
      aria-label="Navigation principale"
    >
      <div className="max-w-wrap mx-auto px-4 sm:px-6 lg:px-8 h-[64px] flex items-center gap-4">
        <Link href="/" className="flex items-center min-h-[44px] mr-2" aria-label="Corsiva Prime, accueil">
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} priority style={{ width: 'clamp(140px, 24vw, 168px)', height: 'auto' }} />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {NAV.map((n) => {
            const active = pathname === n.href
            return (
              <Link key={n.href} href={n.href} className="inline-flex items-center min-h-[40px] px-3.5 rounded-full text-[13.5px] font-medium whitespace-nowrap transition-colors hover:bg-white/5"
                style={{ color: active ? '#fff' : 'var(--ink-2)', background: active ? 'rgba(255,255,255,0.06)' : undefined }}>
                {n.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <Link href="/simulateur" className="btn-cta btn-sm hidden sm:inline-flex" style={{ boxShadow: '0 6px 20px rgba(0,153,255,0.35)' }}>Simuler mon gain</Link>
          <Link href="/contact" className="btn-w btn-sm hidden xl:inline-flex">Parlons de votre projet</Link>
          <a href={SITE.phoneTel} className="hidden sm:inline-flex w-10 h-10 rounded-full items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.16)', color: '#fff' }} aria-label={`Appeler le ${SITE.phone}`}>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          </a>
          <button type="button" className="lg:hidden w-10 h-10 rounded-full inline-flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.16)' }}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Le backdrop-filter de la barre en fait le bloc conteneur : hauteur explicite plutôt que bottom-0. */}
      {open && (
        <div id="menu-mobile" className="lg:hidden fixed inset-x-0 top-[64px] overflow-y-auto" style={{ background: 'rgba(9,9,9,0.98)', height: 'calc(100dvh - 64px)', minHeight: 'calc(100vh - 64px)' }}>
          <div className="max-w-wrap mx-auto px-5 py-6 flex flex-col">
            {NAV.map((n, i) => (
              <Link key={n.href} href={n.href} className="hin flex items-center justify-between min-h-[58px] text-[24px] font-semibold border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)', ['--d' as string]: `${i * 0.05}s`, letterSpacing: '-0.02em' }}>
                {n.label}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-8">
              <Link href="/simulateur" className="btn-cta w-full">Simuler mon gain</Link>
              <Link href="/contact" className="btn-w w-full">Parlons de votre projet</Link>
              <a href={SITE.phoneTel} className="btn-dark w-full">Appeler le {SITE.phone}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-dark w-full">Écrire sur WhatsApp</a>
            </div>
            <p className="text-[13px] mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>7j/7, de 9h à 18h · équipe à Paris, sur rendez-vous</p>
          </div>
        </div>
      )}
    </nav>
  )
}
