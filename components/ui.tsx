import type { CSSProperties, ReactNode } from 'react'
import Reveal from '@/components/Reveal'

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
    <svg viewBox="0 0 20 20" className="flex-shrink-0 w-[18px] h-[18px] mt-0.5" fill="none" stroke={blue ? '#0045ff' : '#0099ff'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  )
}

/* Titre de section façon Corsiva OS : Geist 600, deux lignes, la seconde en dégradé bleu. */
export function Title({ a, b, center = false, className = '' }: { a: string; b?: string; center?: boolean; className?: string }) {
  return (
    <h2 className={`rise h-sec ${center ? 'text-center' : ''} ${className}`}>
      {a}
      {b && (
        <>
          <br />
          <span className="grad-blue">{b}</span>
        </>
      )}
    </h2>
  )
}

export function Lead({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p className={`rise lead ${className}`} style={{ ...d(0.08), ...style }}>
      {children}
    </p>
  )
}

/* Tête de section centrée (titre + lead), comme sur corsiva-os.com. */
export function SecHead({ a, b, children, align = 'center', className = '' }: { a: string; b?: string; children?: ReactNode; align?: 'center' | 'left'; className?: string }) {
  return (
    <Reveal className={`sechead ${align === 'left' ? 'left' : ''} ${className}`}>
      <Title a={a} b={b} />
      {children && <Lead>{children}</Lead>}
    </Reveal>
  )
}

export function Section({ children, className = '', id, tone = 'dark', glow = false, grad = false, style }: { children: ReactNode; className?: string; id?: string; tone?: 'dark' | 'light' | 'light-2' | 'light-3'; glow?: boolean; grad?: boolean; style?: CSSProperties }) {
  const cls = tone === 'dark' ? `relative ${glow ? 'sec-glow-blue' : ''} ${grad ? 'sec-grad-blue' : ''}` : tone === 'light' ? 'light' : `light ${tone}`
  return (
    <section id={id} className={`${cls} py-20 sm:py-28 ${className}`} style={style}>
      {children}
    </section>
  )
}

export function Wrap({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 ${className}`} style={style}>{children}</div>
}
