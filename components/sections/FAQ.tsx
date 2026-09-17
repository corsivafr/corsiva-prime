import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead } from '@/components/ui'
import { FAQ as ITEMS } from '@/lib/site'

/* FAQ façon Corsiva OS : filets, plus / moins, pas de cartes. */
export default function FAQ({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  return (
    <Section tone={tone === 'light' ? 'light' : 'dark'} id="faq">
      <Wrap className="max-w-3xl">
        <SecHead a="Vos questions," b="nos réponses." />
        <Reveal className="faq rise">
          {ITEMS.map((f) => (
            <details key={f.q}>
              <summary><h3 className="text-[16px] font-semibold leading-snug" style={{ letterSpacing: '-0.01em' }}>{f.q}</h3></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </Wrap>
    </Section>
  )
}
