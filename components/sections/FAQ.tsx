import Reveal from '@/components/Reveal'
import { Section, Wrap, Title, d } from '@/components/ui'
import { FAQ as ITEMS } from '@/lib/site'

export default function FAQ({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <Section tone={tone === 'light' ? 'light' : 'dark'} id="faq">
      <Wrap className="max-w-3xl">
        <Reveal>
          <Title a="Vos questions," b="nos réponses." />
          <div className="mt-10 sm:mt-14 flex flex-col gap-3">
            {ITEMS.map((f, i) => (
              <details key={f.q} className="rise group card" style={d(0.06 * i)}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none min-h-[60px] px-5 sm:px-6 py-4 select-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[16.5px] leading-snug">{f.q}</h3>
                  <span className="flex-shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center transition-transform duration-300 group-open:rotate-45" style={{ background: 'var(--surface-2)' }} aria-hidden="true">
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 4v12M4 10h12" /></svg>
                  </span>
                </summary>
                <p className="text-[15px] leading-relaxed px-5 sm:px-6 pb-5 -mt-1" style={{ color: 'var(--ink-2)' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Wrap>
    </Section>
  )
}
