'use client'

import { useState } from 'react'
import { Arrow } from '@/components/ui'

const SERVICES = ['Import depuis l’Allemagne', 'Import + immatriculation européenne', 'Immatriculation européenne seule', 'Je ne sais pas encore']

export default function ContactForm() {
  const [f, setF] = useState({ nom: '', tel: '', email: '', service: SERVICES[1], projet: '', site: '' })
  const [etat, setEtat] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (etat === 'sending') return
    setEtat('sending')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const j = await r.json()
      if (!r.ok || !j.ok) throw new Error()
      setEtat('done')
    } catch { setEtat('error') }
  }

  if (etat === 'done') {
    return (
      <div className="card p-8 text-center">
        <span className="inline-flex w-12 h-12 rounded-full items-center justify-center" style={{ background: 'var(--blue-tint)' }} aria-hidden="true">
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="#0045ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
        </span>
        <h3 className="text-[22px] mt-4">Message bien reçu.</h3>
        <p className="text-[15px] mt-2" style={{ color: 'var(--ink-2)' }}>Un conseiller vous rappelle sous 24 h, 7j/7 de 9h à 18h.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-7 flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label htmlFor="c-nom" className="label">Nom</label><input id="c-nom" className="field" value={f.nom} onChange={set('nom')} autoComplete="name" required maxLength={80} /></div>
        <div><label htmlFor="c-tel" className="label">Téléphone</label><input id="c-tel" type="tel" inputMode="tel" className="field" value={f.tel} onChange={set('tel')} autoComplete="tel" placeholder="06 12 34 56 78" required /></div>
        <div><label htmlFor="c-email" className="label">E-mail</label><input id="c-email" type="email" inputMode="email" className="field" value={f.email} onChange={set('email')} autoComplete="email" required /></div>
        <div>
          <label htmlFor="c-service" className="label">Service</label>
          <select id="c-service" className="field" value={f.service} onChange={set('service')}>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
      </div>
      <div>
        <label htmlFor="c-projet" className="label">Votre projet</label>
        <textarea id="c-projet" className="field min-h-[130px] resize-y" value={f.projet} onChange={set('projet')} placeholder="Modèle visé, budget, calendrier, neuf ou occasion…" maxLength={2000} />
      </div>
      <input type="text" name="site" value={f.site} onChange={set('site')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="btn btn-primary w-full sm:w-auto sm:self-start" disabled={etat === 'sending'}>
        {etat === 'sending' ? 'Envoi…' : 'Envoyer mon projet'} <Arrow />
      </button>
      {etat === 'error' && <p className="text-[13px]" style={{ color: '#ef4444' }}>Vérifiez le nom, le téléphone et l’e-mail, puis réessayez.</p>}
      <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>Vos données servent uniquement à traiter votre demande. Elles ne sont jamais cédées.</p>
    </form>
  )
}
