import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Arrow, d } from '@/components/ui'
import { FICHES, CATS_ACQ, budgetPrime, economie, type Fiche } from '@/lib/acquisitions'
import { euro } from '@/lib/malus'

/* Bas d'article : trois fiches du catalogue Zéro malus, avec nos photos, qui renvoient vers le site
   (la fiche s'ouvre sur /immatriculation), puis vers l'ensemble du catalogue et l'accueil. */
export default function FichesArticle({ ids }: { ids: string[] }) {
  const list = [...ids, ...FICHES.map((f) => f.id)]
    .filter((id, i, all) => all.indexOf(id) === i)
    .map((id) => FICHES.find((f) => f.id === id))
    .filter((f): f is Fiche => Boolean(f))
    .slice(0, 3)
  return (
    <Section id="vehicules">
      <Wrap>
        <SecHead a="Nos véhicules," b="sur le site Corsiva Prime.">Chaque fiche compare le prix en France, malus compris, au prix du véhicule hors taxes avec l’immatriculation européenne.</SecHead>
        <Reveal className="artgrid artgrid-3">
          {list.map((f, i) => {
            const p = f.photos[0]
            return (
              <Link key={f.id} href={`/immatriculation?fiche=${f.id}#catalogue`} className="artcard lift rise" style={d(0.06 * i)}>
                <div className="artcard-media zoom-media">
                  <Image src={p.src} alt={p.alt} fill quality={78} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" style={{ objectPosition: p.pos || 'center' }} />
                </div>
                <div className="artcard-body">
                  <span className="artcard-meta">{f.marque} · {CATS_ACQ[f.cat]} · {f.annee}</span>
                  <h3>{f.modele}</h3>
                  <p>Prix en France {euro(f.prixFranceTTC)}, prix du véhicule ≈ {euro(budgetPrime(f))} hors taxes : économie ≈ {euro(economie(f))}.</p>
                  <span className="artcard-more">Voir la fiche sur le site <Arrow /></span>
                </div>
              </Link>
            )
          })}
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Link href="/#catalogue" className="btn-cta">Voir tous nos véhicules <Arrow /></Link>
          <Link href="/" className="btn-w">Accueil du site</Link>
        </div>
      </Wrap>
    </Section>
  )
}
