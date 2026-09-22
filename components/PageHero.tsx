import Link from 'next/link'
import type { ReactNode } from 'react'
import HeroPicture from '@/components/HeroPicture'
import VideoHero from '@/components/VideoHero'
import { Arrow, Words } from '@/components/ui'
import type { HeroKey } from '@/lib/site'

/* Hero des pages intérieures, même grammaire que la home : centré, titre en deux lignes (dégradé),
   lead, deux pills ; photo en retrait sous un halo bleu, affichée immédiatement. */
export default function PageHero({
  a, b, lead, hero, position = 'center', primary, secondary, children, video,
}: {
  a: string; b: string; lead: string; hero: HeroKey; position?: string
  primary?: { href: string; label: string; external?: boolean }; secondary?: { href: string; label: string; external?: boolean }; children?: ReactNode
  /** Fond vidéo (remplace la photo) : le reel de la M3, seule vidéo autorisée sur le site. */
  video?: { src: string; poster: string }
}) {
  const Btn = ({ b, cls }: { b: { href: string; label: string; external?: boolean }; cls: string }) =>
    b.external ? <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>{b.label} <Arrow /></a> : <Link href={b.href} className={cls}>{b.label} <Arrow /></Link>
  return (
    <header className="relative overflow-hidden flex items-center" style={{ minHeight: 'min(78svh, 760px)', padding: '150px 0 80px', background: '#090909' }}>
      <div className="absolute inset-0" aria-hidden="true">
        {video ? <VideoHero src={video.src} poster={video.poster} /> : <HeroPicture hero={hero} position={position} opacity={0.4} />}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.6) 0%, rgba(9,9,9,0.3) 45%, rgba(9,9,9,0.62) 80%, #090909 100%)' }} />
      </div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 text-center w-full">
        <h1 className="h-hero h-hero-sm mx-auto" style={{ maxWidth: 1000 }}>
          <span className="ln"><span style={{ ['--d' as string]: '0.05s' }}>{a}</span></span>
          <span className="ln"><span className="grad-blue" style={{ ['--d' as string]: '0.18s' }}>{b}</span></span>
        </h1>
        <p className="lead mx-auto" style={{ margin: '22px auto 0', maxWidth: '56ch', lineHeight: 1.6 }}><Words text={lead} from={0.34} step={0.018} /></p>
        {(primary || secondary) && (
          <div className="hin flex flex-wrap justify-center gap-3 mt-8" style={{ ['--d' as string]: '0.46s' }}>
            {primary && <Btn b={primary} cls="btn-cta" />}
            {secondary && <Btn b={secondary} cls="btn-w" />}
          </div>
        )}
        {children}
      </div>
    </header>
  )
}
