import type { CSSProperties, ReactNode } from 'react'

export const d = (s: number): CSSProperties => ({ ['--d' as string]: `${s}s` }) as CSSProperties

export function Arrow({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`arrow ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Check({ blue = false }: { blue?: boolean }) {
  return (
    <span
      className="flex-shrink-0 w-5 h-5 rounded-full inline-flex items-center justify-center mt-0.5"
      style={{ background: blue ? 'rgba(0,69,255,0.12)' : 'rgba(0,153,255,0.16)' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke={blue ? '#0045ff' : '#0099ff'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10.5l4 4 8-9" /></svg>
    </span>
  )
}

/* Titre de section : Geist, deux lignes, la seconde en bleu (sur sombre : bleu clair ; sur clair : bleu profond). */
export function Title({ a, b, center = false, size = 'lg' }: { a: string; b?: string; center?: boolean; size?: 'lg' | 'xl' }) {
  const fs = size === 'xl' ? 'clamp(40px, 6.4vw, 78px)' : 'clamp(34px, 5vw, 60px)'
  return (
    <h2 className={`rise display ${center ? 'text-center' : ''}`} style={{ fontSize: fs }}>
      {a}
      {b && (
        <>
          <br />
          <span className="title-b">{b}</span>
        </>
      )}
    </h2>
  )
}

export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`rise text-[16.5px] sm:text-[18px] leading-[1.45] max-w-xl ${className}`} style={{ ...d(0.08), color: 'var(--ink-2)', letterSpacing: '-0.01em' }}>
      {children}
    </p>
  )
}

export function Section({ children, className = '', id, tone = 'dark' }: { children: ReactNode; className?: string; id?: string; tone?: 'dark' | 'light' | 'light-2' | 'light-3' }) {
  const cls = tone === 'dark' ? 'grain relative' : tone === 'light' ? 'light' : `light ${tone}`
  return (
    <section id={id} className={`${cls} py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  )
}

export function Wrap({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 ${className}`} style={style}>{children}</div>
}
