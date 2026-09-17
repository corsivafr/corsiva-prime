'use client'

import { useEffect, useRef, useState } from 'react'

/* Compteur : monte de 0 à la valeur quand l'élément entre à l'écran (1,4 s, easing sortie). */
export default function CountUp({ value, format = 'int', suffix = '', prefix = '', className = '', decimals = 0 }: { value: number; format?: 'int' | 'euro'; suffix?: string; prefix?: string; className?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') { setN(value); setDone(true); return }
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now(); const dur = 1400
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur); const ease = 1 - Math.pow(1 - p, 3)
        setN(value * ease)
        if (p < 1) raf = requestAnimationFrame(tick); else setDone(true)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.3 })
    io.observe(el)
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf) }
  }, [value])

  const v = done ? value : n
  const txt = format === 'euro'
    ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(v))
    : new Intl.NumberFormat('fr-FR', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(v)
  return <span ref={ref} className={`tabular ${className}`}>{prefix}{txt}{suffix}</span>
}
