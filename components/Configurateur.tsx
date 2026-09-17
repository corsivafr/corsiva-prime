'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Arrow, Check } from '@/components/ui'
import { PACKAGES, OPTIONS, VEHICULES, type PackageId, type Vehicule } from '@/lib/catalogue'
import { simuler, euro } from '@/lib/malus'
import { SITE } from '@/lib/site'

/* Configurateur de package : un service (Import / Import + immatriculation), des options, et le
   récapitulatif qui suit — délai, inclusions, avantage estimé quand le véhicule est chiffré.
   Aucun prix de prestation n'est affiché : la proposition est personnalisée (brief). */
export default function Configurateur({ vehicule, allowVehicule = false, defaultPackage = 'import-immat', stacked = false }: { vehicule?: Vehicule; allowVehicule?: boolean; defaultPackage?: PackageId; stacked?: boolean }) {
  const [pkg, setPkg] = useState<PackageId>(defaultPackage)
  const [opts, setOpts] = useState<string[]>([])
  const [vehId, setVehId] = useState<string>(vehicule?.id ?? '')
  const v = vehicule ?? VEHICULES.find((x) => x.id === vehId)
  const P = PACKAGES.find((p) => p.id === pkg)!

  const toggle = (id: string) => setOpts((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))

  const r = useMemo(() => (v?.chiffres ? simuler(v.chiffres) : null), [v])
  const avantage = r ? (pkg === 'import' ? r.ecartAchat : r.avantageTotal) : null
  const label = v ? `${v.marque} ${v.modele}${v.version ? ` ${v.version}` : ''}` : ''
  const optNames = OPTIONS.filter((o) => opts.includes(o.id)).map((o) => o.name)

  const qs = new URLSearchParams()
  if (label) qs.set('vehicule', label)
  qs.set('package', pkg)
  if (opts.length) qs.set('options', opts.join(','))
  const contactHref = `/contact?${qs.toString()}`
  const wa = `https://wa.me/33780997692?text=${encodeURIComponent(`Bonjour, je souhaite une proposition Corsiva Prime${label ? ` pour une ${label}` : ''} — package ${P.name}${optNames.length ? ` — options : ${optNames.join(', ')}` : ''}.`)}`

  return (
    <div className={`grid grid-cols-1 gap-5 ${stacked ? '' : 'lg:grid-cols-12'}`}>
      <div className={`flex flex-col gap-5 ${stacked ? '' : 'lg:col-span-7'}`}>
        {allowVehicule && !vehicule && (
          <div>
            <label htmlFor="cfg-veh" className="label">Véhicule</label>
            <select id="cfg-veh" className="field" value={vehId} onChange={(e) => setVehId(e.target.value)}>
              <option value="">Un autre modèle, à définir ensemble</option>
              {VEHICULES.map((x) => <option key={x.id} value={x.id}>{x.marque} {x.modele}{x.version ? ` ${x.version}` : ''}{x.chiffres ? '' : ' — sur demande'}</option>)}
            </select>
          </div>
        )}

        <div>
          <p className="label">Le service</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Choix du package">
            {PACKAGES.map((p) => {
              const on = p.id === pkg
              return (
                <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => setPkg(p.id)}
                  className="text-left rounded-[20px] p-5 transition-all"
                  style={{ border: `1px solid ${on ? 'var(--blue-deep)' : 'var(--hairline)'}`, background: on ? 'rgba(0,69,255,0.06)' : 'var(--surface-1)', boxShadow: on ? '0 0 0 4px rgba(0,69,255,0.08)' : 'none' }}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[16px] font-semibold leading-snug">{p.name}</p>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 inline-flex items-center justify-center" style={{ border: `1.5px solid ${on ? 'var(--blue-deep)' : 'var(--hairline)'}` }} aria-hidden="true">
                      {on && <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--blue-deep)' }} />}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed mt-2" style={{ color: 'var(--ink-2)' }}>{p.accroche}</p>
                  <p className="text-[12.5px] font-medium mt-3" style={{ color: 'var(--blue-deep)' }}>{p.duree}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="label">Les options</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPTIONS.map((o) => (
              <button key={o.id} type="button" className="opt" aria-pressed={opts.includes(o.id)} onClick={() => toggle(o.id)}>
                <span className="box" aria-hidden="true"><svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg></span>
                <span><span className="block text-[14.5px] font-semibold leading-snug">{o.name}</span><span className="block text-[12.5px] mt-0.5" style={{ color: 'var(--ink-2)' }}>{o.text}</span></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Récapitulatif ── */}
      <div className={stacked ? '' : 'lg:col-span-5'}>
        <div key={pkg} className={`spotlight p-6 sm:p-7 pop ${stacked ? '' : 'lg:sticky lg:top-28'}`}>
          <p className="text-[12.5px] muted">Votre package</p>
          <p className="display text-[26px] sm:text-[30px] leading-[1.02] mt-1" style={{ letterSpacing: '-0.03em' }}>{P.name}</p>
          {label && <p className="text-[14px] mt-2 muted">{label}{v?.etat === 'occasion' ? ' · occasion' : ''}</p>}

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="rounded-[15px] p-3.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p className="text-[11.5px] muted">Délai indicatif</p>
              <p className="text-[15px] font-semibold mt-0.5">{P.duree}</p>
            </div>
            <div className="rounded-[15px] p-3.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p className="text-[11.5px] muted">Options</p>
              <p className="text-[15px] font-semibold mt-0.5">{opts.length === 0 ? 'Aucune' : `${opts.length} retenue${opts.length > 1 ? 's' : ''}`}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[20px] p-5" style={{ background: 'rgba(0,0,0,0.22)' }}>
            <p className="text-[12.5px] muted">{pkg === 'import' ? 'Avantage estimé (écart de prix)' : 'Avantage estimé (écart + TVA + malus)'}</p>
            {avantage !== null ? (
              <>
                <p className="display tabular text-[40px] sm:text-[46px] leading-none mt-2">{euro(avantage)}</p>
                {r && pkg === 'import-immat' && (
                  <p className="text-[12.5px] mt-2 muted">dont {euro(r.tvaEvitee)} de TVA et {euro(r.malusTotal)} de malus non supportés</p>
                )}
                {r && pkg === 'import' && (
                  <p className="text-[12.5px] mt-2 muted">En immatriculant en France, le malus ({euro(r.malusTotal)}) et la TVA ({euro(r.tvaEvitee)}) restent dus.</p>
                )}
              </>
            ) : (
              <p className="display text-[26px] leading-tight mt-2">Chiffrage sur demande</p>
            )}
          </div>

          <ul className="mt-5 flex flex-col gap-2 list-none">
            {P.items.map((it, k) => (
              <li key={it} className="pop flex items-start gap-2.5 text-[13.5px] leading-snug" style={{ ['--d' as string]: `${0.05 * k}s` }}>
                <span className="flex-shrink-0 w-4.5 h-4.5 w-[18px] h-[18px] rounded-full inline-flex items-center justify-center mt-0.5" style={{ background: 'rgba(255,255,255,0.22)' }} aria-hidden="true">
                  <svg viewBox="0 0 20 20" className="w-2.5 h-2.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
                </span>
                <span>{it}</span>
              </li>
            ))}
            {optNames.map((n) => (
              <li key={n} className="pop flex items-start gap-2.5 text-[13.5px] leading-snug"><span className="flex-shrink-0 w-[18px] h-[18px] rounded-full inline-flex items-center justify-center mt-0.5" style={{ background: '#fff' }} aria-hidden="true"><svg viewBox="0 0 20 20" className="w-2.5 h-2.5" fill="none" stroke="#0045ff" strokeWidth="2.6" strokeLinecap="round"><path d="M10 4v12M4 10h12" /></svg></span><span>{n}</span></li>
            ))}
          </ul>

          <div className="flex flex-col gap-2.5 mt-6">
            <Link href={contactHref} className="btn btn-primary w-full">Demander ce package <Arrow /></Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn w-full" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.28)' }}>Envoyer sur WhatsApp</a>
          </div>
          <p className="text-[11.5px] mt-4 leading-relaxed muted">Proposition personnalisée sous 48 h, indexée sur la valeur réellement créée. Avantage indicatif, non contractuel (barème 2026).</p>
        </div>
      </div>
    </div>
  )
}
