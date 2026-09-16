import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { SITE } from '@/lib/site'

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false, follow: true }, alternates: { canonical: `${SITE.url}/mentions-legales` } }

/* Les champs entre crochets sont à compléter par la direction avec les données d'immatriculation
   de la société : ils sont volontairement visibles pour ne pas publier d'information inventée. */
export default function Page() {
  return (
    <LegalPage title="Mentions légales" updated="16 septembre 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>Le site {SITE.url.replace('https://', '')} est édité par <strong>{SITE.legalEntity}</strong>, société de droit bulgare, entité du groupe Corsiva.</p>
        <ul>
          <li>Forme, capital et numéro d’immatriculation : <mark>[à compléter]</mark></li>
          <li>Siège social : <mark>[adresse à compléter]</mark>, {SITE.legalCountry}</li>
          <li>Numéro de TVA intracommunautaire : <mark>[à compléter]</mark></li>
          <li>Directeur de la publication : Jivko Bregou</li>
          <li>Contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.phoneTel}>{SITE.phone}</a></li>
        </ul>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>.</p>
      </section>
      <section>
        <h2>Nature des services</h2>
        <p>Corsiva Prime propose un service d’accompagnement à l’acquisition de véhicules en Allemagne (sourcing, contrôle, négociation, transport, formalités) et un service de structuration d’une société européenne de location destinée à porter le véhicule, mis en œuvre avec des avocats partenaires en Bulgarie et en France.</p>
        <p>Les informations publiées sur ce site, y compris les exemples chiffrés et le simulateur, sont indicatives et non contractuelles. Elles ne constituent ni un conseil juridique ou fiscal personnalisé, ni une offre ferme. Chaque projet fait l’objet d’une proposition écrite et d’une validation de sa situation particulière avec les conseils compétents.</p>
      </section>
      <section>
        <h2>Barèmes et sources</h2>
        <p>Le simulateur applique le barème français {new Date().getFullYear() === 2026 ? '2026' : '2026'} du malus à l’immatriculation (loi de finances n° 2025-127 du 14 février 2025 ; fiche service-public.gouv.fr F35947) et une TVA de 20 % sur le prix d’achat hors taxes. Les montants réels dépendent des données figurant sur le certificat de conformité du véhicule et de la réglementation en vigueur au jour de l’immatriculation.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>L’ensemble des contenus du site (textes, photographies, vidéos, logotypes, mise en page) est protégé par le droit d’auteur et le droit des marques. Toute reproduction sans autorisation écrite est interdite. Les marques automobiles citées appartiennent à leurs propriétaires respectifs ; Corsiva Prime est un intermédiaire indépendant, sans lien avec les constructeurs.</p>
      </section>
      <section>
        <h2>Données personnelles</h2>
        <p>Voir la <a href="/confidentialite">politique de confidentialité</a>.</p>
      </section>
    </LegalPage>
  )
}
