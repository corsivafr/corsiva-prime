import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import AutoVideo from '@/components/AutoVideo'
import { Wrap, Arrow } from '@/components/ui'

/* Hero des pages intérieures : média plein cadre, voile, titre Geist en deux lignes, deux boutons. */
export default function PageHero({
  a, b, lead, image, video, poster, position = 'center', primary, secondary, children, tall = false,
}: {
  a: string; b: string; lead: string; image?: string; video?: string; poster?: string; position?: string
  primary?: { href: string; label: string }; secondary?: { href: string; label: string }; children?: ReactNode; tall?: boolean
}) {
  const h = tall ? 'min(88svh, 900px)' : 'min(74svh, 780px)'
  return (
    <section className="relative overflow-hidden" style={{ minHeight: h, background: '#0a0a0a' }}>
      <div className="absolute inset-0">
        {video && poster ? (
          <AutoVideo src={video} poster={poster} alt="" sizes="100vw" objectPosition={position} />
        ) : image ? (
          <Image src={image} alt="" fill priority quality={86} sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        ) : null}
        <div className="absolute inset-0 hero-veil" />
      </div>
      <Wrap className="relative flex flex-col justify-end" style={{ minHeight: h, paddingTop: 130, paddingBottom: 56 }}>
        <div className="max-w-4xl">
          <h1 className="hero-in" style={{ fontSize: 'clamp(40px, 7vw, 92px)', animationDelay: '0.1s' }}>
            {a}
            <br />
            <span style={{ color: 'var(--blue)' }}>{b}</span>
          </h1>
          <p className="hero-in text-[17px] sm:text-[19px] leading-[1.45] mt-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.72)', animationDelay: '0.25s' }}>{lead}</p>
          {(primary || secondary) && (
            <div className="hero-in flex flex-col sm:flex-row gap-3 mt-8" style={{ animationDelay: '0.4s' }}>
              {primary && <Link href={primary.href} className="btn btn-primary">{primary.label} <Arrow /></Link>}
              {secondary && <Link href={secondary.href} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)' }}>{secondary.label}</Link>}
            </div>
          )}
          {children}
        </div>
      </Wrap>
    </section>
  )
}
