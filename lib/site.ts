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
  calendly: 'https://calendly.com/corsiva/nouvelle-reunion', // Calendly du groupe, déjà utilisé sur corsiva-os.com
}

/* Images des heros : une version 1920 px et un recadrage 9:16 pour mobile, préchargées par l'écran
   de chargement pour que chaque page s'ouvre avec son fond déjà affiché. */
export const HERO_IMAGES = {
  home: { d: '/media/hero/home.jpg', m: '/media/hero/home-m.jpg' },
  import: { d: '/media/hero/import.jpg', m: '/media/hero/import-m.jpg' },
  malus: { d: '/media/hero/malus.jpg', m: '/media/hero/malus-m.jpg' },
  articles: { d: '/media/hero/articles.jpg', m: '/media/hero/articles-m.jpg' },
  process: { d: '/media/hero/process.jpg', m: '/media/hero/process-m.jpg' },
  tarifs: { d: '/media/hero/tarifs.jpg', m: '/media/hero/tarifs-m.jpg' },
  simulateur: { d: '/media/hero/simulateur.jpg', m: '/media/hero/simulateur-m.jpg' },
  contact: { d: '/media/hero/contact.jpg', m: '/media/hero/contact-m.jpg' },
} as const
export type HeroKey = keyof typeof HERO_IMAGES

/* Chiffres donnés par le dirigeant (18 sept. 2026). */
export const STATS = {
  voitures: 48, // véhicules déjà immatriculés avec Corsiva Prime
  avisGoogle: '+100',
  noteGoogle: '4,9',
}

export const NAV = [
  { label: 'Zéro malus', href: '/immatriculation' },
  { label: 'Import', href: '/import' },
  { label: 'Comment ça fonctionne', href: '/comment-ca-fonctionne' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
]

export const ARGUMENTS = [
  {
    title: 'Zéro malus, zéro TVA',
    text: 'Le véhicule est porté par une structure européenne encadrée par nos avocats partenaires : le malus français (jusqu’à 80 000 €) et la TVA (20 %) ne sont pas supportés.',
  },
  {
    title: 'Le vrai prix allemand',
    text: 'En Allemagne, la même voiture coûte des milliers d’euros de moins. Grâce à notre réseau de concessions partenaires et à leurs remises négociées, Corsiva Prime déniche la pépite et négocie le deal pour vous.',
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
    text: `Plus de ${STATS.voitures} voitures déjà immatriculées avec Corsiva Prime. L’exigence premium du groupe Corsiva, déjà éprouvée : ${STATS.noteGoogle} sur Google (${STATS.avisGoogle} avis).`,
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
    text: 'Mise en place de la structure européenne avec nos avocats partenaires. Déplacement organisé, hôtel 5 étoiles, transports et restauration inclus. Les détails vous sont présentés lors d’un appel.'
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
  { q: 'Comment éviter le malus écologique sur une voiture de luxe importée d’Allemagne ?', a: 'En l’immatriculant dans une structure européenne encadrée par nos avocats partenaires : le malus français à l’immatriculation (jusqu’à 80 000 € en 2026) et la TVA de 20 % ne sont pas supportés. Le véhicule circule librement dans toute l’Union européenne.' },
  { q: 'Quelles voitures importez-vous d’Allemagne ?', a: 'Toutes les marques premium disponibles chez nos concessions partenaires : BMW M, Mercedes-AMG et Classe G, Porsche, Audi RS, Lamborghini, Bentley… Chaque mois, cinq pépites négociées sont publiées sur la page Import, avec leur tarif tout compris.' },
  { q: 'Où intervenez-vous ?', a: 'Partout en France. Nos conseillers vous reçoivent à Paris et se déplacent à Lyon, Chambéry, Annecy et dans toute la France ; la voiture est livrée chez vous en transport fermé privé.' },
]
