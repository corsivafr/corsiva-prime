'use client'

import { useEffect, useRef } from 'react'

const TARGETS = '.rise, .rise-left, .rise-scale, .rise-blur, .filet'

/* Révélation au défilement : ajoute .in aux descendants animés quand ils entrent dans la fenêtre.
   Filet à 2,5 s : ce qui est déjà à l'écran apparaît même si l'observateur reste muet. */
export default function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  id,
  style,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'ul' | 'ol' | 'article'
  id?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll(TARGETS))
    if (root.matches(TARGETS)) targets.unshift(root)
    if (targets.length === 0) return
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((t) => t.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -4% 0px' }
    )
    targets.forEach((t) => io.observe(t))
    const safety = window.setTimeout(() => {
      targets.forEach((t) => {
        if (t.classList.contains('in')) return
        const r = t.getBoundingClientRect()
        if (r.top < window.innerHeight * 1.1 && r.bottom > 0) t.classList.add('in')
      })
    }, 2500)
    return () => {
      window.clearTimeout(safety)
      io.disconnect()
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any
  return (
    <Comp ref={ref} className={className} id={id} style={style}>
      {children}
    </Comp>
  )
}
