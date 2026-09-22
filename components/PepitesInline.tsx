'use client'

import { useState } from 'react'
import { Arrow } from '@/components/ui'

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)

/* Inscription aux pépites, en ligne dans la page Import : e-mail obligatoire, téléphone facultatif.
   Même point d'entrée que le pop-up (/api/pepites). */
export default function PepitesInline() {
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [site, setSite] = useState('')
  const [etat, setEtat] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(email) || etat === 'sending') return
    setEtat('sending')
    try {
      const r = await fetch('/api/pepites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, tel, site }) })
      const j = await r.json()
      if (!r.ok || !j.ok) throw new Error()
      setEtat('done')
    } catch { setEtat('error') }
  }

  return (
    <div className="pinline rise rise-scale">
      <div>
        <h3>Cinq nouvelles pépites<br />chaque mois.</h3>
        <p>Recevez-les en avant-première, avec le prix négocié et l’écart face au prix France. Pas de relance, rien d’autre.</p>
      </div>
      {etat === 'done' ? (
        <div>
          <p className="text-[18px] font-semibold" style={{ letterSpacing: '-0.02em' }}>C’est noté.</p>
          <p>Vous recevrez les prochaines pépites par e-mail. Une voiture précise en tête ? Répondez simplement au message de bienvenue.</p>
        </div>
      ) : (
        <form onSubmit={envoyer} noValidate>
          <label htmlFor="pi-email" className="sr-only">E-mail</label>
          <input id="pi-email" type="email" inputMode="email" autoComplete="email" className="field" placeholder="votre@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="pi-tel" className="sr-only">Téléphone (facultatif)</label>
          <input id="pi-tel" type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="Téléphone (facultatif)" value={tel} onChange={(e) => setTel(e.target.value)} />
          <input type="text" name="site" value={site} onChange={(e) => setSite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" className="btn-w w-full" disabled={!isEmail(email) || etat === 'sending'} style={!isEmail(email) ? { opacity: 0.7 } : undefined}>
            {etat === 'sending' ? 'Inscription…' : 'Recevoir les pépites du mois'} <Arrow />
          </button>
          {etat === 'error' && <small style={{ color: '#ffd7d7' }}>L’inscription n’a pas pu être enregistrée. Réessayez dans un instant ou appelez-nous.</small>}
          <small>Vos données ne servent qu’à vous envoyer les pépites. Désinscription en un clic.</small>
        </form>
      )}
    </div>
  )
}
