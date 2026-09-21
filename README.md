# Corsiva Prime — site web

Import de véhicules premium depuis l'Allemagne et immatriculation en société européenne. Entité du groupe Corsiva.

## Stack

Next.js 14 (app router, TypeScript strict), Tailwind + variables CSS, `next/image`, `next/font` (Geist display + Inter corps), Resend pour les e-mails, Vercel.

## Développement

```bash
npm install
npm run dev          # http://localhost:4340
```

Build de production (sur un dossier iCloud, écrire dans `.next.nosync`) :

```bash
NEXT_TELEMETRY_DISABLED=1 NEXT_DIST_DIR=.next.nosync npm run build
NEXT_DIST_DIR=.next.nosync npm run start
```

## Variables d'environnement

Copier `.env.example` en `.env.local` (jamais versionné) :

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | clé Resend (envoi des leads simulateur + contact) |
| `PRIME_LEADS_TO` | destinataires des leads, séparés par des virgules |
| `RESEND_FROM` | expéditeur (`Corsiva Prime <prime@corsiva.fr>` une fois le domaine vérifié chez Resend) |

Sans clé, les routes API répondent quand même : le simulateur affiche le résultat et le lead est journalisé côté serveur.

## Où vit quoi

- `lib/site.ts` — textes du brief (arguments, phases, FAQ, coordonnées, chiffres du dirigeant) ; `lib/catalogue.ts` — véhicules, chiffres et packages.
- `lib/malus.ts` — barèmes légaux 2026 (malus CO₂, malus au poids, décote occasion) et la règle de calcul du simulateur. Sources : LF n° 2025-127, fiche service-public F35947.
- `components/Simulateur.tsx` — le simulateur (déverrouillage téléphone + e-mail, POST `/api/simulation`).
- `app/api/simulation`, `app/api/contact` — envoi Resend (équipe + copie au prospect), échappement HTML, pot de miel.
- `app/globals.css` — tokens de la DA (sombre + sections claires `.light`), boutons, cartes, révélations.
