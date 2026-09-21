import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, d } from '@/components/ui'
import { ARGUMENTS, STATS } from '@/lib/site'

const ICONS = [
  <path key="a" d="M4 14c2-6 6-9 8-9s6 3 8 9M7 14h10l-1 5H8zM9 5V3M15 5V3" />,
  <><path key="b1" d="M3 21h18M5 21V8l7-4 7 4v13" /><path key="b2" d="M9 21v-6h6v6M9 11h2M13 11h2" /></>,
  <path key="c" d="M4 12h16M4 7h10M4 17h7" />,
  <path key="d" d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8z" />,
  <path key="e" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />,
]
const META = ['Montage structuré avec nos avocats partenaires', 'Concessions partenaires en Allemagne', 'Un seul interlocuteur, du sourcing aux plaques', 'Inspection et historique avant tout achat', `+${STATS.voitures} voitures immatriculées · ${STATS.noteGoogle} sur Google, ${STATS.avisGoogle} avis`]

/* Les arguments, dans la grille de valeur Corsiva OS : quatre cartes charbon, la cinquième — l'appartenance
   au groupe et les voitures déjà immatriculées — en carte spotlight bleue sur deux colonnes. */
export default function Arguments({ title = ['Le prix allemand,', 'sans malus ni contrainte.'], lead }: { title?: [string, string]; lead?: string }) {
  return (
    <Section glow id="arguments" className="!pt-10">
      <Wrap>
        <SecHead a={title[0]} b={title[1]}>{lead}</SecHead>
        <Reveal className="fvgrid3">
          {ARGUMENTS.map((a, i) => {
            const spot = i === ARGUMENTS.length - 1
            return (
              <div key={a.title} className={`rise ${spot ? 'fvspot span2' : 'fvcard'}`} style={d(0.07 * i)}>
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
