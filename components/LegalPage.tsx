import type { ReactNode } from 'react'
import { Wrap } from '@/components/ui'

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="light pt-32 sm:pt-40 pb-20 sm:pb-28 min-h-screen">
      <Wrap className="max-w-3xl">
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>{title}</h1>
        <p className="text-[13px] mt-4" style={{ color: 'var(--ink-3)' }}>Dernière mise à jour : {updated}</p>
        <div className="legal mt-10 flex flex-col gap-8 text-[15.5px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>{children}</div>
      </Wrap>
    </section>
  )
}
