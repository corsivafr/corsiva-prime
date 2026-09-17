'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/* Parallaxe au défilement : l'élément glisse à `speed` fois la vitesse de la page.
   rAF, transform seul, rien en reduced-motion. */
export default function Parallax({ children, speed = 0.2, className = '', style }: { children: ReactNode; speed?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const tick = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const center = r.top + r.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(center * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [speed])
  return <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>{children}</div>
}
