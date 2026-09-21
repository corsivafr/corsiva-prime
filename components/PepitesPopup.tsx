'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Arrow } from '@/components/ui'

const KEY = 'prime-pepites'
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)

/* Pop-up « Recevez les pépites allemandes » : apparaît après 9 s ou à 45 % de défilement, une fois ;
   mémorise le choix 30 jours ; s'ouvre aussi à la demande (événement `open-pepites`). */
export default function PepitesPopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [site, setSite] = useState('')
  const [etat, setEtat] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const shown = useRef(false)
  const legal = pathname === '/mentions-legales' || pathname === '/confidentialite'

  const remember = (v: string) => { try { localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() })) } catch {} }
  const close = () => { setOpen(false); remember('dismissed') }

  useEffect(() => {
    if (legal) return
    let blocked = false
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) { const j = JSON.parse(raw); if (j.v === 'done' || Date.now() - j.t < 30 * 864e5) blocked = true }
    } catch {}
    const show = () => { if (shown.current || blocked) return; shown.current = true; setOpen(true) }
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; if (h > 0 && scrollY / h > 0.45) show() }
    const t = window.setTimeout(show, 9000)
    const onOpen = () => { shown.current = true; setOpen(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('open-pepites', onOpen)
    return () => { window.clearTimeout(t); window.removeEventListener('scroll', onScroll); window.removeEventListener('open-pepites', onOpen) }
  }, [legal])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(email) || etat === 'sending') return
    setEtat('sending')
    try {
      const r = await fetch('/api/pepites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tel, site }) })
      const j = await r.json()
      if (!r.ok || !j.ok) throw new Error()
      setEtat('done'); remember('done')
    } catch { setEtat('error') }
  }

  if (!open || legal) return null
  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="pepites-titre">
      <button type="button" className="drawer-veil absolute inset-0" style={{ background: 'rgba(5,5,5,0.66)', backdropFilter: 'blur(6px)' }} onClick={close} aria-label="Fermer" />
      <div className="pop relative w-full max-w-[440px] rounded-[24px] p-6 sm:p-8" style={{ background: 'radial-gradient(600px 300px at 50% -10%, rgba(0,153,255,0.22), transparent 60%), linear-gradient(180deg, #0f1620, #0b0d12)', border: '1px solid rgba(0,153,255,0.32)', boxShadow: '0 40px 120px rgba(0,0,0,0.6)' }}>
        <button type="button" onClick={close} className="absolute top-3 right-3 w-10 h-10 rounded-full inline-flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }} aria-label="Fermer">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} style={{ height: 16, width: 'auto' }} />
        {etat === 'done' ? (
          <>
            <h2 id="pepites-titre" className="h-sec !text-[28px] mt-5">Vous êtes inscrit.</h2>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>Les prochaines pépites allemandes arrivent dans votre boîte mail. Une voiture précise en tête ? Appelez-nous, on la trouve.</p>
            <button type="button" onClick={() => setOpen(false)} className="btn-w w-full mt-6">Continuer la visite</button>
          </>
        ) : (
          <>
            <h2 id="pepites-titre" className="h-sec !text-[30px] mt-5">Recevez les <span className="grad-blue">pépites allemandes.</span></h2>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>Chaque mois, cinq véhicules dénichés et négociés chez nos concessions partenaires, avec le tarif final tout compris. Avant tout le monde.</p>
            <form onSubmit={submit} className="mt-5 flex flex-col gap-3" noValidate>
              <input type="email" inputMode="email" autoComplete="email" className="field" placeholder="votre@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="E-mail" />
              <input type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="Téléphone (facultatif)" value={tel} onChange={(e) => setTel(e.target.value)} aria-label="Téléphone (facultatif)" />
              <input type="text" name="site" value={site} onChange={(e) => setSite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button type="submit" className="btn-cta w-full" disabled={!isEmail(email) || etat === 'sending'} style={!isEmail(email) ? { opacity: 0.6, boxShadow: 'none' } : undefined}>
                {etat === 'sending' ? 'Inscription…' : 'Recevoir les pépites'} <Arrow />
              </button>
              {etat === 'error' && <p className="text-[13px]" style={{ color: '#ffb4b4' }}>L’inscription n’a pas abouti. Réessayez dans un instant.</p>}
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>Un e-mail par mois, désinscription en un clic. Vos données ne sont jamais cédées.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
