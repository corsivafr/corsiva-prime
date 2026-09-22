'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CountUp from '@/components/fx/CountUp'
import { Arrow, Check } from '@/components/ui'
import { CATALOGUE, CATS, calculer, nomModele, type Modele } from '@/lib/modeles'
import { euro, PLAFOND_MALUS, ANNEE_BAREME } from '@/lib/malus'

type Pkg = 'import-immat' | 'import'

/* Le catalogue « Zéro malus » : six voitures à fort malus, en photo, le vrai coût en France (malus inclus)
   face au prix allemand, et l'économie selon le package choisi. Import seul : seul l'écart de prix est
   gagné (TVA et malus dus à l'immatriculation française). Import + immatriculation européenne : écart,
   TVA et malus. Chiffres indicatifs (voir lib/modeles.ts). */
export default function MalusCatalogue({ compact = false }: { compact?: boolean }) {
  const [pkg, setPkg] = useState<Pkg>('import-immat')
  const [tri, setTri] = useState<'economie' | 'malus' | 'prix'>('economie')
  const [open, setOpen] = useState<string | null>(null)
  useEffect(() => { if (compact) return; try { const id = new URLSearchParams(window.location.search).get('modele'); if (id && CATALOGUE.some((m) => m.id === id)) setOpen(id) } catch {} }, [compact])

  const rows = useMemo(() => {
    const list = CATALOGUE.map((m) => {
      const r = calculer(m)
      const coutFrance = m.prixFranceTTC + r.malusTotal
      const economie = pkg === 'import' ? r.ecartAchat : r.avantageTotal
      const coutPrime = coutFrance - economie
      return { m, r, coutFrance, coutPrime, economie }
    })
    if (!compact) list.sort((a, b) => tri === 'economie' ? b.economie - a.economie : tri === 'malus' ? b.r.malusTotal - a.r.malusTotal : b.m.prixFranceTTC - a.m.prixFranceTTC)
    return list
  }, [pkg, tri, compact])

  const stats = useMemo(() => {
    const all = CATALOGUE.map((m) => ({ m, r: calculer(m) }))
    const moy = Math.round(all.reduce((s, x) => s + (pkg === 'import' ? x.r.ecartAchat : x.r.avantageTotal), 0) / all.length)
    const plafond = all.filter((x) => x.r.malusTotal >= PLAFOND_MALUS).length
    const max = Math.max(...all.map((x) => (pkg === 'import' ? x.r.ecartAchat : x.r.avantageTotal)))
    return { moy, plafond, max, n: all.length }
  }, [pkg])

  const href = (m: Modele) => `/contact?vehicule=${encodeURIComponent(nomModele(m))}&package=${pkg}`

  return (
    <div>
      <div className="mtools">
        <div className="seg" role="radiogroup" aria-label="Package">
          <button type="button" aria-pressed={pkg === 'import-immat'} onClick={() => setPkg('import-immat')}>Import + immatriculation européenne</button>
          <button type="button" aria-pressed={pkg === 'import'} onClick={() => setPkg('import')}>Import seul</button>
        </div>
        {!compact && (
          <select className="field" style={{ width: 'auto' }} value={tri} onChange={(e) => setTri(e.target.value as typeof tri)} aria-label="Trier">
            <option value="economie">Trier par économie</option>
            <option value="malus">Trier par malus</option>
            <option value="prix">Trier par prix</option>
          </select>
        )}
      </div>

      {!compact && <div className="msum rise">
        <div><b className="num"><CountUp value={stats.moy} format="euro" /></b><span>d’économie moyenne sur les {stats.n} modèles, avec {pkg === 'import' ? 'l’import seul' : 'l’immatriculation européenne'}</span></div>
        <div><b className="num"><CountUp value={stats.plafond} /> / {stats.n}</b><span>modèles au plafond du malus {ANNEE_BAREME}, soit {euro(PLAFOND_MALUS)} dès l’immatriculation en France</span></div>
        <div><b className="num"><CountUp value={stats.max} format="euro" /></b><span>d’économie maximale sur la sélection</span></div>
      </div>}

      <ul className={`mcat list-none ${compact ? 'compact' : ''}`}>
        {rows.map(({ m, r, coutFrance, coutPrime, economie }, i) => {
          const isOpen = open === m.id
          const wFr = 100, wPr = Math.max(8, Math.round((coutPrime / coutFrance) * 100))
          return (
            <li key={m.id} className="pop" style={{ ['--d' as string]: `${Math.min(i, 8) * 0.04}s` }}>
              <article className={`mcard ${isOpen ? 'open' : ''}`}>
                <div className="mcard-media">
                  {m.photo && <Image src={m.photo} alt={nomModele(m)} fill quality={80} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" style={{ objectPosition: m.photoPos || 'center' }} />}
                  <div className="mcard-veil" />
                  <div className="mcard-cap">
                    <small>{m.marque} · {CATS[m.cat]}{m.source === 'brief' ? ' · prix relevé' : ''}</small>
                    <h3>{m.modele}</h3>
                  </div>
                  {r.malusTotal >= PLAFOND_MALUS ? <span className="mtag cap">Malus au plafond</span> : <span className="mtag">Malus {euro(r.malusTotal)}</span>}
                </div>
                <div className="mbars">
                  <div className="mbar"><span><span>Coût réel en France, malus inclus</span><i style={{ ['--w' as string]: `${wFr}%` }} /></span><b className="num">{euro(coutFrance)}</b></div>
                  <div className="mbar prime"><span><span>Avec Corsiva Prime, {pkg === 'import' ? 'import seul' : 'sans malus ni TVA'}</span><i style={{ ['--w' as string]: `${wPr}%` }} /></span><b className="num">{euro(coutPrime)}</b></div>
                </div>
                <div className="mecon">
                  <span>Vous économisez</span>
                  <b className="num">{euro(economie)}</b>
                </div>
                {compact ? (
                  <Link href={`/immatriculation?modele=${m.id}#catalogue`} className="text-[13px] font-medium inline-flex items-center gap-1.5" style={{ color: 'var(--blue-deep)' }}>Voir le détail <Arrow className="w-3.5 h-3.5" /></Link>
                ) : (
                  <button type="button" className="text-[13px] font-medium text-left inline-flex items-center gap-1.5" style={{ color: 'var(--blue-deep)' }} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : m.id)}>
                    {isOpen ? 'Masquer le détail' : 'Voir le détail'} <Arrow className="w-3.5 h-3.5" />
                  </button>
                )}
                {!compact && isOpen && (
                  <>
                    <div className="mrows">
                      <div><span>Prix constructeur France TTC</span><b>{euro(m.prixFranceTTC)}</b></div>
                      <div><span>Prix négocié Allemagne HT</span><b>{euro(m.prixAllemagneHT)}</b></div>
                      <div><span>Écart de prix</span><b>{euro(r.ecartAchat)}</b></div>
                      <div className={pkg === 'import' ? 'off' : ''}><span>TVA 20 % non supportée</span><b>{euro(r.tvaEvitee)}</b></div>
                      <div className={pkg === 'import' ? 'off' : ''}><span>Malus CO₂ {ANNEE_BAREME} ({m.co2} g/km{r.decote ? `, décote ${Math.round(r.decote * 100)} %` : ''})</span><b>{euro(r.malusCO2)}</b></div>
                      <div className={pkg === 'import' ? 'off' : ''}><span>Malus au poids ({m.masse.toLocaleString('fr-FR')} kg{m.energie === 'hybride-rechargeable' ? ', abattement 200 kg' : ''})</span><b>{euro(r.malusMasse)}</b></div>
                      {r.malusCO2 + r.malusMasse > PLAFOND_MALUS && <div><span>Cumul ramené au plafond légal</span><b>{euro(PLAFOND_MALUS)}</b></div>}
                    </div>
                    <div className="mcta">
                      <Link href={href(m)} className="btn-primary btn-sm">Demander ce véhicule <Arrow /></Link>
                      <Link href={`/simulateur?modele=${m.id}#simulateur`} className="btn-ghost btn-sm">Affiner dans le simulateur</Link>
                    </div>
                    {pkg === 'import' && <p className="text-[12px]" style={{ color: 'var(--ink-3)' }}><Check /> En import seul, la TVA française et le malus restent dus à l’immatriculation en France.</p>}
                  </>
                )}
              </article>
            </li>
          )
        })}
      </ul>
      {compact && (
        <div className="flex justify-center mt-8"><Link href="/immatriculation#catalogue" className="btn-primary">Voir le catalogue Zéro malus <Arrow /></Link></div>
      )}
      {!compact && <p className="text-[12.5px] leading-relaxed mt-6 text-center" style={{ color: 'var(--ink-3)', maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
        Chiffres indicatifs et non contractuels. Prix constructeur France et prix Allemagne hors taxes estimés (remise moyenne constatée chez nos concessions partenaires), sauf modèles « prix relevé ». CO₂ WLTP et masse indicatifs. Malus calculé selon le barème {ANNEE_BAREME} (loi de finances n° 2025-127, fiche service-public F35947), TVA 20 %. La structure européenne vous est présentée lors d’un appel.
      </p>}
    </div>
  )
}
