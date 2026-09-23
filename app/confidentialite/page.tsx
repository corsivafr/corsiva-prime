import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { SITE } from '@/lib/site'

export const metadata: Metadata = { title: 'Politique de confidentialité', robots: { index: false, follow: true }, alternates: { canonical: `${SITE.url}/confidentialite` } }

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" updated="16 septembre 2026">
      <section>
        <h2>Responsable du traitement</h2>
        <p>{SITE.legalEntity} ({SITE.legalCountry}), entité du groupe Corsiva — <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <p>Nous collectons uniquement les données que vous nous transmettez : via le simulateur (téléphone, e-mail, véhicule visé, paramètres de simulation) et via le formulaire de contact (nom, téléphone, e-mail, service souhaité, description du projet). Le site n’utilise pas de cookies publicitaires ; une mesure d’audience agrégée et anonyme est réalisée par l’hébergeur (Vercel Analytics), sans cookie.</p>
      </section>
      <section>
        <h2>Finalités et base légale</h2>
        <p>Vos données servent à traiter votre demande, vous adresser le résultat de votre simulation, vous recontacter au sujet de votre projet et établir une proposition. Base légale : votre consentement et les mesures précontractuelles prises à votre demande (article 6 du RGPD).</p>
      </section>
      <section>
        <h2>Destinataires et conservation</h2>
        <p>Les données sont transmises par e-mail à l’équipe Corsiva Prime via le prestataire Resend et ne sont jamais cédées à des tiers. Elles sont conservées le temps du traitement de votre demande puis, sans suite commerciale, au plus trois ans après le dernier contact.</p>
      </section>
      <section>
        <h2 id="cookies">Cookies et traceurs</h2>
        <p>Le site ne dépose aucun cookie publicitaire ni traceur tiers. La mesure d’audience repose sur Vercel Web Analytics (Vercel Inc., sous-traitant), exemptée de consentement : aucun cookie, aucun identifiant persistant, aucun suivi entre sites, données agrégées. Votre choix exprimé dans le bandeau cookies est mémorisé six mois dans le stockage local de votre navigateur (clé <code>corsiva_prime_consent</code>) ; une mémoire de session évite de réafficher l’écran d’ouverture et le pop-up des pépites. Vous pouvez modifier votre choix à tout moment via le lien « Gérer mes cookies » en pied de page.</p>
        <h2>Vos droits</h2>
        <p>Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Écrivez à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Vous pouvez également saisir l’autorité de contrôle compétente (en France, la CNIL).</p>
      </section>
    </LegalPage>
  )
}
