import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead } from '@/components/ui'
import { euro, PLAFOND_MALUS, ANNEE_BAREME } from '@/lib/malus'

/* Bloc éditorial de référencement : les mots que les clients tapent (import voiture de luxe, malus écologique,
   immatriculation à l'étranger), écrits pour être lus, avec les liens internes vers chaque service. */
export default function SeoTexte() {
  return (
    <Section id="guide" grad>
      <Wrap className="max-w-4xl">
        <SecHead a="Importer une voiture de luxe" b="d’Allemagne, sans malus : le guide.">Ce qu’il faut savoir avant d’acheter votre prochaine BMW, Mercedes ou Porsche outre-Rhin.</SecHead>
        <Reveal className="rise grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 text-[15px] leading-[1.7]" style={{ color: 'var(--ink-2)' }}>
          <div>
            <h3 className="text-[20px] text-white mb-2">Pourquoi importer une voiture de luxe d’Allemagne ?</h3>
            <p>Le marché allemand est le plus profond d’Europe : plus de choix, des configurations rares et des prix constructeurs souvent inférieurs de plusieurs dizaines de milliers d’euros à ceux pratiqués en France. Grâce à notre réseau de <Link href="/import" className="underline underline-offset-4 decoration-1 hover:text-white">concessions partenaires en Allemagne</Link>, Corsiva Prime déniche chaque mois cinq pépites, négocie la remise et gère l’import de A à Z : inspection, transport fermé privé, formalités.</p>
          </div>
          <div>
            <h3 className="text-[20px] text-white mb-2">Éviter le malus écologique {ANNEE_BAREME}</h3>
            <p>En France, le malus à l’immatriculation frappe les véhicules puissants dès 108 g/km de CO₂ et atteint son plafond de {euro(PLAFOND_MALUS)} à 192 g/km, auquel s’ajoute le malus au poids. Une BMW M3 Competition ou une Mercedes Classe G neuve sont au plafond. En immatriculant le véhicule dans une <Link href="/immatriculation" className="underline underline-offset-4 decoration-1 hover:text-white">structure européenne encadrée</Link>, ce malus n’est pas supporté : mesurez l’écart avec notre <Link href="/simulateur" className="underline underline-offset-4 decoration-1 hover:text-white">simulateur de malus</Link>.</p>
          </div>
          <div>
            <h3 className="text-[20px] text-white mb-2">Immatriculation à l’étranger et TVA</h3>
            <p>La structure européenne, assujettie à la TVA, achète le véhicule hors taxes en Allemagne et récupère la TVA : 20 % du prix d’achat ne sont pas supportés. Le véhicule circule librement dans toute l’Union européenne, avec une assurance simplifiée et allégée. Le montage est structuré avec nos avocats partenaires, en France et en Bulgarie, en toute conformité : <Link href="/contact" className="underline underline-offset-4 decoration-1 hover:text-white">prenez un appel</Link> pour en connaître les détails.</p>
          </div>
          <div>
            <h3 className="text-[20px] text-white mb-2">Combien ça coûte, et en combien de temps ?</h3>
            <p>Sur la page <Link href="/import#pepites" className="underline underline-offset-4 decoration-1 hover:text-white">Import</Link>, chaque pépite du mois affiche son prix négocié, transport et formalités inclus, face au prix constructeur en France ; avec l’immatriculation européenne, le malus et la TVA ne sont pas supportés. Comptez environ cinq semaines de l’accord à la livraison, <Link href="/comment-ca-fonctionne" className="underline underline-offset-4 decoration-1 hover:text-white">en cinq phases</Link>. Nos conseillers vous reçoivent à Paris et se déplacent à Lyon, Chambéry, Annecy et partout en France.</p>
          </div>
        </Reveal>
      </Wrap>
    </Section>
  )
}
