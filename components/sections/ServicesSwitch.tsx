'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Arrow, Check } from '@/components/ui'
import { STATS } from '@/lib/site'

/* Les deux services en onglets : le visuel change en fondu, la liste se redéploie à chaque bascule.
   Défilement automatique toutes les 7 s jusqu'au premier clic. */
const S = [
  {
    id: 'immat', n: '01', title: 'Immatriculation en société européenne', short: 'Zéro malus, zéro TVA',
    text: `Une structure européenne encadrée par nos avocats partenaires : ni malus, ni TVA à supporter, ni prix français. Plus de ${STATS.voitures} voitures déjà immatriculées ainsi. Vous roulez partout en Europe.`,
    img: '/media/photos/m3c-3-4.jpg', pos: 'center 55%',
    items: ['Structure européenne mise en place avec nos avocats partenaires', 'Déplacement organisé, hôtel 5 étoiles inclus', 'Immatriculation européenne, récupération de TVA', 'Malus français non supporté (jusqu’à 80 000 €)', 'Assurance simplifiée et allégée'],
    delai: 'environ 5 semaines', gain: 'Écart + TVA + malus non supportés', href: '/immatriculation',
  },
  {
    id: 'import', n: '02', title: 'Import depuis l’Allemagne, immatriculée en France', short: 'Import clé en main',
    text: 'On déniche la pépite chez nos concessions partenaires, on négocie le deal, vous choisissez vos options. Inspection, transport fermé, carte grise française : tout est géré jusqu’aux plaques.',
    img: '/media/photos/rsq8-arriere.jpg', pos: 'center 50%',
    items: ['On déniche la pépite chez nos concessions partenaires', 'Configuration et options au choix, deal négocié', 'Inspection, historique, contrôle documentaire', 'Transport fermé privé jusqu’à chez vous', 'Immatriculation en France : carte grise et formalités gérées'],
    delai: '3 à 4 semaines', gain: 'L’écart de prix allemand, remise comprise', href: '/import',
  },
]
const DUR = 7000

export default function ServicesSwitch() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const [tick, setTick] = useState(0)
  const timer = useRef<number>()

  useEffect(() => {
    if (!auto) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setAuto(false); return }
    timer.current = window.setTimeout(() => { setI((x) => (x + 1) % S.length); setTick((t) => t + 1) }, DUR)
    return () => window.clearTimeout(timer.current)
  }, [i, auto, tick])

  const pick = (k: number) => { setAuto(false); setI(k); setTick((t) => t + 1) }
  const s = S[i]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
      {/* ── Visuel ── */}
      {/* Pas de min-height ici : avec aspect-ratio, une hauteur minimale se transfère en largeur minimale et fait déborder le mobile. */}
      <div className="lg:col-span-7 relative overflow-hidden rounded-[30px]" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
        {S.map((x, k) => (
          <Image key={x.id} src={x.img} alt="" fill quality={84} sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover"
            style={{ objectPosition: x.pos, opacity: k === i ? 1 : 0, transform: k === i ? 'scale(1)' : 'scale(1.06)', transition: 'opacity 0.9s var(--ease), transform 1.4s var(--ease)' }} />
        ))}
        <div className="absolute inset-0 photo-veil" />
        <div className="absolute left-6 top-6 sm:left-8 sm:top-8 flex items-center gap-3">
          {S.map((x, k) => (
            <button key={x.id} type="button" onClick={() => pick(k)} aria-label={x.title} aria-pressed={k === i}
              className="display tabular text-[15px] w-11 h-11 rounded-full inline-flex items-center justify-center transition-colors"
              style={{ background: k === i ? '#fff' : 'rgba(255,255,255,0.12)', color: k === i ? '#000' : '#fff', backdropFilter: 'blur(10px)' }}>
              {x.n}
            </button>
          ))}
        </div>
        <div key={s.id} className="absolute inset-x-0 bottom-0 p-6 sm:p-9 pop">
          <p className="text-[13px] font-medium" style={{ color: 'var(--blue)' }}>Service {s.n}</p>
          <h3 className="display text-[30px] sm:text-[44px] leading-[1.02] mt-2 max-w-xl" style={{ letterSpacing: '-0.035em' }}>{s.title}</h3>
        </div>
      </div>

      {/* ── Onglets + contenu ── */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3" role="tablist" aria-label="Nos deux services">
          {S.map((x, k) => (
            <button key={x.id} type="button" role="tab" aria-selected={k === i} onClick={() => pick(k)}
              className="relative overflow-hidden card text-left p-4 sm:p-5 min-h-[92px] flex flex-col justify-between transition-colors"
              style={{ borderColor: k === i ? 'rgba(0,153,255,0.6)' : undefined, background: k === i ? 'rgba(0,153,255,0.08)' : undefined }}>
              <span className="display tabular text-[22px] leading-none" style={{ color: k === i ? 'var(--blue)' : 'var(--ink-3)' }}>{x.n}</span>
              <span className="text-[15px] font-semibold mt-3 leading-snug">{x.short}</span>
              {k === i && auto && <span key={tick} className="tab-progress run" style={{ ['--dur' as string]: `${DUR}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div key={s.id} className="card p-6 sm:p-7 flex-1 flex flex-col" role="tabpanel">
          <p className="pop text-[15.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{s.text}</p>
          <ul className="mt-5 flex flex-col gap-2.5 list-none">
            {s.items.map((it, k) => (
              <li key={it} className="pop flex items-start gap-3 text-[14.5px] leading-snug" style={{ ['--d' as string]: `${0.08 + k * 0.06}s` }}>
                <Check /><span>{it}</span>
              </li>
            ))}
          </ul>
          <div className="pop grid grid-cols-2 gap-3 mt-6" style={{ ['--d' as string]: '0.4s' }}>
            <div className="rounded-[15px] p-3.5" style={{ background: 'var(--surface-2)' }}>
              <p className="text-[12px]" style={{ color: 'var(--ink-3)' }}>Délai indicatif</p>
              <p className="text-[14.5px] font-semibold mt-0.5">{s.delai}</p>
            </div>
            <div className="rounded-[15px] p-3.5" style={{ background: 'var(--surface-2)' }}>
              <p className="text-[12px]" style={{ color: 'var(--ink-3)' }}>Votre gain</p>
              <p className="text-[14.5px] font-semibold mt-0.5" style={{ color: 'var(--blue)' }}>{s.gain}</p>
            </div>
          </div>
          <div className="pop flex flex-col sm:flex-row gap-3 mt-6" style={{ ['--d' as string]: '0.5s' }}>
            <Link href={s.href} className="btn-w flex-1">Découvrir <Arrow /></Link>
            <Link href="/catalogue" className="btn-dark flex-1">Voir les pépites</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
