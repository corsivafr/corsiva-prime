'use client'

import { useEffect, useState } from 'react'
import { HERO_IMAGES } from '@/lib/site'

/* Écran de chargement : voile canvas avec le logo Corsiva Prime et un filet bleu qui court.
   Rendu côté serveur (donc visible dès le premier octet), retiré une fois la page chargée
   (minimum 0,7 s pour éviter le flash, maximum 1,6 s quoi qu'il arrive), une fois par session. Sans JS : masqué. */
export default function SiteLoader() {
  const [state, setState] = useState<'shown' | 'leaving' | 'gone'>('shown')

  useEffect(() => {
    // Robots, Lighthouse et navigateurs pilotés : pas d'écran d'attente.
    const ready = () => document.documentElement.classList.add('ready')
    if (navigator.webdriver) { setState('gone'); ready(); return }
    // Une seule fois par session : les pages suivantes s'ouvrent directement.
    try { if (sessionStorage.getItem('sl-vu')) { setState('gone'); ready(); return } sessionStorage.setItem('sl-vu', '1') } catch {}
    const t0 = performance.now()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const MIN = reduce ? 300 : 700
    const MAX = 1600
    let done = false
    let leaveTimer = 0
    const leave = () => {
      if (done) return
      done = true
      setState('leaving')
      // Les textes du hero (lignes, mots, fondus) démarrent maintenant, sous les yeux du visiteur.
      ready()
      leaveTimer = window.setTimeout(() => setState('gone'), 500)
    }
    // On n'attend que le fond du hero de cette page ; les autres fonds se préchargent après l'ouverture.
    const mobile = window.matchMedia('(max-width: 639px)').matches
    const heroes = Object.values(HERO_IMAGES).map((h) => (mobile ? h.m : h.d))
    const current = (document.querySelector('header picture img') as HTMLImageElement | null)?.currentSrc || ''
    const first = heroes.find((src) => current.endsWith(src)) || heroes[0]
    const preload = (src: string) => new Promise<void>((res) => { const im = new Image(); im.onload = () => res(); im.onerror = () => res(); im.src = src })
    const images = preload(first).then(() => { window.setTimeout(() => heroes.filter((h) => h !== first).forEach(preload), 1500) })
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
