'use client'

import { useEffect, useRef, useState } from 'react'
import { PHASES } from '@/lib/site'

const SEMAINES = ['S1', 'S1 – S2', 'S1 – S3', 'S4', 'S5']

/* Le calendrier des cinq phases, interactif : une frise cliquable avec sa progression, un panneau
   qui détaille la phase choisie, avance seule toutes les quatre secondes tant que l'on n'y touche pas,
   se pilote au clavier (flèches) et au doigt (glisser sur le panneau). */
export default function Calendrier() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const touchX = useRef<number | null>(null)
  const n = PHASES.length
  const go = (k: number, manual = true) => { setI(((k % n) + n) % n); if (manual) setAuto(false) }

  useEffect(() => {
    if (!auto) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((x) => (x + 1) % n), 4200)
    return () => window.clearInterval(t)
  }, [auto, n])

  const p = PHASES[i]
  return (
    <div className="cal" onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1) }}>
      <div className="cal-track" role="tablist" aria-label="Phases du projet" style={{ ['--p' as string]: i / (n - 1) }}>
        {PHASES.map((ph, k) => (
          <button key={ph.n} type="button" role="tab" aria-selected={k === i} className={`cal-step ${k < i ? 'done' : ''}`} onClick={() => go(k)} id={`cal-tab-${k}`} aria-controls="cal-panel">
            <i>{k + 1}</i>
            <b>{ph.title}</b>
            <small>{SEMAINES[k]}</small>
          </button>
        ))}
      </div>
      <div
        id="cal-panel" role="tabpanel" aria-labelledby={`cal-tab-${i}`} className="cal-panel"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => { if (touchX.current === null) return; const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)) }}
      >
        <div key={p.n} className="cal-fade">
          <p className="text-[12.5px] font-medium" style={{ color: 'var(--ink-3)' }}>Phase {p.n} sur 0{n}</p>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
          <div className="cal-nav">
            <button type="button" onClick={() => go(i - 1)} disabled={i === 0}>Précédent</button>
            <button type="button" onClick={() => go(i + 1)} disabled={i === n - 1}>Suivant</button>
          </div>
        </div>
        <div key={`w${p.n}`} className="cal-week cal-fade">{SEMAINES[i]}<small>{p.duree}</small></div>
      </div>
    </div>
  )
}
