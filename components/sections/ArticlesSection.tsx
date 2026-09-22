import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Arrow, d } from '@/components/ui'
import { ARTICLES, type Article } from '@/lib/articles'

export const dateFR = (iso: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(iso))

/* Carte d'article : photo, durée de lecture, titre, chapeau — même grammaire que les cartes de valeur OS. */
export function ArticleCard({ a, i = 0, priority = false }: { a: Article; i?: number; priority?: boolean }) {
  return (
    <Link href={`/articles/${a.slug}`} className="artcard lift rise" style={d(0.06 * i)}>
      <div className="artcard-media zoom-media">
        <Image src={a.cover} alt={a.coverAlt} fill priority={priority} quality={78} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover" />
      </div>
      <div className="artcard-body">
        <span className="artcard-meta">{a.minutes} min de lecture · {dateFR(a.updated)}</span>
        <h3>{a.title}</h3>
        <p>{a.description}</p>
        <span className="artcard-more">Lire l’article <Arrow /></span>
      </div>
    </Link>
  )
}

/* Section « guides » : sur la home (les quatre plus récents + lien vers la rubrique) et en bas de chaque article
   (trois guides liés, sinon les trois plus récents). Le référencement passe par ces pages : elles répondent aux recherches sur le malus,
   l'import d'Allemagne et l'immatriculation européenne. */
export default function ArticlesSection({ exclude, related, a = 'Comprendre le malus,', b = 'avant d’acheter.', lead = 'Nos guides pour lire le barème 2026, comprendre l’import allemand, choisir où immatriculer et acheter au juste prix, à Paris, Lyon ou Annecy.', more = true }: { exclude?: string; related?: string[]; a?: string; b?: string; lead?: string; more?: boolean }) {
  const autres = ARTICLES.filter((x) => x.slug !== exclude)
  const recents = [...autres].sort((p, q) => q.updated.localeCompare(p.updated))
  const lies = (related ?? []).map((slug) => autres.find((x) => x.slug === slug)).filter((x): x is Article => Boolean(x))
  const list = exclude ? (lies.length >= 3 ? lies.slice(0, 3) : [...lies, ...recents.filter((x) => !lies.includes(x))].slice(0, 3)) : recents.slice(0, 4)
  return (
    <Section id="articles" grad>
      <Wrap>
        <SecHead a={a} b={b}>{lead}</SecHead>
        <Reveal className={`artgrid ${exclude ? 'artgrid-3' : ''}`}>
          {list.map((x, i) => <ArticleCard key={x.slug} a={x} i={i} />)}
        </Reveal>
        {more && (
          <Reveal className="rise flex justify-center mt-8">
            <Link href="/articles" className="btn-w">Tous les articles ({ARTICLES.length}) <Arrow /></Link>
          </Reveal>
        )}
      </Wrap>
    </Section>
  )
}
