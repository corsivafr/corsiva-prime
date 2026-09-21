'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NAV, SITE } from '@/lib/site'

/* Barre de navigation reprise de corsiva-os.com : une pilule flottante centrée (fond translucide flouté,
   filet clair, grand rayon), logo à gauche, liens Geist gris qui s'allument au survol, pill bleue
   « Simuler mon gain », pill blanche, téléphone en rond. Sur mobile : la pilule prend la largeur et le
   menu s'ouvre en panneau arrondi sous la barre, comme sur OS. */
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Navigation principale">
      <div className="navpill">
        <Link href="/" className="brand" aria-label="Corsiva Prime, accueil">
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} priority style={{ height: 24, width: 'auto' }} />
        </Link>

        <div className="links hidden lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`${pathname === n.href ? 'on' : ''} ${n.href === '/comment-ca-fonctionne' ? 'hidden xl:inline-flex' : ''}`}>{n.label}</Link>
          ))}
        </div>

        <div className="navright">
          <Link href="/simulateur" className="btn-cta btn-sm hidden sm:inline-flex" style={{ boxShadow: '0 6px 20px rgba(0,153,255,0.35)', fontSize: 13, padding: '9px 16px', minHeight: 38 }}>Simuler mon gain</Link>
          <Link href="/contact" className="btn-w btn-sm hidden xl:inline-flex" style={{ fontSize: 13, padding: '9px 16px', minHeight: 38 }}>Parlons de votre projet</Link>
          <a href={SITE.phoneTel} className="navtel" aria-label={`Appeler le ${SITE.phone}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          </a>
          <button type="button" className={`burger lg:hidden ${open ? 'open' : ''}`} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((o) => !o)} />
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="navmenu lg:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={pathname === n.href ? 'on' : ''}>{n.label}</Link>
          ))}
          <div className="flex flex-col gap-2.5 mt-3 pt-3" style={{ borderTop: '1px solid var(--hairline)' }}>
            <Link href="/simulateur" className="btn-cta w-full">Simuler mon gain</Link>
            <Link href="/contact" className="btn-w w-full">Parlons de votre projet</Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-dark w-full">Écrire sur WhatsApp</a>
          </div>
          <p className="text-[12.5px] mt-4 px-1" style={{ color: 'var(--ink-3)' }}>7j/7, de 9h à 18h · conseillers à {SITE.villes.join(', ')}</p>
        </div>
      )}
    </nav>
  )
}
