/* Données du site — reprises du brief « Document Corsiva Prime » (16 sept. 2026). Aucun chiffre
   inventé : les exemples, phases et arguments sont ceux du dirigeant. */

export const SITE = {
  name: 'Corsiva Prime',
  url: 'https://corsiva-prime.vercel.app',
  phone: '04 80 81 91 38',
  phoneTel: 'tel:+33480819138',
  whatsapp: 'https://wa.me/33780997692?text=' + encodeURIComponent('Bonjour, je souhaite des informations sur Corsiva Prime (import et immatriculation).'),
  email: 'prime@corsiva.fr',
  group: 'Corsiva',
  legalEntity: 'Corsiva Good',
  legalCountry: 'Bulgarie',
  villes: ['Paris', 'Lyon', 'Chambéry', 'Annecy'],
}

/* Chiffres donnés par le dirigeant (18 sept. 2026). */
export const STATS = {
  voitures: 48, // véhicules déjà immatriculés avec Corsiva Prime
  avisGoogle: '+100',
  noteGoogle: '4,9',
}

export const NAV = [
  { label: 'Zéro malus', href: '/immatriculation' },
  { label: 'Import', href: '/import' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Comment ça fonctionne', href: '/comment-ca-fonctionne' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Contact', href: '/contact' },
]

export const ARGUMENTS = [
  {
    title: 'Zéro malus, zéro TVA',
    text: 'Le véhicule est porté par une société de location européenne, structurée avec nos avocats partenaires : le malus français (jusqu’à 80 000 €) et la TVA (20 %) ne sont pas supportés.',
  },
  {
    title: 'Le vrai prix allemand',
    text: 'En Allemagne, la même voiture coûte des milliers d’euros de moins. Grâce à notre réseau de concessions partenaires et à leurs remises négociées, Corsiva Prime vous fait profiter de cet écart sans contrainte.',
  },
  {
    title: 'Tout est géré, de A à Z',
    text: 'Sourcing, contrôle, transport, fiscalité, carte grise. On s’occupe de tout. Vous n’avez qu’à récupérer les clés.',
  },
  {
    title: 'Notre expertise à votre service',
    text: 'Inspection, historique, négociation. Vous achetez la bonne voiture, au bon prix et en toute confiance.',
  },
  {
    title: 'Une entité du groupe Corsiva',
    text: `Plus de ${STATS.voitures} voitures déjà immatriculées avec Corsiva Prime. L’exigence premium, déjà éprouvée : location de prestige, conciergerie et sourcing depuis Chambéry, ${STATS.noteGoogle} sur Google (${STATS.avisGoogle} avis).`,
  },
]

export const PHASES = [
  {
    n: '01',
    title: 'Validation',
    duree: '2 à 3 jours',
    text: 'Cahier des charges, véhicule souhaité, objectif : configuration, budget, calendrier. Validation du modèle cible.',
  },
  {
    n: '02',
    title: 'Sourcing Allemagne',
    duree: '1 à 2 semaines',
    text: 'Qualification des annonces, présélection pour validation client, négociation et contrôle documentaire auprès de la concession.',
  },
  {
    n: '03',
    title: 'Structuration européenne',
    duree: '1 à 2 semaines, en parallèle · déplacement 3 à 4 jours',
    text: 'Création de la société de location porteuse avec avocat partenaire : dépôt de capital, ouverture bancaire, acte notarié. Déplacement organisé, hôtel 5 étoiles, transports et restauration inclus.',
  },
  {
    n: '04',
    title: 'Acquisition et immatriculation',
    duree: '1 semaine',
    text: 'Virement à la concession, préparation du véhicule, acheminement, immatriculation, récupération de TVA, pose de covering si l’option est retenue.',
  },
  {
    n: '05',
    title: 'Livraison France',
    duree: '2 à 4 jours',
    text: 'Transport fermé privé, mise en exploitation immédiate.',
  },
]

export const FAQ = [
  { q: 'Combien de temps ça prend ?', a: 'Environ 5 semaines, de l’accord à la livraison.' },
  { q: 'Où puis-je rouler avec le véhicule ?', a: 'Partout dans l’Union européenne.' },
  { q: 'Et l’assurance ?', a: 'Une couverture adaptée, souvent plus simple et plus avantageuse.' },
  { q: 'Puis-je faire seulement l’import, sans l’immatriculation européenne ?', a: 'Oui, tout à fait : les deux services sont indépendants.' },
  { q: 'Comment êtes-vous rémunérés ?', a: 'Une proposition personnalisée, indexée sur la valeur réellement créée.' },
]

/* Avis clients réels du groupe Corsiva (location premium), publiés sur Google et Mariages.net. */
export const AVIS = [
  { nom: 'Sonia', source: 'Google', texte: 'Le rendu était incroyable sur les photos et vidéos. Les chauffeurs ont été parfaits.' },
  { nom: 'Marc', source: 'Mariages.net', texte: 'La voiture était magnifique, décorée avec soin, et le chauffeur d’une gentillesse et d’un professionnalisme à toute épreuve.' },
  { nom: 'Wilfried', source: 'Mariages.net', texte: 'Notre conseiller a tout fait pour que tout se passe bien. Le chauffeur était très agréable et professionnel.' },
  { nom: 'Manon', source: 'Mariages.net', texte: '…nous ne pouvions pas rêver mieux.' },
]
