'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CountUp from '@/components/fx/CountUp'
import { Arrow, Check } from '@/components/ui'
import { FICHES, CATS_ACQ, MARQUES_ACQ, LOGOS_ACQ, FORFAIT_PRIME, OPTION_COVERING, GESTION_STRUCTURE_MOIS, nomFiche, budgetPrime, economieNette, type Fiche } from '@/lib/acquisitions'
import { SITE } from '@/lib/site'
import { euro } from '@/lib/malus'

/* Le catalogue « Zéro malus » : les neuf fiches d'acquisition de Corsiva Prime (septembre 2026).
   Cartes sur le squelette .mcard des pépites ; la fiche s'ouvre dans un volet, comme sur la page Import.
   Tous les montants viennent de lib/acquisitions.ts (les propositions d'acquisition), rien n'est recalculé
   sauf le budget « véhicule + forfait » et l'économie nette. */

type Tri = 'ecart' | 'prix' | 'part'
const km = (n: number) => `${n.toLocaleString('fr-FR')} km`

/* ── Carte ── */
function Carte({ f, i, compact, onOpen }: { f: Fiche; i: number; compact: boolean; onOpen: () => void }) {
  const p = f.photos[0]
  const body = (
    <>
      <div className="mcard-media">
        <Image src={p.src} alt={p.alt} fill quality={82} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" style={{ objectPosition: p.pos || 'center' }} />
        <div className="mcard-veil" />
        <div className="mcard-cap">
          <small>{f.marque} · {CATS_ACQ[f.cat]} · {f.annee}</small>
          <h3>{f.modele}</h3>
        </div>
        <span className="mtag pep">Fiche d’acquisition</span>
        <span className="mtag etat">{km(f.fiche.km)} · {f.fiche.circulation}</span>
      </div>
      <div className="pprice">
        <span>Prix Allemagne, hors taxes</span>
        <b className="num">≈ {euro(f.prixAllemagneHT)}</b>
        <small>TVA récupérable · facturé hors taxes à la structure européenne</small>
      </div>
      <div className="mrows">
        <div><span>Prix France équivalent, malus compris</span><b>{euro(f.prixFranceTTC)}</b></div>
        <div><span>Forfait Corsiva Prime, tout inclus</span><b>{euro(FORFAIT_PRIME)}</b></div>
      </div>
      <div className="mecon">
        <span>Écart de prix constaté</span>
        <b className="num">≈ {euro(f.ecart)}</b>
      </div>
      <div className="pfoot">
        <span>{f.part} % du prix français</span>
        {compact ? (
          <span className="lk">Voir la fiche <Arrow className="w-3.5 h-3.5" /></span>
        ) : (
          <button type="button" className="lk" onClick={(e) => { e.stopPropagation(); onOpen() }} aria-label={`Voir la fiche ${nomFiche(f)}`}>Voir la fiche <Arrow className="w-3.5 h-3.5" /></button>
        )}
      </div>
    </>
  )
  return (
    <li className="pop" style={{ ['--d' as string]: `${Math.min(i, 8) * 0.04}s` }}>
      {compact ? (
        <Link href={`/immatriculation?fiche=${f.id}#catalogue`} className="mcard pcard" aria-label={`Fiche d’acquisition ${nomFiche(f)}`}>{body}</Link>
      ) : (
        <article className="mcard pcard" onClick={onOpen}>{body}</article>
      )}
    </li>
  )
}

/* ── Volet fiche d'acquisition (même dessin que la fiche pépite de la page Import) ── */
function Volet({ f, onClose }: { f: Fiche; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const [covering, setCovering] = useState(false)
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
  useEffect(() => { setIdx(0); setCovering(false) }, [f.id])
  const photo = f.photos[idx] ?? f.photos[0]
  const nom = nomFiche(f)
  const qs = new URLSearchParams({ vehicule: `${nom} ${f.annee} (fiche ${f.ref})`, package: 'import-immat' })
  if (covering) qs.set('options', 'covering')
  const contactHref = `/contact?${qs.toString()}`
  const total = budgetPrime(f, covering)
  const nette = economieNette(f, covering)
  const logo = LOGOS_ACQ[f.marque]

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden" role="dialog" aria-modal="true" aria-label={`Fiche d’acquisition ${nom}`}>
      <button type="button" className="drawer-veil absolute inset-0" style={{ background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(6px)' }} onClick={onClose} aria-label="Fermer" />
      <div className="drawer light absolute inset-x-0 bottom-0 top-3 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[min(760px,92vw)] rounded-t-[24px] lg:rounded-none lg:rounded-l-[30px] overflow-y-auto" style={{ background: 'var(--light)', color: 'var(--night)' }}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 py-3.5" style={{ background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--hairline)' }}>
          <div className="flex items-center gap-3 min-w-0">
            {logo && <Image src={logo} alt={f.marque} width={80} height={24} unoptimized style={{ width: 'auto', height: 20, filter: 'brightness(0)', opacity: 0.85 }} />}
            <span className="text-[14px] font-semibold truncate">{nom} · {f.annee}</span>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="w-10 h-10 rounded-full inline-flex items-center justify-center" style={{ background: 'var(--surface-2)' }} aria-label="Fermer la fiche">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="px-5 sm:px-7 pb-10">
          {/* Galerie HD */}
          <div className="relative overflow-hidden rounded-[20px] mt-5" style={{ aspectRatio: '16 / 10', background: '#0a0a0a' }}>
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill quality={88} sizes="(max-width: 1023px) 100vw, 760px" className="object-cover pop" style={{ objectPosition: photo.pos || 'center' }} priority />
            <span className="absolute top-4 left-4 text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: '#007acc', color: '#fff' }}>Fiche d’acquisition · {f.ref}</span>
            <span className="absolute top-4 right-4 text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>{f.fiche.etat}</span>
          </div>
          {f.photos.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {f.photos.map((p, k) => (
                <button key={p.src} type="button" onClick={() => setIdx(k)} className="relative flex-shrink-0 w-24 h-16 rounded-[10px] overflow-hidden transition-opacity" style={{ opacity: k === idx ? 1 : 0.55, outline: k === idx ? '2px solid var(--blue-deep)' : 'none' }} aria-label={`Photo ${k + 1} sur ${f.photos.length}`} aria-pressed={k === idx}>
                  <Image src={p.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Véhicule */}
          <div className="mt-6">
            <p className="text-[12.5px] font-medium" style={{ color: 'var(--blue-deep)' }}>{f.marque} · {CATS_ACQ[f.cat]} · {f.annee}</p>
            <h2 className="display mt-1" style={{ fontSize: 'clamp(30px, 4vw, 44px)' }}>{f.modele}</h2>
            <p className="text-[14px] mt-2" style={{ color: 'var(--ink-3)' }}>{f.titre}</p>
            <p className="text-[15px] leading-relaxed mt-3" style={{ color: 'var(--ink-2)' }}>{f.texte}</p>
            <p className="text-[14px] leading-relaxed mt-3"><b>Référence identifiée :</b> {f.reference}</p>
            {f.options.length > 0 && (
              <ul className="flex flex-wrap gap-2 mt-4 list-none">
                {f.options.map((o) => <li key={o} className="text-[12.5px] font-medium px-3 py-1.5 rounded-full" style={{ background: 'var(--blue-tint)', color: 'var(--blue-ink)' }}>{o}</li>)}
              </ul>
            )}
          </div>

          {/* Fiche de référence */}
          <div className="card p-5 sm:p-6 mt-6">
            <h3 className="text-[18px]">Fiche de référence</h3>
            <div className="fiche-grid mt-3">
              <div><span>Motorisation</span><b>{f.fiche.motorisation}</b></div>
              <div><span>Transmission</span><b>{f.fiche.transmission}</b></div>
              <div><span>0 à 100 km/h</span><b>{f.fiche.zeroCent}</b></div>
              <div><span>1re circulation</span><b>{f.fiche.circulation}</b></div>
              <div><span>Kilométrage</span><b>{km(f.fiche.km)}</b></div>
              <div><span>Historique</span><b>{f.fiche.historique}</b></div>
              <div><span>État</span><b>{f.fiche.etat}</b></div>
            </div>
          </div>

          {/* Prix comparés */}
          <div className="card p-5 sm:p-6 mt-6">
            <p className="text-[12.5px]" style={{ color: 'var(--ink-3)' }}>Prix véhicule, hors taxes</p>
            <p className="display tabular leading-none mt-1" style={{ fontSize: 'clamp(36px, 4vw, 48px)', color: 'var(--blue-deep)' }}>≈ {euro(f.prixAllemagneHT)}</p>
            <p className="text-[13px] mt-2" style={{ color: 'var(--ink-2)' }}>{f.prixAllemagneNote} : {euro(f.prixAllemagneTTC)} TTC, soit ≈ {euro(f.prixAllemagneHT)} hors taxes. Vendu à une société établie dans un autre pays de l’Union, le véhicule est facturé hors taxes.</p>
            <div className="mrows mt-4">
              <div><span>Prix France équivalent, malus compris</span><b>{euro(f.prixFranceTTC)}</b></div>
              <div><span>Prix Allemagne, annonce TTC</span><b>{euro(f.prixAllemagneTTC)}</b></div>
              <div><span>Prix Allemagne, hors taxes</span><b>≈ {euro(f.prixAllemagneHT)}</b></div>
              <div><span>Écart de marché, TTC contre TTC{f.malusFrance ? ` (dont malus ${euro(f.malusFrance)})` : ''}</span><b>≈ {euro(f.ecartMarche)}</b></div>
              <div><span>TVA allemande non facturée</span><b>≈ {euro(f.tvaAllemande)}</b></div>
              <div className="tot"><span>Écart de prix total · {f.part} % du prix français</span><b>≈ {euro(f.ecart)}</b></div>
            </div>
            <p className="text-[12px] mt-3 leading-relaxed" style={{ color: 'var(--ink-3)' }}>{f.prixFranceNote}{f.scenario2 ? ` ${f.scenario2.label} : ${euro(f.scenario2.ht)} hors taxes${f.scenario2.franceTTC ? ` face à ${euro(f.scenario2.franceTTC)}` : ''}, soit ${euro(f.scenario2.ecart)} d’écart (${f.scenario2.part} %).` : ''}</p>
          </div>

          {/* Budget avec Corsiva Prime */}
          <div className="card p-5 sm:p-6 mt-6" style={{ borderColor: 'rgba(0, 69, 255, 0.35)' }}>
            <h3 className="text-[18px]">Votre budget avec Corsiva Prime</h3>
            <p className="text-[13.5px] mt-1.5" style={{ color: 'var(--ink-2)' }}>Un forfait unique, connu à l’avance, arrêté à la signature. Aucun frais additionnel en cours de dossier.</p>
            <div className="mrows mt-4">
              <div><span>Véhicule, réglé au vendeur sur facture hors taxes</span><b>≈ {euro(f.prixAllemagneHT)}</b></div>
              <div><span>Forfait global : sourcing, structuration, acquisition, livraison</span><b>{euro(FORFAIT_PRIME)}</b></div>
              {covering && <div><span>Option covering intégral, teinte au choix</span><b>{euro(OPTION_COVERING)}</b></div>}
              <div className="tot"><span>Budget total</span><b>≈ {euro(total)}</b></div>
            </div>
            <div className="mecon mt-3">
              <span>Économie nette face au prix France</span>
              <b className="num">≈ {euro(nette)}</b>
            </div>
            <button type="button" className="opt mt-4 w-full" aria-pressed={covering} onClick={() => setCovering((v) => !v)}>
              <span className="box" aria-hidden="true"><svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg></span>
              <span><span className="block text-[14.5px] font-semibold leading-snug">Covering intégral · {euro(OPTION_COVERING)}</span><span className="block text-[12.5px] mt-0.5" style={{ color: 'var(--ink-2)' }}>Teinte au choix, posé avant l’acheminement vers la France.</span></span>
            </button>
            <p className="text-[12px] mt-3 leading-relaxed" style={{ color: 'var(--ink-3)' }}>Hors forfait : gestion annuelle de la structure (comptabilité et suivi local), {GESTION_STRUCTURE_MOIS} € par mois ; assurance tout risque Europe, multi-conducteur, chiffrée selon profil et usage.</p>
          </div>

          {/* Ce que le forfait couvre */}
          <div className="mt-6">
            <h3 className="text-[20px]">Ce que le forfait couvre</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none">
              {[
                'Sourcing : cahier des charges, qualification des annonces, présélection, négociation, contrôle documentaire',
                'Structuration : société porteuse créée avec avocat partenaire, séjour de 3 à 4 jours, hôtel 5 étoiles, transports et restauration inclus',
                'Acquisition : virement au vendeur, préparation, acheminement, immatriculation locale, récupération de TVA selon la structure et l’usage',
                'Livraison : formalités, coordination logistique, transport fermé jusqu’à votre adresse, dossier complet remis',
              ].map((it) => <li key={it} className="flex items-start gap-2.5 text-[14px] leading-snug"><Check blue /><span>{it}</span></li>)}
            </ul>
            <p className="text-[13px] mt-3" style={{ color: 'var(--ink-2)' }}>Durée indicative : environ cinq semaines de l’accord à la livraison.</p>
          </div>

          {/* Demander */}
          <div className="mt-6 flex flex-col gap-2.5">
            <Link href={contactHref} className="btn-cta w-full">Demander cette voiture <Arrow /></Link>
            <div className="grid grid-cols-2 gap-2.5">
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w w-full">Prendre un appel</a>
              <a href={SITE.phoneTel} className="btn-dark w-full">{SITE.phone}</a>
            </div>
            <p className="text-[12px] leading-relaxed text-center" style={{ color: 'var(--ink-3)' }}>Proposition d’acquisition du 21 septembre 2026, indicative et non contractuelle. Le véhicule final pourra différer de l’annonce de référence, tout en restant aligné sur ce niveau d’exigence. Visuels non contractuels.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Catalogue : barre d'outils commune, bandeau de repères, grille, volet ── */
export default function AcquisitionsCatalogue({ compact = false }: { compact?: boolean }) {
  const [marque, setMarque] = useState('Toutes')
  const [tri, setTri] = useState<Tri>('ecart')
  const [open, setOpen] = useState<Fiche | null>(null)

  useEffect(() => {
    if (compact) return
    try { const id = new URLSearchParams(window.location.search).get('fiche'); const f = FICHES.find((x) => x.id === id); if (f) setOpen(f) } catch {}
  }, [compact])
  const ouvrir = (f: Fiche | null) => {
    setOpen(f)
    try { const u = new URL(window.location.href); if (f) u.searchParams.set('fiche', f.id); else u.searchParams.delete('fiche'); u.hash = 'catalogue'; window.history.replaceState(null, '', u.toString()) } catch {}
  }

  const list = useMemo(() => {
    const l = FICHES.filter((f) => marque === 'Toutes' || f.marque === marque)
    l.sort(tri === 'ecart' ? (a, b) => b.ecart - a.ecart : tri === 'prix' ? (a, b) => a.prixAllemagneHT - b.prixAllemagneHT : (a, b) => b.part - a.part)
    return compact ? l.slice(0, 6) : l
  }, [marque, tri, compact])
  const moy = Math.round(FICHES.reduce((s, f) => s + f.ecart, 0) / FICHES.length)

  return (
    <div>
      {!compact && (
        <div className="ctools">
          <div className="grp brands" role="group" aria-label="Marque">
            {MARQUES_ACQ.map((m) => <button key={m} type="button" className="fchip" aria-pressed={marque === m} onClick={() => setMarque(m)}>{m === 'Toutes' ? 'Toutes les marques' : m}</button>)}
          </div>
          <div className="grp">
            <span className="ccount">{list.length} fiche{list.length > 1 ? 's' : ''}</span>
            <select className="field" style={{ width: 'auto' }} value={tri} onChange={(e) => setTri(e.target.value as Tri)} aria-label="Trier">
              <option value="ecart">Trier par écart de prix</option>
              <option value="prix">Trier par prix hors taxes</option>
              <option value="part">Trier par part du prix français</option>
            </select>
          </div>
        </div>
      )}

      {!compact && (
        <div className="msum rise">
          <div><b className="num"><CountUp value={FICHES.length} /></b><span>fiches d’acquisition étudiées par nos conseillers, septembre 2026</span></div>
          <div><b className="num"><CountUp value={moy} format="euro" /></b><span>d’écart de prix moyen entre la France, malus compris, et l’Allemagne hors taxes</span></div>
          <div><b className="num">{euro(FORFAIT_PRIME)}</b><span>de forfait global, connu à l’avance : structuration, exécution et livraison incluses</span></div>
        </div>
      )}

      {list.length === 0 ? (
        <p className="card p-8 text-center text-[15px]" style={{ color: 'var(--ink-2)' }}>Aucune fiche pour cette marque. Décrivez-nous la voiture visée : nous l’étudions.</p>
      ) : (
        <ul key={`${marque}-${tri}`} className={`mcat list-none ${compact ? 'compact' : ''}`}>
          {list.map((f, i) => <Carte key={f.id} f={f} i={i} compact={compact} onOpen={() => ouvrir(f)} />)}
        </ul>
      )}

      {compact ? (
        <div className="flex justify-center mt-8"><Link href="/immatriculation#catalogue" className="btn-primary">Voir les {FICHES.length} fiches d’acquisition <Arrow /></Link></div>
      ) : (
        <p className="text-[12.5px] leading-relaxed mt-6 text-center" style={{ color: 'var(--ink-3)', maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
          Chiffres des propositions d’acquisition du 21 septembre 2026 : prix Allemagne relevés (annonce retenue ou médiane des annonces éligibles, TVA récupérable), prix France équivalents relevés malus compris. Le véhicule final pourra différer de l’annonce de référence. Indicatif et non contractuel, visuels non contractuels.
        </p>
      )}

      {open && !compact && <Volet f={open} onClose={() => ouvrir(null)} />}
    </div>
  )
}
