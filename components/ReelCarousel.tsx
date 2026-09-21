'use client'

import { useState } from 'react'
import Image from 'next/image'
import ReelVideo from '@/components/ReelVideo'

export type Reel = { id: string; titre: string; lieu: string; src: string; poster: string }

/* Carrousel de reels : un téléphone, la vidéo active seule se charge et se lit ; les autres sont des
   vignettes cliquables. Sur mobile, les vignettes défilent horizontalement. */
export default function ReelCarousel({ reels }: { reels: Reel[] }) {
  const [i, setI] = useState(0)
  const r = reels[i]
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="phone" key={r.id}>
        <span className="phone-notch" aria-hidden="true" />
        <ReelVideo src={r.src} poster={r.poster} alt={`${r.titre} — ${r.lieu}`} />
        <div className="absolute left-4 right-4 bottom-5 z-[2] pointer-events-none">
          <p className="text-[14px] font-semibold text-white leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{r.titre}</p>
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.75)', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{r.lieu}</p>
        </div>
      </div>
      <div className="flex gap-2.5 overflow-x-auto w-full justify-start sm:justify-center pb-1 px-1" role="tablist" aria-label="Choisir une vidéo">
        {reels.map((x, k) => (
          <button key={x.id} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className="relative flex-shrink-0 overflow-hidden rounded-[14px] transition-all"
            style={{ width: 64, height: 104, outline: k === i ? '2px solid #0099ff' : '1px solid var(--hairline)', outlineOffset: 2, opacity: k === i ? 1 : 0.6 }}
            aria-label={`${x.titre} — ${x.lieu}`}>
            <Image src={x.poster} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
