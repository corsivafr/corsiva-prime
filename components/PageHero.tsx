import Link from 'next/link'
import type { ReactNode } from 'react'
import HeroPicture from '@/components/HeroPicture'
import { Arrow } from '@/components/ui'
import type { HeroKey } from '@/lib/site'

/* Hero des pages intérieures, même grammaire que la home : centré, titre en deux lignes (dégradé),
   lead, deux pills ; photo en retrait sous un halo bleu, affichée immédiatement. */
export default function PageHero({
  a, b, lead, hero, position = 'center', primary, secondary, children,
}: {
  a: string; b: string; lead: string; hero: HeroKey; position?: string
  primary?: { href: string; label: string; external?: boolean }; secondary?: { href: string; label: string; external?: boolean }; children?: ReactNode
}) {
  const Btn = ({ b, cls }: { b: { href: string; label: string; external?: boolean }; cls: string }) =>
    b.external ? <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>{b.label} <Arrow /></a> : <Link href={b.href} className={cls}>{b.label} <Arrow /></Link>
  return (
    <header className="relative overflow-hidden flex items-center" style={{ minHeight: 'min(78svh, 760px)', padding: '150px 0 80px', background: '#090909' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <HeroPicture hero={hero} position={position} opacity={0.4} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.6) 0%, rgba(9,9,9,0.3) 45%, rgba(9,9,9,0.62) 80%, #090909 100%)' }} />
      </div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 text-center w-full">
        <h1 className="h-hero h-hero-sm hin mx-auto" style={{ ['--d' as string]: '0.05s', maxWidth: 1000 }}>
          {a}
          <br />
          <span className="grad-blue">{b}</span>
        </h1>
        <p className="hin lead mx-auto" style={{ ['--d' as string]: '0.18s', margin: '22px auto 0', maxWidth: '56ch', lineHeight: 1.6 }}>{lead}</p>
        {(primary || secondary) && (
          <div className="hin flex flex-wrap justify-center gap-3 mt-8" style={{ ['--d' as string]: '0.3s' }}>
            {primary && <Btn b={primary} cls="btn-cta" />}
            {secondary && <Btn b={secondary} cls="btn-w" />}
          </div>
        )}
        {children}
      </div>
    </header>
  )
}
