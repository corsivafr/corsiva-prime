'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/* Bandeau cookies. Le site ne dépose aucun traceur publicitaire : la mesure d'audience (Vercel Web
   Analytics) est exemptée de consentement et sans cookie. Le bandeau informe, enregistre le choix six
   mois dans le stockage local (corsiva_prime_consent) et expose window.__cpConsent pour un futur outil
   soumis à consentement. Le lien « Gérer mes cookies » du pied de page le rouvre (événement open-cookies). */
const KEY = 'corsiva_prime_consent'
const SIX_MOIS = 1000 * 60 * 60 * 24 * 182
type Choix = 'accept' | 'refuse'

declare global { interface Window { __cpConsent?: Choix } }

function lire(): Choix | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const { v, t } = JSON.parse(raw) as { v: Choix; t: number }
    if (Date.now() - t > SIX_MOIS) return null
    return v
  } catch { return null }
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const c = lire()
    if (c) window.__cpConsent = c
    else setOpen(true)
    const onOpen = () => setOpen(true)
    window.addEventListener('open-cookies', onOpen)
    return () => window.removeEventListener('open-cookies', onOpen)
  }, [])
  const choisir = (v: Choix) => {
    try { localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() })) } catch {}
    window.__cpConsent = v
    setOpen(false)
  }
  if (!open) return null
  return (
    <div className="ckb" role="dialog" aria-modal="false" aria-labelledby="ckb-t">
      <div className="ckb-card">
        <p id="ckb-t" className="ckb-title">Cookies et mesure d’audience</p>
        <p className="ckb-text">
          Corsiva Prime n’utilise aucun traceur publicitaire. La mesure d’audience (Vercel Web Analytics) fonctionne sans cookie et sans suivi entre sites ; seul votre choix ci-dessous est mémorisé, six mois, dans votre navigateur.{' '}
          <Link href="/confidentialite#cookies">En savoir plus</Link>
        </p>
        <div className="ckb-actions">
          <button type="button" className="btn-dark btn-sm" onClick={() => choisir('refuse')}>Tout refuser</button>
          <button type="button" className="btn-cta btn-sm" onClick={() => choisir('accept')}>Tout accepter</button>
        </div>
      </div>
    </div>
  )
}
