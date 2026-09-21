'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Configurateur from '@/components/Configurateur'
import { Arrow } from '@/components/ui'
import { VEHICULES, MARQUES, CATEGORIES, ETATS, type Vehicule, type Categorie, type Etat } from '@/lib/catalogue'
import { simuler, euro } from '@/lib/malus'

const nom = (v: Vehicule) => `${v.marque} ${v.modele}${v.version ? ` ${v.version}` : ''}`

/* ── Carte véhicule ── */
function Carte({ v, onOpen, i }: { v: Vehicule; onOpen: () => void; i: number }) {
  const r = v.chiffres ? simuler(v.chiffres) : null
  return (
    <li className="pop" style={{ ['--d' as string]: `${0.05 * i}s` }}>
      <div className="h-full rounded-[24px]">
        <button type="button" onClick={onOpen} className="card lift group text-left w-full h-full overflow-hidden rounded-[24px] flex flex-col">
          <div className="relative" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
            {v.cover ? (
              <Image src={v.cover} alt={nom(v)} fill quality={82} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]" style={{ objectPosition: v.coverPosition, transitionTimingFunction: 'var(--ease)' }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(120% 120% at 20% 0%, #1c1c1c, #070707)' }}>
                <Image src={v.logo} alt={v.marque} width={200} height={40} unoptimized style={{ width: 150, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
              </div>
            )}
            <div className="absolute inset-0 photo-veil" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{v.etat === 'occasion' ? 'Occasion · moins de 5 000 km' : ETATS[v.etat]}</span>
              <span className="text-[12px] font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(20,20,20,0.75)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}>{CATEGORIES[v.categorie]}</span>
            </div>
            <div className="absolute left-5 right-5 bottom-4">
              <p className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{v.marque}</p>
              <h3 className="display text-[26px] leading-none text-white" style={{ letterSpacing: '-0.03em' }}>{v.modele}{v.version ? ` ${v.version}` : ''}</h3>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{v.detail}</p>
            <div className="flex items-end justify-between gap-3 mt-auto pt-5">
              <div>
                <p className="text-[12px]" style={{ color: 'var(--ink-3)' }}>{r ? 'Avantage estimé' : 'Chiffrage'}</p>
                <p className="display tabular text-[26px] leading-none mt-1" style={{ color: 'var(--blue-deep)' }}>{r ? euro(r.avantageTotal) : 'Sur demande'}</p>
              </div>
              <span className="btn-w btn-sm">Fiche <Arrow /></span>
            </div>
          </div>
        </button>
      </div>
    </li>
  )
}

/* ── Volet fiche + configurateur ── */
function Volet({ v, onClose }: { v: Vehicule; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const r = v.chiffres ? simuler(v.chiffres) : null
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); opener?.focus?.() }
  }, [onClose])
  useEffect(() => { setIdx(0) }, [v.id])
  const photo = v.photos[idx]

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`Fiche ${nom(v)}`}>
      <button type="button" className="drawer-veil absolute inset-0" style={{ background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(6px)' }} onClick={onClose} aria-label="Fermer" />
      <div className="drawer light absolute inset-x-0 bottom-0 top-3 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[min(720px,92vw)] rounded-t-[24px] lg:rounded-none lg:rounded-l-[30px] overflow-y-auto" style={{ background: 'var(--light)' }}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 py-3.5" style={{ background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--hairline)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <Image src={v.logo} alt={v.marque} width={80} height={24} unoptimized style={{ width: 'auto', height: 20, filter: 'brightness(0)', opacity: 0.85 }} />
            <span className="text-[14px] font-semibold truncate">{nom(v)}</span>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="w-10 h-10 rounded-full inline-flex items-center justify-center" style={{ background: 'var(--surface-2)' }} aria-label="Fermer la fiche">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="px-5 sm:px-7 pb-10">
          {/* Galerie */}
          <div className="relative overflow-hidden rounded-[20px] mt-5" style={{ aspectRatio: '16 / 10', background: '#0a0a0a' }}>
            {photo ? (
              <Image key={photo} src={photo} alt={nom(v)} fill quality={86} sizes="(max-width: 1023px) 100vw, 720px" className="object-cover pop" priority />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: 'radial-gradient(120% 120% at 20% 0%, #1c1c1c, #070707)' }}>
                <Image src={v.logo} alt={v.marque} width={200} height={40} unoptimized style={{ width: 180, height: 'auto', filter: 'brightness(0) invert(1)' }} />
                <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Photos du véhicule sélectionné transmises à la présélection</p>
              </div>
            )}
            <span className="absolute top-4 left-4 text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{ETATS[v.etat]}</span>
          </div>
          {v.photos.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {v.photos.map((p, k) => (
                <button key={p} type="button" onClick={() => setIdx(k)} className="relative flex-shrink-0 w-20 h-14 rounded-[10px] overflow-hidden transition-opacity" style={{ opacity: k === idx ? 1 : 0.55, outline: k === idx ? '2px solid var(--blue-deep)' : 'none', outlineOffset: 2 }} aria-label={`Photo ${k + 1}`}>
                  <Image src={p} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6">
            <h2 className="display" style={{ fontSize: 'clamp(30px, 4vw, 44px)' }}>{v.modele}{v.version ? ` ${v.version}` : ''}</h2>
            <p className="text-[15px] leading-relaxed mt-2" style={{ color: 'var(--ink-2)' }}>{v.detail}</p>
            <ul className="flex flex-wrap gap-2 mt-4 list-none">
              {v.points.map((p) => <li key={p} className="text-[12.5px] font-medium px-3 py-1.5 rounded-full" style={{ background: 'var(--blue-tint)', color: 'var(--blue-ink)' }}>{p}</li>)}
            </ul>
          </div>

          {/* Chiffres */}
          {v.chiffres && r && (
            <div className="card p-5 mt-6 bars-on">
              <p className="text-[13px] font-semibold mb-3">Le coût réel, relevé chez nos concessions partenaires</p>
              <div className="flex items-baseline justify-between text-[13px]"><span style={{ color: 'var(--ink-2)' }}>Coût en France, <b style={{ color: 'var(--ink)' }}>malus inclus</b></span><span className="tabular font-semibold">{euro(v.chiffres.prixFranceTTC + r.malusTotal)}</span></div>
              <p className="text-[12px] mt-0.5 tabular" style={{ color: 'var(--ink-3)' }}>{euro(v.chiffres.prixFranceTTC)} TTC + {euro(r.malusTotal)} de malus 2026{r.decote ? ` (décoté ${Math.round(r.decote * 100)} %, ancienneté retenue ${v.chiffres.occasionMois} mois)` : ''}</p>
              <div className="bar mt-1.5"><span className="bar-fill" style={{ ['--w' as string]: '100%', background: 'var(--ink)' }} /></div>
              <div className="flex items-baseline justify-between text-[13px] mt-3"><span style={{ color: 'var(--ink-2)' }}>Prix en Allemagne, <b style={{ color: 'var(--blue-deep)' }}>hors taxes</b></span><span className="tabular font-semibold" style={{ color: 'var(--blue-deep)' }}>{euro(v.chiffres.prixAllemagneHT)}</span></div>
              <div className="bar mt-1.5"><span className="bar-fill" style={{ ['--w' as string]: `${Math.round((v.chiffres.prixAllemagneHT / (v.chiffres.prixFranceTTC + r.malusTotal)) * 100)}%`, background: 'var(--blue-deep)' }} /></div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[{ k: 'Écart de prix', v: euro(r.ecartAchat) }, { k: 'Malus évité', v: euro(r.malusTotal) }, { k: 'TVA 20 % évitée', v: euro(r.tvaEvitee) }].map((x) => (
                  <div key={x.k} className="rounded-[12px] px-3 py-2.5" style={{ background: 'var(--surface-1)' }}>
                    <p className="text-[12px] leading-tight" style={{ color: 'var(--ink-3)' }}>{x.k}</p>
                    <p className="tabular text-[14px] font-semibold mt-0.5">{x.v}</p>
                  </div>
                ))}
              </div>
              <p className="text-[12px] mt-3" style={{ color: 'var(--ink-3)' }}>CO₂ {v.chiffres.co2} g/km · {v.chiffres.masse.toLocaleString('fr-FR')} kg (données constructeur indicatives){v.chiffres.occasionMois ? ` · ancienneté retenue : ${v.chiffres.occasionMois} mois (hypothèse, à confirmer sur le véhicule)` : ''}</p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="display text-[26px] sm:text-[30px]" style={{ letterSpacing: '-0.03em' }}>Composez votre package</h3>
            <p className="text-[14px] mt-1.5 mb-5" style={{ color: 'var(--ink-2)' }}>Le service, les options, et l’avantage qui en découle. La proposition suit rapidement.</p>
            <Configurateur vehicule={v} stacked />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Catalogue : filtres, grille, volet ── */
export default function Catalogue({ openId: initialOpen }: { openId?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [openId, setOpenIdState] = useState<string | null>(initialOpen ?? null)
  useEffect(() => { setOpenIdState(initialOpen ?? null) }, [initialOpen])
  const open = openId ? VEHICULES.find((x) => x.id === openId) : undefined

  const [marque, setMarque] = useState<string>('Toutes')
  const [etat, setEtat] = useState<'tous' | Etat>('tous')
  const [cat, setCat] = useState<'toutes' | Categorie>('toutes')

  const list = useMemo(() => VEHICULES.filter((v) => (marque === 'Toutes' || v.marque === marque) && (etat === 'tous' || v.etat === etat) && (cat === 'toutes' || v.categorie === cat)), [marque, etat, cat])
  const setOpen = (id: string | null) => { setOpenIdState(id); router.replace(id ? `${pathname}?v=${id}` : pathname, { scroll: false }) }
  const cats = Array.from(new Set(VEHICULES.map((v) => v.categorie)))

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} aria-pressed={on} className="btn min-h-[40px] px-4 text-[13px]" style={on ? { background: 'var(--ink)', color: 'var(--canvas)' } : { background: 'var(--surface-1)', color: 'var(--ink)', border: '1px solid var(--hairline)' }}>{children}</button>
  )

  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] w-16" style={{ color: 'var(--ink-3)' }}>Marque</span>
          {MARQUES.map((m) => <Chip key={m} on={marque === m} onClick={() => setMarque(m)}>{m}</Chip>)}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] w-16" style={{ color: 'var(--ink-3)' }}>État</span>
          <Chip on={etat === 'tous'} onClick={() => setEtat('tous')}>Tous</Chip>
          <Chip on={etat === 'neuf'} onClick={() => setEtat('neuf')}>Neuf</Chip>
          <Chip on={etat === 'occasion'} onClick={() => setEtat('occasion')}>Occasion</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12.5px] w-16" style={{ color: 'var(--ink-3)' }}>Type</span>
          <Chip on={cat === 'toutes'} onClick={() => setCat('toutes')}>Tous</Chip>
          {cats.map((c) => <Chip key={c} on={cat === c} onClick={() => setCat(c)}>{CATEGORIES[c]}</Chip>)}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="card p-8 text-center text-[15px]" style={{ color: 'var(--ink-2)' }}>Aucun modèle avec ces filtres. Décrivez-nous la voiture visée : on la trouve.</p>
      ) : (
        <ul key={`${marque}-${etat}-${cat}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
          {list.map((v, i) => <Carte key={v.id} v={v} i={i} onOpen={() => setOpen(v.id)} />)}
        </ul>
      )}
      <p className="text-[12.5px] mt-6" style={{ color: 'var(--ink-3)' }}>{list.length} modèle{list.length > 1 ? 's' : ''} · Le catalogue présente les modèles les plus demandés : nous sourçons toute marque et tout modèle disponible chez nos concessions partenaires en Allemagne.</p>

      {open && <Volet v={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
