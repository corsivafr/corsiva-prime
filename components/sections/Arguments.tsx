import Reveal from '@/components/Reveal'
import { Section, Wrap, Title, Lead, d } from '@/components/ui'
import { ARGUMENTS } from '@/lib/site'

const icons = [
  <path key="a" d="M4 12h16M4 7h10M4 17h7" />,
  <path key="b" d="M4 6h16v12H4zM4 10h16M9 14h6" />,
  <path key="c" d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8z" />,
  <path key="d" d="M12 21s7-4.4 7-10.5A7 7 0 0 0 5 10.5C5 16.6 12 21 12 21z" />,
]

/* Les quatre arguments du brief — section claire, cartes blanches, une pointe de bleu. */
export default function Arguments({ title = ['Pourquoi acheter', 'en Allemagne avec nous.'], lead }: { title?: [string, string]; lead?: string }) {
  return (
    <Section tone="light-2" id="arguments">
      <Wrap>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7"><Title a={title[0]} b={title[1]} /></div>
          {lead && <div className="lg:col-span-5"><Lead>{lead}</Lead></div>}
        </Reveal>
        <Reveal as="ul" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none">
          {ARGUMENTS.map((a, i) => (
            <li key={a.title} className="rise rise-scale card lift p-6 sm:p-7 flex flex-col" style={d(0.06 * (i + 1))}>
              <span className="w-11 h-11 rounded-full inline-flex items-center justify-center" style={{ background: 'var(--blue-tint)' }} aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0045ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[i % icons.length]}</svg>
              </span>
              <h3 className="text-[19px] leading-snug mt-6">{a.title}</h3>
              <p className="text-[14.5px] leading-relaxed mt-2.5" style={{ color: 'var(--ink-2)' }}>{a.text}</p>
            </li>
          ))}
        </Reveal>
      </Wrap>
    </Section>
  )
}
