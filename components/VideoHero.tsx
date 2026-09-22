'use client'

import { useEffect, useRef, useState } from 'react'

/* Fond vidéo d'un hero : le reel de la M3 (seule vidéo du site), muet, en boucle, pause hors écran,
   remplacé par son image en reduced-motion ou en économie de données. */
export default function VideoHero({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [play, setPlay] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    if (!reduce && !nav.connection?.saveData) setPlay(true)
  }, [])
  useEffect(() => {
    if (!play) return
    const v = ref.current; if (!v) return
    v.muted = true
    const tryPlay = () => { if (v.paused) v.play().catch(() => {}) }
    const t = window.setTimeout(tryPlay, 200)
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { if (e.isIntersecting) tryPlay(); else v.pause() }, { threshold: 0.1 }) : null
    io?.observe(v)
    return () => { window.clearTimeout(t); io?.disconnect() }
  }, [play])
  // eslint-disable-next-line @next/next/no-img-element
  if (!play) return <img src={poster} alt="" className="vhero-video" aria-hidden="true" />
  return (
    <video ref={ref} className="vhero-video" autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  )
}
