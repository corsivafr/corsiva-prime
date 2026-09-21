'use client'

import { useEffect, useRef, useState } from 'react'

/* Reel vertical (réseaux sociaux) : muet, en boucle, lecture forcée, pause hors écran,
   affiche seulement l'image en reduced-motion ou en mode économie de données. */
export default function ReelVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (!reduce && !nav.connection?.saveData) setPlay(true)
  }, [])

  useEffect(() => {
    if (!play) return
    const v = ref.current
    if (!v) return
    v.muted = true
    const tryPlay = () => { if (v.paused) v.play().catch(() => {}) }
    const t = window.setTimeout(tryPlay, 300)
    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tryPlay(); else v.pause() }, { threshold: 0.2 })
      io.observe(v)
    }
    return () => { window.clearTimeout(t); io?.disconnect() }
  }, [play])

  if (!play) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={alt} className="w-full h-full object-cover" />
  }
  return (
    <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={alt} className="w-full h-full object-cover" onCanPlay={(e) => { const v = e.currentTarget; if (v.paused) v.play().catch(() => {}) }}>
      <source src={src} type="video/mp4" />
    </video>
  )
}
