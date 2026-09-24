'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Arrow, Check } from '@/components/ui'
import Link from 'next/link'
import { VEHICULES, CATEGORIES, ETATS, PACKAGES, OPTIONS, FRAIS_IMPORT, prixImportTTC, tvaImport, prixAffiche, type Vehicule, type Categorie, type Etat } from '@/lib/catalogue'
import { SITE } from '@/lib/site'
import { euro } from '@/lib/malus'

const nom = (v: Vehicule) => `${v.marque} ${v.modele}${v.version ? ` ${v.version}` : ''}`
const etatLabel = (v: Vehicule) => (v.etat === 'occasion' ? 'Occasion · moins de 5 000 km' : ETATS[v.etat])
/* Marques dérivées des pépites du mois, pour la barre de filtres (les logos vivent dans le défilé du hero). */
const MARQUES = ['Toutes', ...Array.from(new Set(VEHICULES.map((v) => v.marque)))]

/* ── Carte pépite : même squelette que les cartes Zéro malus (photo, légende, badges), mais ses propres
   informations : prix TTC et sa composition, état, accès à la fiche. Aucun calcul de malus ici. ── */
function Carte({ v, onOpen, i }: { v: Vehicule; onOpen: () => void; i: number }) {
  const c = v.chiffres
  const prix = prixAffiche(v)
  return (
    <li className="pop" style={{ ['--d' as string]: `${Math.min(i, 8) * 0.04}s` }}>
      <article className="mcard pcard" onClick={onOpen}>
        <div className="mcard-media">
          {v.cover ? (
            <Image src={v.cover} alt={nom(v)} fill quality={80} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" style={{ objectPosition: v.coverPosition || 'center' }} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'radial-gradient(120% 120% at 20% 0%, #1c1c1c, #070707)' }}>
              <Image src={v.logo} alt={v.marque} width={200} height={40} unoptimized style={{ width: 150, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
            </div>
          )}
          <div className="mcard-veil" />
          <div className="mcard-cap">
            <small>{v.marque} · {CATEGORIES[v.categorie]}</small>
            <h3>{v.modele}{v.version ? ` ${v.version}` : ''}</h3>
          </div>
          <span className="mtag pep">Pépite du mois</span>
          <span className="mtag etat">{etatLabel(v)}</span>
        </div>
        <div className="pprice">
          <span>{prix ? 'Prix TTC, transport et formalités inclus' : 'Prix'}</span>
          <b className="num">{prix ? euro(prix) : 'Sur demande'}{prix && <em>TTC</em>}</b>
          <small>{prix ? (v.categorie === 'electrique' ? 'TVA française 20 % incluse · aucun malus' : 'TVA française 20 % incluse · hors malus') : 'Négociation en cours chez la concession partenaire'}</small>
        </div>
        {c ? (
          <div className="mrows">
            <div><span>Négocié en Allemagne, hors taxes</span><b>{euro(c.prixAllemagneHT)}</b></div>
            <div><span>Transport fermé et formalités</span><b>{euro(FRAIS_IMPORT)}</b></div>
            <div><span>TVA française 20 %</span><b>{euro(tvaImport(c))}</b></div>
          </div>
        ) : (
          <p className="pnote">{v.detail}</p>
        )}
        <div className="pfoot">
          <span>{v.etat === 'occasion' ? 'Inspection avant achat' : 'Options et covering au choix'}</span>
          <button type="button" className="lk" onClick={(e) => { e.stopPropagation(); onOpen() }} aria-label={`Voir la fiche ${nom(v)}`}>Voir la fiche <Arrow className="w-3.5 h-3.5" /></button>
        </div>
      </article>
    </li>
  )
}

/* ── Volet fiche + configurateur ── */
function Volet({ v, onClose }: { v: Vehicule; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const [opts, setOpts] = useState<string[]>([])
  const [souhaits, setSouhaits] = useState('')
  const nomV = nom(v)
  const qs = new URLSearchParams({ vehicule: nomV, package: 'import' })
  if (opts.length) qs.set('options', opts.join(','))
  if (souhaits.trim()) qs.set('souhaits', souhaits.trim().slice(0, 600))
  const contactHref = `/contact?${qs.toString()}`
  const P = PACKAGES.find((p) => p.id === 'import')!
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
    <div className="fixed inset-0 z-[120] overflow-hidden" role="dialog" aria-modal="true" aria-label={`Fiche ${nom(v)}`}>
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

          {/* Prix TTC et sa composition. La comparaison avec le prix France et le malus vivent dans le catalogue Zéro malus. */}
          {prixAffiche(v) && (
            <div className="card p-5 sm:p-6 mt-6">
              <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Prix TTC, transport et formalités inclus</p>
              <p className="display tabular leading-none mt-1" style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--blue-deep)' }}>{euro(prixAffiche(v)!)}<span className="text-[16px] font-medium" style={{ color: 'var(--ink-3)', letterSpacing: 0, marginLeft: 8 }}>TTC</span></p>
              <p className="text-[13px] mt-2" style={{ color: 'var(--ink-2)' }}>Véhicule négocié chez la concession partenaire, transport fermé privé, formalités d’immatriculation en France et TVA française incluses. Prix indicatif : la proposition personnalisée vous est adressée après un premier appel.</p>
              {v.chiffres && <div className="mrows mt-4">
                <div><span>Prix négocié en Allemagne, hors taxes</span><b>{euro(v.chiffres.prixAllemagneHT)}</b></div>
                <div><span>Transport fermé et formalités d’immatriculation</span><b>{euro(FRAIS_IMPORT)}</b></div>
                <div><span>TVA française 20 %</span><b>{euro(tvaImport(v.chiffres))}</b></div>
                <div className="tot"><span>Prix TTC</span><b>{euro(prixImportTTC(v.chiffres))}</b></div>
              </div>}
              {v.chiffres ? <p className="text-[12px] mt-3 leading-relaxed" style={{ color: 'var(--ink-3)' }}>Hors malus écologique, dû lors de l’immatriculation en France et propre à chaque modèle : <Link href="/simulateur#simulateur" className="underline underline-offset-2" style={{ color: 'var(--blue-deep)' }}>estimez-le dans le simulateur</Link>. CO₂ {v.chiffres.co2} g/km · {v.chiffres.masse.toLocaleString('fr-FR')} kg, données constructeur indicatives.</p> : <p className="text-[12px] mt-3 leading-relaxed" style={{ color: 'var(--ink-3)' }}>{v.categorie === 'electrique' ? 'Véhicule électrique : aucun malus écologique à l’immatriculation en France.' : 'Hors malus écologique, dû lors de l’immatriculation en France.'}</p>}
            </div>
          )}

          {/* Ce qui est inclus */}
          <div className="mt-6">
            <h3 className="text-[20px]">Import et immatriculation en France, tout est géré</h3>
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
  const setOpen = (id: string | null) => { setOpenIdState(id); router.replace(id ? `${pathname}?v=${id}#pepites` : `${pathname}#pepites`, { scroll: false }) }
  const cats = Array.from(new Set(VEHICULES.map((v) => v.categorie)))

  return (
    <div>
      <div className="ctools">
        <div className="grp brands" role="group" aria-label="Marque">
          {MARQUES.map((m) => (
            <button key={m} type="button" className="fchip" aria-pressed={marque === m} onClick={() => setMarque(m)}>
              {m === 'Toutes' ? 'Toutes les marques' : m}
            </button>
          ))}
        </div>
        <div className="grp">
          <div className="seg" role="radiogroup" aria-label="État">
            <button type="button" aria-pressed={etat === 'tous'} onClick={() => setEtat('tous')}>Tous</button>
            <button type="button" aria-pressed={etat === 'neuf'} onClick={() => setEtat('neuf')}>Neuf</button>
            <button type="button" aria-pressed={etat === 'occasion'} onClick={() => setEtat('occasion')}>Occasion</button>
          </div>
          <select className="field" style={{ width: 'auto' }} value={cat} onChange={(e) => setCat(e.target.value as typeof cat)} aria-label="Type de véhicule">
            <option value="toutes">Tous les types</option>
            {cats.map((c) => <option key={c} value={c}>{CATEGORIES[c]}</option>)}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="card p-8 text-center text-[15px]" style={{ color: 'var(--ink-2)' }}>Aucun modèle avec ces filtres. Décrivez-nous la voiture visée : on la trouve.</p>
      ) : (
        <ul key={`${marque}-${etat}-${cat}`} className="mcat list-none">
          {list.map((v, i) => <Carte key={v.id} v={v} i={i} onOpen={() => setOpen(v.id)} />)}
        </ul>
      )}
      <p className="text-[12.5px] mt-6" style={{ color: 'var(--ink-3)' }}>{list.length} pépite{list.length > 1 ? 's' : ''} ce mois-ci · Nous dénichons toute marque et tout modèle chez nos concessions partenaires en Allemagne.</p>

      {open && <Volet v={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
