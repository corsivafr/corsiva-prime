'use client'

import { useEffect, useState } from 'react'
import { HERO_IMAGES } from '@/lib/site'

/* Écran de chargement : voile canvas avec le logo Corsiva Prime et un filet bleu qui court.
   Rendu côté serveur (donc visible dès le premier octet), retiré une fois la page chargée
   (minimum 1,1 s pour éviter le flash, maximum 3,2 s quoi qu'il arrive). Sans JS : masqué. */
export default function SiteLoader() {
  const [state, setState] = useState<'shown' | 'leaving' | 'gone'>('shown')

  useEffect(() => {
    // Robots, Lighthouse et navigateurs pilotés : pas d'écran d'attente.
    if (navigator.webdriver) { setState('gone'); return }
    const t0 = performance.now()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const MIN = reduce ? 300 : 1100
    const MAX = 3200
    let done = false
    let leaveTimer = 0
    const leave = () => {
      if (done) return
      done = true
      setState('leaving')
      leaveTimer = window.setTimeout(() => setState('gone'), 650)
    }
    // Les fonds de hero de toutes les pages sont chargés maintenant : chaque page s'ouvrira avec son image déjà là.
    const mobile = window.matchMedia('(max-width: 639px)').matches
    const heroes = Object.values(HERO_IMAGES).map((h) => (mobile ? h.m : h.d))
    const images = Promise.all(heroes.map((src) => new Promise<void>((res) => { const im = new Image(); im.onload = () => res(); im.onerror = () => res(); im.src = src })))
    const onLoad = () => { images.then(() => window.setTimeout(leave, Math.max(0, MIN - (performance.now() - t0)))) }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    const safety = window.setTimeout(leave, MAX)
    return () => { window.clearTimeout(safety); window.clearTimeout(leaveTimer); window.removeEventListener('load', onLoad) }
  }, [])

  if (state === 'gone') return null
  return (
    <div className={`sl-veil ${state === 'leaving' ? 'sl-leave' : ''}`} aria-hidden="true">
      <div className="sl-lockup">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logos/logo-prime-blanc.png" alt="" width={1588} height={224} />
        <span className="sl-line"><span /></span>
      </div>
    </div>
  )
}
