import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import Parallax from '@/components/fx/Parallax'
import { Wrap, Arrow } from '@/components/ui'

/* Hero des pages intérieures : photo M3 CS plein cadre (Ken Burns + parallaxe), voile, titre en deux
   lignes révélé ligne par ligne, deux boutons. */
export default function PageHero({
  a, b, lead, image, imageMobile, position = 'center', primary, secondary, children, tall = false,
}: {
  a: string; b: string; lead: string; image: string; imageMobile?: string; position?: string
  primary?: { href: string; label: string }; secondary?: { href: string; label: string }; children?: ReactNode; tall?: boolean
}) {
  const h = tall ? 'min(88svh, 900px)' : 'min(74svh, 780px)'
  return (
    <section className="relative overflow-hidden" style={{ minHeight: h, background: '#070707' }}>
      <Parallax speed={0.16} className="absolute inset-0" style={{ inset: '-8% 0' }}>
        <div className="absolute inset-0 kenburns">
          <Image src={image} alt="" fill priority quality={84} sizes="100vw" className={`object-cover ${imageMobile ? 'hidden sm:block' : ''}`} style={{ objectPosition: position }} />
          {imageMobile && <Image src={imageMobile} alt="" fill priority quality={84} sizes="100vw" className="object-cover sm:hidden" style={{ objectPosition: 'center' }} />}
        </div>
      </Parallax>
      <div className="absolute inset-0 hero-veil" />
      <div className="absolute inset-x-0 top-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.55), transparent)' }} />
      <Wrap className="relative flex flex-col justify-end" style={{ minHeight: h, paddingTop: 130, paddingBottom: 56 }}>
        <div className="max-w-4xl">
          <h1 className="lines" style={{ fontSize: 'clamp(40px, 7vw, 92px)' }}>
            <span className="ln"><span style={{ ['--d' as string]: '0.1s' }}>{a}</span></span>
            <span className="ln"><span style={{ ['--d' as string]: '0.22s', color: 'var(--blue)' }}>{b}</span></span>
          </h1>
          <p className="hero-in text-[17px] sm:text-[19px] leading-[1.45] mt-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.74)', animationDelay: '0.45s' }}>{lead}</p>
          {(primary || secondary) && (
            <div className="hero-in flex flex-col sm:flex-row gap-3 mt-8" style={{ animationDelay: '0.6s' }}>
              {primary && <Link href={primary.href} className="btn btn-primary">{primary.label} <Arrow /></Link>}
              {secondary && <Link href={secondary.href} className="btn glass" style={{ color: '#fff' }}>{secondary.label}</Link>}
            </div>
          )}
          {children}
        </div>
      </Wrap>
    </section>
  )
}
