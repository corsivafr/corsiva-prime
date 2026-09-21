'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Arrow, Check } from '@/components/ui'
import Link from 'next/link'
import { VEHICULES, MARQUES, CATEGORIES, ETATS, PACKAGES, OPTIONS, prixFinal, type Vehicule, type Categorie, type Etat } from '@/lib/catalogue'
import { SITE } from '@/lib/site'
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
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#0099ff', color: '#fff' }}>Pépite</span>
              <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{v.etat === 'occasion' ? 'Occasion · moins de 5 000 km' : ETATS[v.etat]}</span>
              <span className="text-[12px] font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(20,20,20,0.75)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}>{CATEGORIES[v.categorie]}</span>
            </div>
            <div className="absolute left-5 right-5 bottom-4">
              <p className="text-[12.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{v.marque}</p>
              <h3 className="display text-[26px] leading-none text-white" style={{ letterSpacing: '-0.03em' }}>{v.modele}{v.version ? ` ${v.version}` : ''}</h3>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <p className="text-[12px]" style={{ color: 'var(--ink-3)' }}>Tarif final client, tout compris</p>
            <p className="display tabular leading-none mt-1" style={{ fontSize: 'clamp(30px, 2.6vw, 36px)', color: 'var(--blue-deep)' }}>{r && v.chiffres ? euro(prixFinal(v.chiffres)) : 'Sur demande'}</p>
            {r && v.chiffres && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="rounded-[12px] px-3 py-2.5" style={{ background: 'var(--surface-1)' }}>
                  <p className="text-[12px] leading-tight" style={{ color: 'var(--ink-3)' }}>vs en France, malus inclus</p>
                  <p className="tabular text-[15px] font-semibold mt-1 line-through" style={{ textDecorationColor: 'rgba(10,10,10,0.35)' }}>{euro(v.chiffres.prixFranceTTC + r.malusTotal)}</p>
                </div>
                <div className="rounded-[12px] px-3 py-2.5" style={{ background: 'var(--blue-tint)' }}>
                  <p className="text-[12px] leading-tight" style={{ color: 'var(--blue-ink)' }}>Votre économie</p>
                  <p className="tabular text-[15px] font-semibold mt-1" style={{ color: 'var(--blue-deep)' }}>{euro(v.chiffres.prixFranceTTC + r.malusTotal - prixFinal(v.chiffres))}</p>
                </div>
              </div>
            )}
            <div className="flex items-end justify-between gap-3 mt-auto pt-5">
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{v.detail}</p>
              <span className="btn-w btn-sm flex-shrink-0">Fiche <Arrow /></span>
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
  const [opts, setOpts] = useState<string[]>([])
  const [souhaits, setSouhaits] = useState('')
  const r = v.chiffres ? simuler(v.chiffres) : null
  const final = v.chiffres ? prixFinal(v.chiffres) : null
  const coutFrance = v.chiffres && r ? v.chiffres.prixFranceTTC + r.malusTotal : null
  const nomV = nom(v)
  const qs = new URLSearchParams({ vehicule: nomV, package: 'import-immat' })
  if (opts.length) qs.set('options', opts.join(','))
  if (souhaits.trim()) qs.set('souhaits', souhaits.trim().slice(0, 600))
  const contactHref = `/contact?${qs.toString()}`
  const P = PACKAGES.find((p) => p.id === 'import-immat')!
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

          {/* Tarif final tout compris, face au coût en France */}
          {v.chiffres && r && final !== null && coutFrance !== null && (
            <div className="card p-5 sm:p-6 mt-6 bars-on">
              <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Tarif final client, tout compris</p>
              <p className="display tabular leading-none mt-1" style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--blue-deep)' }}>{euro(final)}</p>
              <p className="text-[13px] mt-2" style={{ color: 'var(--ink-2)' }}>Véhicule au prix négocié chez la concession partenaire, structure européenne, déplacement, transport fermé et immatriculation inclus. Sans malus ni TVA à supporter.</p>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="rounded-[14px] px-4 py-3.5" style={{ background: 'var(--surface-1)' }}>
                  <p className="text-[12px]" style={{ color: 'var(--ink-3)' }}>vs en France, malus inclus</p>
                  <p className="tabular text-[20px] font-semibold mt-1 line-through" style={{ textDecorationColor: 'rgba(10,10,10,0.35)' }}>{euro(coutFrance)}</p>
                  <p className="text-[12px] mt-0.5 tabular" style={{ color: 'var(--ink-3)' }}>{euro(v.chiffres.prixFranceTTC)} TTC + {euro(r.malusTotal)} de malus 2026{r.decote ? ` (décoté ${Math.round(r.decote * 100)} %, ancienneté retenue ${v.chiffres.occasionMois} mois)` : ''}</p>
                </div>
                <div className="rounded-[14px] px-4 py-3.5" style={{ background: 'var(--blue-tint)' }}>
                  <p className="text-[12px]" style={{ color: 'var(--blue-ink)' }}>Votre économie</p>
                  <p className="tabular text-[20px] font-semibold mt-1" style={{ color: 'var(--blue-deep)' }}>{euro(coutFrance - final)}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--blue-ink)' }}>par rapport à l’achat en France</p>
                </div>
              </div>
              <p className="text-[12px] mt-3" style={{ color: 'var(--ink-3)' }}>CO₂ {v.chiffres.co2} g/km · {v.chiffres.masse.toLocaleString('fr-FR')} kg (données constructeur indicatives). Tarif final indicatif, proposition personnalisée avant tout engagement.</p>
            </div>
          )}

          {/* Ce qui est inclus */}
          <div className="mt-6">
            <h3 className="text-[20px]">Tout est accompagné par Corsiva</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none">
              {P.items.map((it) => <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug"><Check blue /><span>{it}</span></li>)}
            </ul>
          </div>

          {/* Configuration au choix */}
          <div className="mt-8">
            <h3 className="text-[20px]">Configurez et optionnez votre véhicule</h3>
            <p className="text-[14px] mt-1.5" style={{ color: 'var(--ink-2)' }}>Couleur, jantes, intérieur, packs : vous choisissez, nous validons chaque détail avec la concession partenaire et négocions le deal.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {OPTIONS.map((o) => (
                <button key={o.id} type="button" className="opt" aria-pressed={opts.includes(o.id)} onClick={() => setOpts((x) => (x.includes(o.id) ? x.filter((y) => y !== o.id) : [...x, o.id]))}>
                  <span className="box" aria-hidden="true"><svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg></span>
                  <span><span className="block text-[14.5px] font-semibold leading-snug">{o.name}</span><span className="block text-[12.5px] mt-0.5" style={{ color: 'var(--ink-2)' }}>{o.text}</span></span>
                </button>
              ))}
            </div>
            <label htmlFor="souhaits" className="label mt-4">Vos souhaits de configuration</label>
            <textarea id="souhaits" className="field min-h-[96px] resize-y" placeholder="Couleur, jantes, sellerie, packs, équipements…" value={souhaits} onChange={(e) => setSouhaits(e.target.value)} maxLength={600} />
          </div>

          {/* Demander */}
          <div className="mt-6 flex flex-col gap-2.5">
            <Link href={contactHref} className="btn-cta w-full">Demander cette pépite <Arrow /></Link>
            <div className="grid grid-cols-2 gap-2.5">
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w w-full">Prendre un appel</a>
              <a href={SITE.phoneTel} className="btn-dark w-full">{SITE.phone}</a>
            </div>
            <p className="text-[12px] leading-relaxed text-center" style={{ color: 'var(--ink-3)' }}>Un conseiller vous rappelle rapidement pour valider la configuration et vous adresser la proposition.</p>
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
      <p className="text-[12.5px] mt-6" style={{ color: 'var(--ink-3)' }}>{list.length} pépite{list.length > 1 ? 's' : ''} ce mois-ci · Nous dénichons toute marque et tout modèle chez nos concessions partenaires en Allemagne.</p>

      {open && <Volet v={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
