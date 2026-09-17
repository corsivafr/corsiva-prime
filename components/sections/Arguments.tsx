import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, d } from '@/components/ui'
import { ARGUMENTS } from '@/lib/site'

const ICONS = [
  <path key="a" d="M4 12h16M4 7h10M4 17h7" />,
  <><rect key="b1" x="3" y="6" width="18" height="12" rx="3" /><path key="b2" d="M3 10h18M8 14h4" /></>,
  <path key="c" d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8z" />,
  <path key="d" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />,
]
const META = ['Prix relevés chez les distributeurs officiels', 'Un seul interlocuteur, du sourcing aux plaques', 'Inspection et historique avant tout achat', 'Chambéry · Paris · 4,9 sur Google']

/* Les quatre arguments du brief, dans la grille de valeur Corsiva OS : trois cartes charbon,
   la quatrième — l'appartenance au groupe — en carte spotlight bleue. */
export default function Arguments({ title = ['Le prix allemand,', 'sans une seule contrainte.'], lead }: { title?: [string, string]; lead?: string }) {
  return (
    <Section glow id="arguments" className="!pt-10">
      <Wrap>
        <SecHead a={title[0]} b={title[1]}>{lead}</SecHead>
        <Reveal className="fvgrid">
          {ARGUMENTS.map((a, i) => {
            const spot = i === ARGUMENTS.length - 1
            return (
              <div key={a.title} className={`rise ${spot ? 'fvspot' : 'fvcard'}`} style={d(0.07 * i)}>
                <span className="fvi" aria-hidden="true"><svg viewBox="0 0 24 24">{ICONS[i % ICONS.length]}</svg></span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className="fvmeta">{META[i]}</span>
              </div>
            )
          })}
        </Reveal>
      </Wrap>
    </Section>
  )
}
