import { euro, malusCO2, malusMasse, simuler, ANNEE_BAREME, PLAFOND_MALUS, SEUIL_CO2, SEUIL_MASSE } from '@/lib/malus'
import { VEHICULES } from '@/lib/catalogue'

/* ─────────────────────────────────────────────────────────────────────────────
   Articles de référencement. Chaque chiffre légal vient de lib/malus.ts (loi de finances n° 2025-127,
   fiche service-public F35947) ; les prix des exemples viennent du brief (VEHICULES). Rien d'autre n'est
   affirmé : sur la structure européenne, les articles renvoient à un appel avec un conseiller.
   ───────────────────────────────────────────────────────────────────────────── */

export type Bloc = { h2: string; paras?: string[]; list?: string[]; note?: string }
export type Article = {
  slug: string
  title: string
  metaTitle: string
  h1: [string, string]
  description: string
  date: string
  updated: string
  cover: string
  coverAlt: string
  minutes: number
  keywords: string[]
  intro: string
  blocs: Bloc[]
  faq?: { q: string; a: string }[]
}

const m3 = VEHICULES.find((v) => v.id === 'm3')!.chiffres!
const g = VEHICULES.find((v) => v.id === 'g')!.chiffres!
const p911 = VEHICULES.find((v) => v.id === '911-gts')!.chiffres!
const rM3 = simuler(m3), rG = simuler(g), r911 = simuler(p911)

export const ARTICLES: Article[] = [
  {
    slug: 'eviter-malus-ecologique-2026',
    metaTitle: `Éviter le malus écologique ${ANNEE_BAREME} : guide`,
    title: `Éviter le malus écologique ${ANNEE_BAREME} : le guide complet`,
    h1: ['Éviter le malus écologique', `${ANNEE_BAREME} : le guide complet.`],
    description: `Barème ${ANNEE_BAREME} du malus CO₂ et du malus au poids, plafond de ${euro(PLAFOND_MALUS)}, décote des occasions importées, et les solutions légales pour ne pas le supporter.`,
    date: '2026-09-21',
    updated: '2026-09-21',
    cover: '/media/photos/m3-lac-1.jpg',
    coverAlt: 'BMW M3 Competition au bord du lac, un modèle au plafond du malus en France',
    minutes: 7,
    keywords: ['malus écologique 2026', 'éviter le malus', 'malus CO2', 'malus au poids', 'plafond malus 80 000 €', 'malus occasion importée'],
    intro: `Le malus à l’immatriculation est devenu le premier poste de coût d’une voiture puissante achetée en France : jusqu’à ${euro(PLAFOND_MALUS)} en ${ANNEE_BAREME}, avant même de parler du prix du véhicule. Voici comment il se calcule, ce qui a changé, et les leviers légaux pour ne pas le subir.`,
    blocs: [
      { h2: `Comment se calcule le malus CO₂ en ${ANNEE_BAREME}`, paras: [
        `Le malus CO₂ se déclenche à partir de ${SEUIL_CO2} g/km (norme WLTP) et grimpe gramme par gramme : ${euro(malusCO2(120))} à 120 g/km, ${euro(malusCO2(150))} à 150 g/km, ${euro(malusCO2(170))} à 170 g/km, ${euro(malusCO2(190))} à 190 g/km. Le plafond de ${euro(PLAFOND_MALUS)} est atteint dès 192 g/km.`,
        'Concrètement, toutes les sportives et les gros SUV thermiques sont au plafond : une BMW M3 Competition, une Mercedes Classe G ou une Porsche 911 GTS neuves paient le maximum, quel que soit leur prix.',
      ] },
      { h2: 'Le malus au poids s’ajoute', paras: [
        `Depuis ${ANNEE_BAREME}, le malus au poids frappe dès ${SEUIL_MASSE} kg en ordre de marche : 10 € par kilo jusqu’à 1 699 kg, puis 15, 20, 25 et 30 €/kg au-delà de 2 000 kg. Une Classe G d’environ 2 545 kg supporte ainsi ${euro(malusMasse(2545, 'thermique'))} de malus au poids à elle seule.`,
        `Bonne nouvelle : le cumul des deux malus est plafonné à ${euro(PLAFOND_MALUS)}. Les véhicules électriques en sont exonérés et les hybrides rechargeables d’autonomie supérieure à 50 km bénéficient d’un abattement de 200 kg.`,
      ] },
      { h2: 'Et pour une occasion importée ?', paras: [
        'Un véhicule d’occasion importé et immatriculé pour la première fois en France paie le malus CO₂, décoté selon son ancienneté : 3 % le premier trimestre, 12 % à un an, 20 % à deux ans, 38 % à cinq ans… jusqu’à l’exonération au-delà de quinze ans.',
        `Exemple : une Porsche 911 GTS d’environ un an (hypothèse retenue), à 255 g/km, garde ${euro(r911.malusCO2)} de malus CO₂ après décote, plus ${euro(r911.malusMasse)} de malus au poids.`,
      ] },
      { h2: 'Les leviers légaux pour ne pas le supporter', list: [
        'Choisir un véhicule électrique ou un hybride rechargeable, quand c’est le véhicule que vous voulez.',
        'Immatriculer le véhicule dans un autre État membre de l’Union européenne, au sein d’une structure européenne encadrée : le malus français à l’immatriculation ne s’applique pas, et la TVA de 20 % n’est pas supportée par une structure assujettie.',
        'Acheter en Allemagne, où le même modèle coûte souvent des dizaines de milliers d’euros de moins, remises négociées comprises.',
      ], note: 'Corsiva Prime combine ces trois leviers pour ses clients, avec des avocats partenaires en France et en Bulgarie. Les détails de la structure vous sont présentés lors d’un appel.' },
      { h2: 'Combien pouvez-vous économiser ?', paras: [
        `Sur une BMW M3 Competition neuve : ${euro(m3.prixFranceTTC)} en France contre ${euro(m3.prixAllemagneHT)} hors taxes en Allemagne, soit ${euro(rM3.ecartAchat)} d’écart de prix, auxquels s’ajoutent ${euro(rM3.malusTotal)} de malus et ${euro(rM3.tvaEvitee)} de TVA non supportés : ${euro(rM3.avantageTotal)} d’avantage total estimé.`,
        'Le simulateur applique la règle complète à votre propre véhicule, gramme par gramme et kilo par kilo.',
      ] },
    ],
    faq: [
      { q: 'Le malus se paie-t-il chaque année ?', a: 'Non : le malus CO₂ et le malus au poids sont dus une seule fois, à la première immatriculation du véhicule en France.' },
      { q: 'Peut-on récupérer le malus déjà payé ?', a: 'Le malus n’est pas remboursé lors de la revente en France. La bonne question se pose avant l’achat : où immatriculer le véhicule.' },
    ],
  },
  {
    slug: 'importer-voiture-luxe-allemagne-guide',
    metaTitle: 'Importer une voiture d’Allemagne : guide',
    title: 'Importer une voiture de luxe d’Allemagne : le guide étape par étape',
    h1: ['Importer une voiture de luxe', 'd’Allemagne, étape par étape.'],
    description: 'Pourquoi l’Allemagne, comment lire un prix hors taxes, quelles formalités (quitus fiscal, certificat de conformité) et les pièges à éviter.',
    date: '2026-09-21',
    updated: '2026-09-21',
    cover: '/media/photos/m3-garage-3-4.jpg',
    coverAlt: 'BMW M3 Competition importée d’Allemagne dans le garage Corsiva',
    minutes: 8,
    keywords: ['import voiture Allemagne', 'import voiture de luxe', 'mandataire Allemagne', 'quitus fiscal', 'certificat de conformité', 'acheter une voiture en Allemagne'],
    intro: 'L’Allemagne est le premier marché automobile d’Europe : plus de choix, des configurations introuvables en France et des prix constructeurs souvent inférieurs. Mais importer une voiture de luxe demande de la méthode. Voici les étapes, telles que nous les pratiquons chaque semaine.',
    blocs: [
      { h2: '1. Définir la voiture, pas seulement le modèle', paras: [
        'Finition, motorisation, couleur, jantes, packs : en Allemagne, la configuration fait le prix et la disponibilité. Un cahier des charges précis évite d’acheter « presque » la bonne voiture. Chez Corsiva Prime, cette phase de validation prend deux à trois jours.',
      ] },
      { h2: '2. Sourcer chez des concessions partenaires', paras: [
        'Les meilleures voitures ne sont pas toujours sur les portails d’annonces. Notre réseau de concessions partenaires nous confie ses pépites, neuves configurables ou occasions récentes, et accepte des remises négociées qu’un particulier étranger obtient rarement seul.',
        'Chaque véhicule est inspecté : historique d’entretien, kilométrage, état réel, documents. Rien n’est acheté sur une photo.',
      ] },
      { h2: '3. Lire un prix allemand', paras: [
        'Les prix professionnels sont affichés hors taxes (netto). Un particulier qui importe paie la TVA française de 20 % à l’immatriculation en France ; une structure européenne assujettie achète hors taxes et récupère la TVA. C’est tout l’enjeu du choix entre un import classique et une immatriculation européenne.',
      ] },
      { h2: '4. Les formalités françaises', list: [
        'Le quitus fiscal, délivré par le service des impôts, atteste que la TVA a été traitée : il est indispensable pour immatriculer en France un véhicule acheté dans l’Union.',
        'Le certificat de conformité européen (COC) du constructeur, pour éviter la réception à titre isolé.',
        'La demande de carte grise, puis les plaques françaises.',
      ], note: 'Dans le package Import de Corsiva Prime, ces formalités sont gérées de bout en bout ; comptez trois à quatre semaines de l’accord à la livraison.' },
      { h2: '5. Le transport', paras: [
        'Un camion fermé privé jusqu’à votre adresse : aucun kilomètre inutile, aucune exposition. La voiture arrive telle qu’elle a quitté la concession.',
      ] },
      { h2: 'Les pièges à éviter', list: [
        'Le prix « TTC » d’un professionnel allemand qui inclut la TVA allemande : elle n’est pas récupérable pour un particulier français et se cumule avec la TVA française.',
        'Une occasion sans historique complet ou sans COC.',
        'Oublier le malus : sur une sportive, il dépasse souvent l’économie réalisée sur le prix. La page Zéro malus explique comment ne pas le supporter.',
      ] },
    ],
  },
  {
    slug: 'immatriculation-etranger-societe-europeenne',
    metaTitle: 'Immatriculation à l’étranger : le cadre',
    title: 'Immatriculation à l’étranger : ce qu’il faut vérifier avant de se lancer',
    h1: ['Immatriculation à l’étranger :', 'ce qu’il faut vérifier.'],
    description: 'Immatriculer sa voiture dans une structure européenne pour éviter le malus et la TVA : cadre européen, assurance, circulation et garanties à exiger.',
    date: '2026-09-21',
    updated: '2026-09-21',
    cover: '/media/photos/taycan-profil.jpg',
    coverAlt: 'Porsche Taycan de profil, exemple de véhicule immatriculé dans une structure européenne',
    minutes: 6,
    keywords: ['immatriculation à l’étranger', 'société européenne voiture', 'immatriculation Bulgarie', 'TVA intracommunautaire voiture', 'plaques étrangères légal'],
    intro: 'Les offres d’« immatriculation à l’étranger » se multiplient, et toutes ne se valent pas. Voici les questions à poser, et les réponses que Corsiva Prime apporte avec ses avocats partenaires.',
    blocs: [
      { h2: 'Le principe', paras: [
        'Le malus français à l’immatriculation s’applique aux véhicules immatriculés en France. Un véhicule porté par une structure établie dans un autre État membre, et immatriculé dans cet État, n’y est pas soumis. Une structure assujettie à la TVA achète par ailleurs hors taxes et récupère la TVA : 20 % du prix ne sont pas supportés.',
        'Le véhicule circule librement dans toute l’Union européenne, avec une assurance adaptée, souvent plus simple et moins coûteuse.',
      ] },
      { h2: 'Ce qu’il faut exiger', list: [
        'Un montage structuré par des avocats, en France et dans le pays d’immatriculation, et non un simple intermédiaire.',
        'Des documents contrôlés à chaque phase : acquisition, immatriculation, assurance.',
        'Une transparence totale sur le rôle de la structure et sur vos obligations d’utilisateur.',
        'Une équipe joignable, qui a déjà réalisé l’opération : Corsiva Prime a immatriculé plus de 48 voitures de cette façon.',
      ] },
      { h2: 'Ce que nous ne détaillons pas en ligne', paras: [
        'Le fonctionnement précis de la structure dépend de votre situation. Nos conseillers vous le présentent de vive voix, avec nos avocats partenaires si nécessaire : prenez un appel ou réservez un créneau.',
      ] },
      { h2: 'Pour quels véhicules est-ce pertinent ?', paras: [
        `Dès que le malus est significatif, c’est-à-dire dès environ 150 g/km de CO₂ ou 1 800 kg, et systématiquement pour les modèles au plafond de ${euro(PLAFOND_MALUS)} : BMW M, Mercedes-AMG et Classe G, Porsche 911 et Cayenne, Audi RS, Lamborghini, Bentley, Range Rover…`,
      ] },
    ],
    faq: [
      { q: 'Puis-je rouler en France avec un véhicule immatriculé dans un autre pays de l’Union ?', a: 'Le véhicule circule librement dans toute l’Union européenne. Les conditions d’utilisation propres à votre situation vous sont expliquées lors d’un appel avec un conseiller.' },
      { q: 'Combien de temps faut-il ?', a: 'Environ cinq semaines de l’accord à la livraison : validation, sourcing en Allemagne, structuration européenne, acquisition et immatriculation, livraison en France.' },
    ],
  },
  {
    slug: 'prix-france-allemagne-m3-classe-g-911',
    metaTitle: 'M3, Classe G, 911 : le vrai prix en France',
    title: `Malus ${ANNEE_BAREME} : ce que coûtent vraiment une M3, une Classe G et une 911 en France`,
    h1: ['M3, Classe G, 911 :', 'le vrai prix en France vs en Allemagne.'],
    description: `Trois exemples chiffrés, prix France, prix Allemagne, malus ${ANNEE_BAREME} et TVA : BMW M3 Competition, Mercedes Classe G, Porsche 911 GTS.`,
    date: '2026-09-21',
    updated: '2026-09-21',
    cover: '/media/photos/g-gris-face.jpg',
    coverAlt: 'Mercedes Classe G grise du groupe Corsiva',
    minutes: 6,
    keywords: ['prix BMW M3 Competition France Allemagne', 'malus Classe G', 'malus Porsche 911', 'import BMW M3', 'import Classe G', 'import Porsche 911'],
    intro: 'Le prix affiché n’est jamais le prix payé. Sur une voiture puissante, le malus et la TVA changent tout. Trois exemples relevés chez nos concessions partenaires, poste par poste.',
    blocs: [
      { h2: 'BMW M3 Competition 2025', paras: [
        `Prix constructeur en France : ${euro(m3.prixFranceTTC)}. Malus ${ANNEE_BAREME} : ${euro(rM3.malusTotal)} (plafond atteint dès 192 g/km). Coût réel en France, malus inclus : ${euro(m3.prixFranceTTC + rM3.malusTotal)}.`,
        `En Allemagne, chez une concession partenaire : ${euro(m3.prixAllemagneHT)} hors taxes. Avec une immatriculation européenne, ni malus ni TVA à supporter : ${euro(rM3.avantageTotal)} d’avantage total estimé (écart ${euro(rM3.ecartAchat)}, malus ${euro(rM3.malusTotal)}, TVA ${euro(rM3.tvaEvitee)}).`,
      ] },
      { h2: 'Mercedes Classe G 2026', paras: [
        `Prix constructeur en France : ${euro(g.prixFranceTTC)}. Malus ${ANNEE_BAREME} : ${euro(rG.malusTotal)} : le cumul CO₂ et poids dépasse largement le plafond, ramené à ${euro(PLAFOND_MALUS)}. Coût réel : ${euro(g.prixFranceTTC + rG.malusTotal)}.`,
        `En Allemagne : ${euro(g.prixAllemagneHT)} hors taxes. Avantage total estimé avec l’immatriculation européenne : ${euro(rG.avantageTotal)}.`,
      ] },
      { h2: 'Porsche 911 (992) GTS, occasion récente', paras: [
        `Prix en France : ${euro(p911.prixFranceTTC)}. Pour une occasion d’environ un an (hypothèse retenue : ${p911.occasionMois} mois), le malus CO₂ est décoté de ${Math.round(r911.decote * 100)} % : ${euro(r911.malusTotal)} restent dus à la première immatriculation en France.`,
        `En Allemagne : ${euro(p911.prixAllemagneHT)} hors taxes. Avantage total estimé : ${euro(r911.avantageTotal)}.`,
      ], note: 'Prix relevés sur des offres réelles ; CO₂ et masse constructeur indicatifs ; simulation indicative et non contractuelle.' },
      { h2: 'Ce que ces chiffres disent', list: [
        'Sur une sportive ou un gros SUV, le malus pèse autant qu’un second acompte : il ne se négocie pas, il s’évite.',
        'L’écart de prix allemand existe sur tous les modèles, mais c’est la fiscalité qui fait la différence.',
        'Chaque projet mérite un chiffrage : le simulateur applique la règle complète à votre véhicule, et un conseiller valide le montage avec vous.',
      ] },
    ],
  },
]

export const articleParSlug = (slug: string) => ARTICLES.find((a) => a.slug === slug)
