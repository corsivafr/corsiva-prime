import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, Title, Lead, Arrow, d } from '@/components/ui'
import { PHASES } from '@/lib/site'

/* Le déroulé en cinq phases — section sombre, frise verticale avec filet bleu qui se trace. */
export default function Process({ compact = false }: { compact?: boolean }) {
  const phases = compact ? PHASES : PHASES
  return (
    <Section id="process">
      <Wrap>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
            <Title a="Comment ça" b="fonctionne." />
            <Lead className="mt-4">Cinq phases, environ cinq semaines de l&apos;accord à la livraison. Vous validez, nous exécutons.</Lead>
            <div className="rise flex items-baseline gap-3 mt-8" style={d(0.14)}>
              <span className="display tabular text-[56px] leading-none" style={{ color: 'var(--blue)' }}>5</span>
              <span className="text-[15px]" style={{ color: 'var(--ink-2)' }}>semaines, durée totale indicative</span>
            </div>
            {compact && (
              <Link href="/comment-ca-fonctionne" className="rise btn btn-secondary mt-8" style={d(0.2)}>
                Le déroulé en détail <Arrow />
              </Link>
            )}
          </div>

          <ol className="lg:col-span-8 relative list-none">
            <span className="absolute left-[19px] top-4 bottom-4 w-px" style={{ background: 'linear-gradient(180deg, rgba(0,153,255,0.6), rgba(0,153,255,0.08))' }} aria-hidden="true" />
            {phases.map((p, i) => (
              <li key={p.n} className="rise relative pl-16 pb-10 last:pb-0" style={d(0.08 * i)}>
                <span
                  className="absolute left-0 top-0 w-10 h-10 rounded-full inline-flex items-center justify-center text-[12px] font-semibold tabular"
                  style={{ background: 'var(--surface-2)', border: '1px solid rgba(0,153,255,0.45)', color: 'var(--blue)' }}
                >
                  {p.n}
                </span>
                <div className="card lift p-6 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                    <h3 className="text-[20px] leading-snug">{p.title}</h3>
                    <span className="text-[13px] font-medium" style={{ color: 'var(--blue)' }}>{p.duree}</span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed mt-3" style={{ color: 'var(--ink-2)' }}>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Wrap>
    </Section>
  )
}
