'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* Vidéo muette en boucle : lecture forcée, pause hors écran, poster seul en reduced-motion. */
export default function AutoVideo({
  src, poster, alt, className = '', objectPosition = 'center', sizes = '(max-width: 1023px) 100vw, 40vw',
}: { src: string; poster: string; alt: string; className?: string; objectPosition?: string; sizes?: string }) {
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
    v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '')
    const tryPlay = () => { if (v.paused) v.play().catch(() => {}) }
    const t = window.setTimeout(tryPlay, 400)
    const onVis = () => { if (document.visibilityState === 'visible') tryPlay() }
    document.addEventListener('visibilitychange', onVis)
    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tryPlay(); else v.pause() }, { threshold: 0.15 })
      io.observe(v)
    }
    return () => { window.clearTimeout(t); document.removeEventListener('visibilitychange', onVis); io?.disconnect() }
  }, [play])

  if (!play) return <Image src={poster} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} style={{ objectPosition }} />

  return (
    <video
      ref={ref}
      autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={alt}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ objectPosition }}
      onCanPlay={(e) => { const v = e.currentTarget; if (v.paused) v.play().catch(() => {}) }}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
