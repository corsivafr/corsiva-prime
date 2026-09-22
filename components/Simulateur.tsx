'use client'

import { useEffect, useRef, useState } from 'react'
import { simuler, euro, type Energie, type Resultat, ANNEE_BAREME, PLAFOND_MALUS, SEUIL_CO2, SEUIL_MASSE } from '@/lib/malus'
import { Arrow } from '@/components/ui'
import { MODELES, MARQUES_MODELES, nomModele } from '@/lib/modeles'
import { SITE } from '@/lib/site'

/* Points de départ : les modèles à fort malus de lib/modeles.ts (prix relevés du brief ou indicatifs ;
   CO₂ et masse = données constructeur indicatives, à vérifier sur le certificat de conformité). */
const PRESETS = MODELES.map((m) => ({
  id: m.id, label: nomModele(m), marque: m.marque,
  prixFR: m.prixFranceTTC, prixDE: m.prixAllemagneHT, co2: m.co2, masse: m.masse, energie: m.energie, mois: m.occasionMois,
}))

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)
const isPhone = (s: string) => { const d = s.replace(/\D/g, ''); return d.length >= 9 && d.length <= 15 }

/* Compteur animé : de 0 à la valeur en 1,4 s, easing sortie. */
function Compteur({ value, active, className = '', style }: { value: number; active: boolean; className?: string; style?: React.CSSProperties }) {
  const [n, setN] = useState(0)
  const raf = useRef<number>()
  useEffect(() => {
    if (!active) { setN(0); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return }
    const t0 = performance.now(); const dur = 1400
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * e))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [value, active])
  return <span className={`tabular ${className}`} style={style}>{euro(n)}</span>
}

function Champ({ id, label, unit, value, onChange, min, max, step = 1, hint }: { id: string; label: string; unit: string; value: number; onChange: (n: number) => void; min: number; max: number; step?: number; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        <input id={id} type="number" inputMode="numeric" className="field pr-16 tabular" value={Number.isFinite(value) ? value : ''} min={min} max={max} step={step}
          onChange={(e) => onChange(e.target.value === '' ? NaN : Number(e.target.value))} />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] pointer-events-none" style={{ color: 'var(--ink-3)' }}>{unit}</span>
      </div>
      {hint && <p className="text-[12px] mt-1.5" style={{ color: 'var(--ink-3)' }}>{hint}</p>}
    </div>
  )
}

export default function Simulateur({ compact = false }: { compact?: boolean }) {
  const [preset, setPreset] = useState(PRESETS[0].id)
  const [marqueF, setMarqueF] = useState('Toutes')
  const [modele, setModele] = useState(PRESETS[0].label)
  const [prixFR, setPrixFR] = useState(PRESETS[0].prixFR)
  const [prixDE, setPrixDE] = useState(PRESETS[0].prixDE)
  const [co2, setCo2] = useState(PRESETS[0].co2)
  const [masse, setMasse] = useState(PRESETS[0].masse)
  const [energie, setEnergie] = useState<Energie>('thermique')
  const [occasion, setOccasion] = useState(false)
  const [mois, setMois] = useState(12)
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [site, setSite] = useState('')
  const [etat, setEtat] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [res, setRes] = useState<Resultat | null>(null)
  const [mailed, setMailed] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const applyPreset = (id: string) => {
    const p = PRESETS.find((x) => x.id === id); if (!p) return
    setPreset(id); setModele(p.label); setPrixFR(p.prixFR); setPrixDE(p.prixDE); setCo2(p.co2); setMasse(p.masse); setEnergie(p.energie)
    setOccasion(p.mois > 0); setMois(p.mois || 12); setEtat('idle'); setRes(null)
  }
  const edit = <T,>(setter: (v: T) => void) => (v: T) => { setter(v); setPreset(''); if (etat === 'done') { setEtat('idle'); setRes(null) } }

  /* Arrivée depuis le catalogue Zéro malus : /simulateur?modele=<id> pré-remplit le véhicule. */
  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get('modele')
      const p = id ? PRESETS.find((x) => x.id === id) : null
      if (p) { setMarqueF(p.marque); applyPreset(p.id) }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valid = [prixFR, prixDE, co2, masse].every((n) => Number.isFinite(n) && n >= 0) && prixFR > 0 && prixDE > 0
  const contactOk = isPhone(tel) && isEmail(email)
  const apercu = valid ? simuler({ prixFranceTTC: prixFR, prixAllemagneHT: prixDE, co2, masse, energie, occasionMois: occasion ? mois : 0 }) : null
  const shown = res ?? apercu
  const unlocked = etat === 'done' && !!res

  const lancer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || !contactOk || etat === 'sending') return
    setEtat('sending')
    const payload = { tel, email, site, modele, prixFranceTTC: prixFR, prixAllemagneHT: prixDE, co2, masse, energie, occasionMois: occasion ? mois : 0 }
    try {
      const r = await fetch('/api/simulation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const j = await r.json()
      if (!r.ok || !j.ok) throw new Error(j.error || 'erreur')
      setRes(j.resultat as Resultat); setMailed(!!j.mailed); setSendFailed(false); setEtat('done')
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    } catch {
      // Le calcul est local : on affiche le résultat, mais on dit clairement que la demande n'est pas partie.
      setRes(apercu); setMailed(false); setSendFailed(true); setEtat(apercu ? 'done' : 'error')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
      {/* ── Paramètres ── */}
      <form onSubmit={lancer} className="lg:col-span-7 card p-5 sm:p-7 flex flex-col gap-6" noValidate>
        <div>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="label mb-0">Partir d’un modèle à fort malus</p>
            <select className="field" style={{ width: 'auto', minHeight: 38, padding: '6px 34px 6px 12px', fontSize: 13 }} value={marqueF} onChange={(e) => setMarqueF(e.target.value)} aria-label="Filtrer les modèles par marque">
              {MARQUES_MODELES.map((m) => <option key={m} value={m}>{m === 'Toutes' ? 'Toutes les marques' : m}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 max-h-[168px] overflow-y-auto pr-1" role="listbox" aria-label="Modèles">
            {PRESETS.filter((p) => marqueF === 'Toutes' || p.marque === marqueF).map((p) => (
              <button key={p.id} type="button" role="option" aria-selected={preset === p.id} onClick={() => applyPreset(p.id)} className="btn min-h-[38px] text-[13px] px-3.5"
                style={preset === p.id ? { background: 'var(--ink)', color: 'var(--canvas)' } : { background: 'var(--surface-2)', color: 'var(--ink)', border: '1px solid var(--hairline)' }}>
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-[12px] mt-2" style={{ color: 'var(--ink-3)' }}>{PRESETS.length} modèles, prix relevés ou indicatifs : ajustez ensuite chaque valeur à votre configuration.</p>
        </div>

        <div>
          <label htmlFor="sim-modele" className="label">Véhicule</label>
          <input id="sim-modele" className="field" value={modele} onChange={(e) => edit(setModele)(e.target.value)} placeholder="Marque, modèle, finition" maxLength={80} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Champ id="sim-fr" label="Prix en France (TTC)" unit="€" value={prixFR} onChange={edit(setPrixFR)} min={1000} max={5_000_000} step={500} />
          <Champ id="sim-de" label="Prix en Allemagne (HT)" unit="€" value={prixDE} onChange={edit(setPrixDE)} min={1000} max={5_000_000} step={500} hint="Prix net, hors TVA allemande." />
          <Champ id="sim-co2" label="CO₂ WLTP" unit="g/km" value={co2} onChange={edit(setCo2)} min={0} max={600} hint={`Malus à partir de ${SEUIL_CO2} g/km en ${ANNEE_BAREME}.`} />
          <Champ id="sim-masse" label="Masse en ordre de marche" unit="kg" value={masse} onChange={edit(setMasse)} min={500} max={5000} step={5} hint={`Malus au poids à partir de ${SEUIL_MASSE} kg.`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="label">État</p>
            <div className="seg" role="group" aria-label="Neuf ou occasion">
              <button type="button" aria-pressed={!occasion} onClick={() => edit(setOccasion)(false)}>Neuf</button>
              <button type="button" aria-pressed={occasion} onClick={() => edit(setOccasion)(true)}>Occasion</button>
            </div>
          </div>
          <div>
            <label htmlFor="sim-energie" className="label">Énergie</label>
            <select id="sim-energie" className="field" value={energie} onChange={(e) => edit(setEnergie)(e.target.value as Energie)}>
              <option value="thermique">Thermique / hybride simple</option>
              <option value="hybride-rechargeable">Hybride rechargeable (&gt; 50 km)</option>
              <option value="electrique">Électrique</option>
            </select>
          </div>
        </div>

        {occasion && (
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="sim-mois" className="label">Ancienneté depuis la première immatriculation</label>
              <span className="text-[13px] font-medium tabular">{mois} mois</span>
            </div>
            <input id="sim-mois" type="range" min={1} max={192} value={mois} onChange={(e) => edit(setMois)(Number(e.target.value))} />
            <p className="text-[12px] mt-1.5" style={{ color: 'var(--ink-3)' }}>Le malus CO₂ d’une occasion importée est décoté selon l’âge (de 3 % à 100 % au-delà de 15 ans).</p>
          </div>
        )}

        {/* ── Déverrouillage : téléphone + e-mail ── */}
        <div className="rounded-[15px] p-4 sm:p-5" style={{ background: 'var(--surface-2)', border: '1px solid var(--hairline)' }}>
          <p className="text-[15px] font-semibold" style={{ letterSpacing: '-0.01em' }}>Lancer la simulation</p>
          <p className="text-[13px] mt-1" style={{ color: 'var(--ink-2)' }}>Un conseiller vous rappelle rapidement pour le valider avec vous.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <div>
              <label htmlFor="sim-tel" className="label">Téléphone</label>
              <input id="sim-tel" type="tel" inputMode="tel" autoComplete="tel" className="field" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="06 12 34 56 78" required />
            </div>
            <div>
              <label htmlFor="sim-email" className="label">E-mail</label>
              <input id="sim-email" type="email" inputMode="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" required />
            </div>
          </div>
          <input type="text" name="site" value={site} onChange={(e) => setSite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" className="btn-cta w-full mt-4" disabled={!valid || !contactOk || etat === 'sending'} style={!valid || !contactOk ? { opacity: 0.55, boxShadow: 'none' } : undefined}>
            {etat === 'sending' ? 'Calcul en cours…' : etat === 'done' ? 'Relancer la simulation' : 'Lancer la simulation'} <Arrow />
          </button>
          {!contactOk && (tel || email) && <p className="text-[12px] mt-2" style={{ color: 'var(--ink-3)' }}>Un téléphone et un e-mail valides sont nécessaires pour lancer le calcul.</p>}
          {etat === 'error' && <p className="text-[13px] mt-2" style={{ color: '#ef4444' }}>Vérifiez les valeurs saisies.</p>}
          <p className="text-[12px] mt-3 leading-relaxed" style={{ color: 'var(--ink-3)' }}>En lançant la simulation, vous acceptez d’être recontacté par Corsiva Prime au sujet de votre projet. Vos données ne sont jamais cédées.</p>
        </div>
      </form>

      {/* ── Résultat ── */}
      <div ref={resultRef} className="lg:col-span-5 flex flex-col gap-4">
        <div className={`spotlight p-6 sm:p-8 relative overflow-hidden ${unlocked ? '' : ''}`}>
          <p className="text-[13px] muted">Avantage total estimé</p>
          <div className={unlocked ? 'unlocked' : 'locked'} aria-hidden={!unlocked}>
            <Compteur value={shown?.avantageTotal ?? 0} active={unlocked} className="display block mt-2" style={{ fontSize: 'clamp(44px, 6vw, 64px)', lineHeight: 1 }} />
          </div>
          {!unlocked && (
            <p className="absolute left-6 right-6 sm:left-8 sm:right-8 text-[13.5px] font-medium" style={{ top: '52%', transform: 'translateY(-50%)' }}>
              Renseignez votre téléphone et votre e-mail pour révéler le montant.
            </p>
          )}
          <p className="text-[13px] mt-4 muted">{modele || 'Votre véhicule'} · {occasion ? `occasion, ${mois} mois` : 'neuf'} · barème {ANNEE_BAREME}</p>
          {unlocked && !sendFailed && <p className="text-[12.5px] mt-2 muted">{mailed ? 'Le détail vous a été envoyé par e-mail. ' : ''}Un conseiller vous rappelle rapidement.</p>}
          {unlocked && sendFailed && <p className="text-[12.5px] mt-2" style={{ color: '#ffd7d7' }}>Votre demande n’a pas pu être transmise. Appelez-nous au {SITE.phone} ou réessayez dans un instant.</p>}
        </div>

        <div className={`card p-6 sm:p-7 ${unlocked ? 'unlocked' : 'locked'}`} aria-hidden={!unlocked}>
          <p className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ink-2)' }}>Le détail, poste par poste</p>
          {[
            { k: 'Écart d’achat (France TTC − Allemagne HT)', v: shown?.ecartAchat ?? 0 },
            { k: 'TVA 20 % non supportée', v: shown?.tvaEvitee ?? 0 },
            { k: `Malus CO₂ ${ANNEE_BAREME}${shown?.decote ? ` · décote ${Math.round(shown.decote * 100)} %` : ''}`, v: shown?.malusCO2 ?? 0 },
            { k: 'Malus au poids', v: shown?.malusMasse ?? 0 },
          ].map((l) => (
            <div key={l.k} className="flex items-baseline justify-between gap-4 py-2.5 border-b" style={{ borderColor: 'var(--hairline)' }}>
              <span className="text-[13.5px]" style={{ color: 'var(--ink-2)' }}>{l.k}</span>
              <Compteur value={l.v} active={unlocked} className="text-[15px] font-medium" />
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <span className="text-[13.5px] font-medium">Malus total évité <span style={{ color: 'var(--ink-3)' }}>(plafond {euro(PLAFOND_MALUS)})</span></span>
            <Compteur value={shown?.malusTotal ?? 0} active={unlocked} className="text-[17px] font-semibold" style={{ color: 'var(--blue)' }} />
          </div>
          {shown && shown.malusCO2 + shown.malusMasse > PLAFOND_MALUS && (
            <p className="text-[12px] mt-1" style={{ color: 'var(--ink-3)' }}>Le cumul CO₂ + poids ({euro(shown.malusCO2 + shown.malusMasse)}) dépasse le plafond légal : il est ramené à {euro(PLAFOND_MALUS)}.</p>
          )}
        </div>

        {!compact && (
          <p className="text-[12px] leading-relaxed px-1" style={{ color: 'var(--ink-3)' }}>
            Simulation indicative et non contractuelle. Barème {ANNEE_BAREME} du malus à l’immatriculation (loi de finances n° 2025-127 du 14 février 2025 ; fiche service-public F35947) ; TVA de 20 % sur le prix d’achat hors taxes. Le montage effectif dépend de votre situation et est structuré avec nos avocats partenaires.
          </p>
        )}
      </div>
    </div>
  )
}
