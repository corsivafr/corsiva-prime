import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Arrow } from '@/components/ui'

/* Hero des pages intérieures, même grammaire que la home : centré, titre en deux lignes (dégradé),
   lead, deux pills ; photo M3 CS en retrait sous un halo bleu. */
export default function PageHero({
  a, b, lead, image, position = 'center', primary, secondary, children,
}: {
  a: string; b: string; lead: string; image: string; imageMobile?: string; position?: string
  primary?: { href: string; label: string }; secondary?: { href: string; label: string }; children?: ReactNode; tall?: boolean
}) {
  return (
    <header className="relative overflow-hidden flex items-center" style={{ minHeight: 'min(78svh, 760px)', padding: '150px 0 80px', background: '#090909' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={image} alt="" fill priority quality={80} sizes="100vw" className="object-cover kenburns" style={{ objectPosition: position, opacity: 0.4 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.6) 0%, rgba(9,9,9,0.15) 45%, rgba(9,9,9,0.6) 80%, #090909 100%)' }} />
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
            {primary && <Link href={primary.href} className="btn-cta">{primary.label} <Arrow /></Link>}
            {secondary && <Link href={secondary.href} className="btn-w">{secondary.label} <Arrow /></Link>}
          </div>
        )}
        {children}
      </div>
    </header>
  )
}
