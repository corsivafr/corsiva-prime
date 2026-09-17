'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/* Inclinaison 3D légère au survol (max 6°), avec reflet qui suit le pointeur.
   Désactivée sans survol (tactile) et en reduced-motion. */
export default function Tilt({ children, className = '', style, max = 6, glare = true }: { children: ReactNode; className?: string; style?: CSSProperties; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    setOn(ok)
  }, [])

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || !on) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${((0.5 - py) * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} className={`tilt ${on ? 'tilt-on' : ''} ${className}`} style={style} onPointerMove={move} onPointerLeave={leave}>
      {children}
      {glare && on && <span className="tilt-glare" aria-hidden="true" />}
    </div>
  )
}
