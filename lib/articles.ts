import { euro, malusCO2, malusMasse, decoteOccasion, simuler, ANNEE_BAREME, PLAFOND_MALUS, SEUIL_CO2, SEUIL_MASSE } from '@/lib/malus'
import { VEHICULES } from '@/lib/catalogue'
import { MODELES, CATS, calculer, modeleParId, nomModele } from '@/lib/modeles'
import { ficheParId, FORFAIT_PRIME, budgetPrime, economieNette } from '@/lib/acquisitions'

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
  /** « À lire aussi » : liens internes vers les pages de service et les guides voisins. */
  liens?: { label: string; href: string }[]
  /** Trois guides proposés en bas de page (sinon : les trois plus récents). */
  related?: string[]
}

const m3 = VEHICULES.find((v) => v.id === 'm3')!.chiffres!
const g = VEHICULES.find((v) => v.id === 'g')!.chiffres!
const p911 = VEHICULES.find((v) => v.id === '911-gts')!.chiffres!
const rM3 = simuler(m3), rG = simuler(g), r911 = simuler(p911)

const BASE: Article[] = [
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

/* ── Données calculées pour les nouveaux guides (rien en dur) ── */
const urus = modeleParId('lamborghini-urus-s')!
const fU = ficheParId('lamborghini-urus-s')!
const rUrus = calculer(urus)
const rUrus12 = simuler({ prixFranceTTC: urus.prixFranceTTC, prixAllemagneHT: urus.prixAllemagneHT, co2: urus.co2, masse: urus.masse, energie: urus.energie, occasionMois: 12 })
const CLASSEMENT = MODELES.map((m) => ({ m, r: calculer(m) })).sort((a, b) => b.r.avantageTotal - a.r.avantageTotal)
const AU_PLAFOND = CLASSEMENT.filter((x) => x.r.malusTotal >= PLAFOND_MALUS)
const parCat = (c: keyof typeof CATS) => AU_PLAFOND.filter((x) => x.m.cat === c).length
const pct = (t: number) => `${Math.round(t * 100)} %`
const LIENS_SERVICES = [
  { label: 'Le service Zéro malus : immatriculation européenne', href: '/immatriculation' },
  { label: 'Les pépites du mois, importées d’Allemagne', href: '/import#pepites' },
  { label: 'Simuler mon économie', href: '/simulateur' },
]
const LIENS_VILLE = (autres: { label: string; href: string }[]) => [
  ...LIENS_SERVICES.slice(0, 2),
  { label: 'Comment ça fonctionne : cinq phases, environ cinq semaines', href: '/comment-ca-fonctionne' },
  ...autres,
]
const EXEMPLES_MALUS = `Une BMW M3 Competition neuve (${m3.co2} g/km) paie ${euro(rM3.malusTotal)} de malus ; une Mercedes Classe G (${g.co2} g/km, ${g.masse.toLocaleString('fr-FR')} kg) ${euro(rG.malusTotal)} ; une Porsche 911 GTS d’occasion d’environ un an ${euro(r911.malusTotal)} après décote.`

/* Guides larges (barème, classement, Urus), placés en tête de la rubrique. */
const TETE: Article[] = [
  {
    slug: 'bareme-malus-2026-complet',
    metaTitle: `Barème malus ${ANNEE_BAREME} : tableau complet`,
    title: `Barème du malus écologique ${ANNEE_BAREME} : le tableau complet, CO₂, poids et occasions`,
    h1: [`Barème du malus ${ANNEE_BAREME} :`, 'le tableau complet.'],
    description: `Malus CO₂ gramme par gramme de ${SEUIL_CO2} à 192 g/km, malus au poids par tranche dès ${SEUIL_MASSE} kg, plafond de ${euro(PLAFOND_MALUS)}, décote des occasions : toutes les valeurs ${ANNEE_BAREME}.`,
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/m3-aeroport-1.jpg',
    coverAlt: 'BMW M3 Competition sur le tarmac, un modèle au plafond du malus 2026',
    minutes: 8,
    keywords: [`barème malus ${ANNEE_BAREME}`, 'malus écologique tableau', 'malus CO2 gramme par gramme', 'malus au poids 2026', 'malus voiture occasion importée', 'plafond malus 80 000 euros', 'calcul malus'],
    intro: `Le malus écologique ${ANNEE_BAREME} se lit en trois colonnes : le CO₂, la masse et le plafond qui borne le cumul des deux. Voici le barème complet, valeur par valeur, tel que nous l’appliquons dans notre simulateur, avec la décote réservée aux occasions importées et trois exemples chiffrés.`,
    blocs: [
      { h2: 'Le malus CO₂, gramme par gramme', paras: [
        `Le malus CO₂ se déclenche à ${SEUIL_CO2} g/km (norme WLTP) et progresse gramme par gramme jusqu’au plafond, atteint dès 192 g/km. Les paliers clés :`,
      ], list: [110, 120, 130, 140, 150, 160, 170, 180, 185, 190, 191, 192].map((gr) => `${gr} g/km : ${euro(malusCO2(gr))}${gr >= 192 ? ' (plafond, et au-delà)' : ''}`) },
      { h2: 'Le malus au poids, par tranche', paras: [
        `Le malus au poids s’applique à la masse en ordre de marche dès ${SEUIL_MASSE} kg : 10 € par kilo de 1 500 à 1 699 kg, 15 € de 1 700 à 1 799 kg, 20 € de 1 800 à 1 899 kg, 25 € de 1 900 à 1 999 kg, puis 30 € par kilo à partir de 2 000 kg. Il se cumule avec le malus CO₂.`,
      ], list: [1700, 1900, 2100, 2300, 2545].map((kg) => `${kg.toLocaleString('fr-FR')} kg : ${euro(malusMasse(kg, 'thermique'))}`) },
      { h2: 'Le plafond et le cumul', paras: [
        `Le cumul du malus CO₂ et du malus au poids est plafonné à ${euro(PLAFOND_MALUS)} en ${ANNEE_BAREME}. Concrètement, une sportive à 230 g/km est déjà au plafond par son seul CO₂ ; un SUV de 2,5 tonnes à 285 g/km l’atteint deux fois, mais ne paie qu’une fois le plafond.`,
        'Le malus est dû une seule fois, à la première immatriculation du véhicule en France, qu’il soit neuf ou importé d’occasion.',
      ] },
      { h2: 'Occasions importées : la décote', paras: [
        'Un véhicule d’occasion importé et immatriculé pour la première fois en France paie le malus CO₂ diminué d’un abattement qui dépend de son ancienneté, comptée depuis sa première immatriculation à l’étranger :',
      ], list: [3, 12, 24, 36, 60, 120, 180].map((mo) => `${mo} mois : ${pct(decoteOccasion(mo))} de réduction du malus CO₂`).concat(['Au-delà de 180 mois (15 ans) : exonération du malus CO₂.']), note: 'Attention : la décote ne porte que sur le malus CO₂. Le malus au poids reste dû en entier, et le cumul est toujours plafonné.' },
      { h2: 'Exonérations et abattements', list: [
        'Véhicules 100 % électriques : ni malus CO₂, ni malus au poids.',
        'Hybrides rechargeables d’autonomie électrique supérieure à 50 km : abattement de 200 kg sur la masse retenue.',
        'D’autres cas particuliers existent (fiche service-public.gouv.fr F35947) : vérifiez votre situation avant d’acheter.',
      ] },
      { h2: 'Trois exemples', paras: [
        EXEMPLES_MALUS,
        `Sur ces modèles, le malus dépasse souvent l’écart de prix entre la France et l’Allemagne : ${euro(rM3.ecartAchat)} d’écart sur la M3, contre ${euro(rM3.malusTotal)} de malus.`,
      ] },
      { h2: 'Comment ne pas le supporter', paras: [
        'Le malus français frappe l’immatriculation en France. Un véhicule porté par une structure européenne encadrée et immatriculé dans un autre État membre n’y est pas soumis, et la TVA de 20 % n’est pas supportée. C’est le service Zéro malus de Corsiva Prime, structuré avec nos avocats partenaires ; les détails vous sont présentés lors d’un appel.',
      ], note: 'Le simulateur applique ce barème à votre véhicule, gramme par gramme et kilo par kilo, puis chiffre l’économie selon le package choisi.' },
    ],
    faq: [
      { q: `Le barème change-t-il chaque année ?`, a: `Oui. La loi de finances 2025 a fixé une trajectoire 2025-2027 : le seuil de déclenchement baisse et le plafond monte d’année en année. Les valeurs de cette page sont celles de ${ANNEE_BAREME}.` },
      { q: 'Le malus au poids s’applique-t-il aux voitures électriques ?', a: 'Non : les véhicules 100 % électriques sont exonérés des deux malus. Les hybrides rechargeables d’autonomie supérieure à 50 km bénéficient d’un abattement de 200 kg.' },
      { q: 'Le malus dépend-il de ma région ?', a: 'Non. Le malus écologique est une taxe nationale, identique à Paris, Lyon, Annecy ou Marseille. Seule la taxe régionale de la carte grise varie selon la région.' },
    ],
    liens: LIENS_SERVICES,
    related: ['voitures-malus-maximal-2026-classement', 'eviter-malus-ecologique-2026', 'prix-france-allemagne-m3-classe-g-911'],
  },
  {
    slug: 'voitures-malus-maximal-2026-classement',
    metaTitle: `Voitures au malus maximal ${ANNEE_BAREME} : classement`,
    title: `Les voitures au malus maximal en ${ANNEE_BAREME} : classement et vrai coût en France`,
    h1: ['Les voitures au malus maximal :', `le classement ${ANNEE_BAREME}.`],
    description: `Urus, Classe G 63, RS Q8, 911 Turbo S, Cullinan, Purosangue : les modèles au plafond de ${euro(PLAFOND_MALUS)} et leur vrai coût en France face à l’Allemagne.`,
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/rsq8-arriere.jpg',
    coverAlt: 'Audi RS Q8 vue de trois quarts arrière, un SUV au plafond du malus',
    minutes: 9,
    keywords: ['voitures malus maximal', 'malus 80 000 euros quelles voitures', 'malus Lamborghini Urus', 'malus Classe G 63', 'malus Porsche 911 Turbo S', 'malus Range Rover', 'malus Bentley Bentayga', 'malus Ferrari Purosangue', 'SUV malus 2026'],
    intro: `Dès 192 g/km de CO₂, le malus atteint son plafond de ${euro(PLAFOND_MALUS)} : la quasi-totalité des sportives et des grands SUV thermiques y sont. Nous avons passé ${MODELES.length} modèles à fort malus au barème ${ANNEE_BAREME} : voici ceux qui touchent le plafond, ce qu’ils coûtent réellement en France malus inclus, et ce que change un achat en Allemagne.`,
    blocs: [
      { h2: 'Pourquoi tant de modèles sont au plafond', paras: [
        `Un V8 biturbo ou un V10 émet entre 250 et 400 g/km : le plafond est atteint par le seul CO₂. Les SUV ajoutent le malus au poids, 30 € par kilo au-delà de 2 000 kg, soit ${euro(malusMasse(2300, 'thermique'))} pour 2 300 kg. Le cumul est plafonné, mais le plafond est atteint dans tous les cas.`,
        `Sur les ${MODELES.length} modèles étudiés, ${AU_PLAFOND.length} sont au plafond : ${parCat('suv')} SUV, ${parCat('sport')} sportives, ${parCat('gt')} GT et ${parCat('berline')} berline${parCat('berline') > 1 ? 's' : ''}. Les hybrides rechargeables puissantes (M5, Panamera, C 63) y échappent grâce à leur CO₂ homologué très bas.`,
      ] },
      { h2: 'Le classement des économies possibles', paras: [
        'Pour chaque modèle : le coût réel en France (prix constructeur + malus), le prix négocié hors taxes en Allemagne, et l’économie maximale avec l’immatriculation européenne (écart de prix, TVA et malus non supportés).',
      ], list: CLASSEMENT.slice(0, 12).map(({ m, r }, i) => `${i + 1}. ${nomModele(m)} : ${euro(m.prixFranceTTC + r.malusTotal)} en France malus inclus, ${euro(m.prixAllemagneHT)} hors taxes en Allemagne, jusqu’à ${euro(r.avantageTotal)} d’économie.`), note: 'Prix constructeur France et prix Allemagne hors taxes indicatifs (remise moyenne constatée chez nos concessions partenaires), sauf modèles relevés sur des offres réelles. CO₂ et masse constructeur indicatifs.' },
      { h2: 'Ce que change l’import seul', paras: [
        'Acheter la voiture en Allemagne et l’immatriculer en France ne fait gagner que l’écart de prix négocié : la TVA française de 20 % et le malus restent dus à l’immatriculation. Sur les modèles au plafond, le malus efface souvent l’économie réalisée sur le prix.',
      ] },
      { h2: 'Ce que change l’immatriculation européenne', paras: [
        `Le véhicule est porté par une structure européenne encadrée par nos avocats partenaires et immatriculé dans un autre État membre : le malus français n’est pas dû, la TVA n’est pas supportée. Sur un ${nomModele(CLASSEMENT[0].m)}, l’économie atteint ${euro(CLASSEMENT[0].r.avantageTotal)} ; sur une ${nomModele(CLASSEMENT.find((x) => x.m.id === 'bmw-m3-competition')!.m)}, ${euro(CLASSEMENT.find((x) => x.m.id === 'bmw-m3-competition')!.r.avantageTotal)}.`,
        'Le véhicule circule dans toute l’Union européenne. Le fonctionnement précis de la structure vous est présenté lors d’un appel.',
      ] },
      { h2: 'Comment lire ces chiffres', list: [
        'Le coût France retient le prix constructeur d’une configuration courante ; vos options le font varier.',
        `Le malus est celui du barème ${ANNEE_BAREME} (loi de finances n° 2025-127) pour un véhicule neuf ; une occasion importée bénéficie d’une décote sur le seul malus CO₂.`,
        'Le simulateur reprend la règle complète pour votre configuration exacte.',
      ] },
    ],
    faq: [
      { q: 'Une occasion récente est-elle moins taxée ?', a: 'Le malus CO₂ est décoté selon l’ancienneté (12 % à un an, 20 % à deux ans), mais le malus au poids reste entier et le cumul est plafonné : sur un gros SUV, une occasion d’un an reste au plafond.' },
      { q: 'Le malus dépend-il de ma ville ?', a: 'Non, c’est une taxe nationale, identique partout en France. Corsiva Prime accompagne ses clients à Paris, Lyon, Annecy, Chambéry et dans toute la France.' },
      { q: 'Quels modèles importez-vous le plus ?', a: 'Les voitures dneuf fiches d’acquisition du catalogue Zéro malus (911 Carrera S, G 63, RS Q8 performance, M4 Competition, R8 V10 performance, Urus S, CLE 53 Coupé, RS6 Avant performance, M3 Competition), et toute marque premium disponible chez nos concessions partenaires.' },
    ],
    liens: LIENS_SERVICES,
    related: ['bareme-malus-2026-complet', 'acheter-lamborghini-urus-import-malus', 'prix-france-allemagne-m3-classe-g-911'],
  },
  {
    slug: 'acheter-lamborghini-urus-import-malus',
    metaTitle: 'Acheter une Lamborghini Urus : prix et malus',
    title: `Acheter une Lamborghini Urus en ${ANNEE_BAREME} : prix, malus, import d’Allemagne et immatriculation`,
    h1: ['Acheter une Lamborghini Urus :', 'prix, malus et import.'],
    description: `Prix France malus compris et prix Allemagne hors taxes d’un Urus S, malus ${ANNEE_BAREME} au plafond, forfait Corsiva Prime : à savoir avant d’acheter un Urus.`,
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/urus-avant.jpg',
    coverAlt: 'Lamborghini Urus noir vu de l’avant, le SUV le plus taxé de sa catégorie en France',
    minutes: 8,
    keywords: ['acheter Lamborghini Urus', 'prix Lamborghini Urus', 'malus Urus', 'Lamborghini Urus import Allemagne', 'Urus occasion malus', 'Urus sans malus', 'Lamborghini Urus S prix France'],
    intro: `L’Urus est le SUV que nos clients nous demandent le plus souvent de chiffrer. C’est aussi l’un des véhicules les plus taxés de France : ${urus.co2} g/km de CO₂ et ${urus.masse.toLocaleString('fr-FR')} kg le placent au plafond du malus. Voici son vrai prix, en France et en Allemagne, et les deux façons de l’acheter avec Corsiva Prime.`,
    blocs: [
      { h2: 'L’Urus, au plafond du malus par deux fois', paras: [
        `Avec ${urus.co2} g/km, le malus CO₂ de l’Urus S atteint le plafond de ${euro(PLAFOND_MALUS)} dès le premier gramme au-dessus de 191. Sa masse de ${urus.masse.toLocaleString('fr-FR')} kg ajoute ${euro(malusMasse(urus.masse, 'thermique'))} de malus au poids. Le cumul étant plafonné, le malus dû à l’immatriculation en France est de ${euro(rUrus.malusTotal)}.`,
      ] },
      { h2: 'Ce que coûte un Urus S en France', paras: [
        `L’Urus S le moins cher en vente en France, malus déjà payé, s’affichait ${euro(fU.prixFranceTTC)} TTC en septembre 2026 (relevé de notre fiche d’acquisition). Neuf, il faut ajouter au prix catalogue le malus de ${euro(rUrus.malusTotal)}, avant les options, la carte grise et l’assurance.`,
      ] },
      { h2: 'Ce que coûte le même Urus en Allemagne', paras: [
        `En Allemagne, la médiane des sept Urus S éligibles (TVA récupérable) est de ${euro(fU.prixAllemagneTTC)} TTC, soit ≈ ${euro(fU.prixAllemagneHT)} hors taxes : ${euro(fU.ecart)} de moins que le prix France malus compris, ${fU.part} % du prix français. En import classique, il faut y ajouter la TVA française de 20 % et le malus à l’immatriculation en France.`,
      ] },
      { h2: 'Neuf ou occasion récente ?', paras: [
        `Une occasion d’un an bénéficie d’une décote de ${pct(decoteOccasion(12))} sur le malus CO₂. Mais le malus au poids reste entier et le cumul est plafonné : un Urus d’un an paie encore ${euro(rUrus12.malusTotal)} de malus. Sur ce modèle, l’occasion ne règle donc pas la question du malus ; elle joue seulement sur le prix d’achat.`,
      ] },
      { h2: 'L’import clé en main', list: [
        'Sourcing chez nos concessions partenaires en Allemagne, neuf configurable ou occasion récente inspectée.',
        'Négociation du prix, contrôle documentaire, historique et kilométrage vérifiés.',
        'Transport fermé privé jusqu’à votre adresse, quitus fiscal, certificat de conformité et carte grise française.',
        'Covering en option, posé avant la livraison.',
      ], note: 'L’Urus fait partie des pépites en cours de négociation chez nos concessions partenaires : son prix est communiqué sur demande.' },
      { h2: `L’immatriculation européenne : ${euro(fU.ecart)} d’écart, forfait connu à l’avance`, paras: [
        `Porté par une structure européenne encadrée par nos avocats partenaires et immatriculé dans un autre État membre, l’Urus ne supporte ni le malus français ni la TVA de 20 %. Le forfait Corsiva Prime de ${euro(FORFAIT_PRIME)} compris, le budget s’établit à ≈ ${euro(budgetPrime(fU))}, soit ≈ ${euro(economieNette(fU))} de moins que le prix France malus compris.`,
        'Le véhicule circule librement dans toute l’Union européenne. Les modalités de la structure vous sont présentées lors d’un appel, avec nos avocats partenaires si besoin.',
      ] },
      { h2: 'Le vrai budget, en résumé', list: [
        `Achat en France : ${euro(fU.prixFranceTTC)}, malus compris (Urus S le moins cher relevé).`,
        `Import seul : ≈ ${euro(fU.prixAllemagneHT)} hors taxes + TVA 20 % + malus ${euro(rUrus.malusTotal)} + transport et formalités.`,
        `Import + immatriculation européenne : ≈ ${euro(fU.prixAllemagneHT)} hors taxes + forfait ${euro(FORFAIT_PRIME)} = ≈ ${euro(budgetPrime(fU))}, sans TVA ni malus.`,
      ] },
    ],
    faq: [
      { q: 'Peut-on acheter une Lamborghini Urus sans malus ?', a: 'Le malus français s’applique à l’immatriculation en France. Un Urus porté par une structure européenne encadrée et immatriculé dans un autre État membre n’y est pas soumis. Corsiva Prime structure cette opération avec ses avocats partenaires.' },
      { q: 'Combien de temps pour importer un Urus ?', a: 'Environ cinq semaines de l’accord à la livraison pour un import avec immatriculation européenne, trois à quatre semaines pour un import seul, selon la disponibilité du véhicule.' },
      { q: 'Faites-vous aussi le Huracán ou le Revuelto ?', a: 'Nous importons toute la gamme disponible chez nos concessions partenaires. Le Huracán Tecnica figure dans notre simulateur ; pour un autre modèle, décrivez-nous la voiture visée.' },
    ],
    liens: [
      { label: 'La fiche d’acquisition de l’Urus S', href: '/immatriculation?fiche=lamborghini-urus-s#catalogue' },
      { label: 'Simuler l’économie sur un Urus', href: '/simulateur?modele=lamborghini-urus-s#simulateur' },
      { label: 'Les pépites du mois', href: '/import#pepites' },
    ],
    related: ['voitures-malus-maximal-2026-classement', 'importer-voiture-luxe-allemagne-guide', 'immatriculation-etranger-societe-europeenne'],
  },
]

/* Guides revente et villes, placés en queue de rubrique. */
const QUEUE: Article[] = [
  {
    slug: 'revendre-voiture-importee-allemagne',
    metaTitle: 'Revendre une voiture importée d’Allemagne',
    title: 'Vendre ou revendre une voiture importée d’Allemagne : papiers, malus, TVA et cote',
    h1: ['Revendre une voiture importée :', 'ce qu’il faut savoir.'],
    description: 'Une voiture importée se revend comme une autre : documents, contrôle technique, TVA, malus non remboursé, cote des configurations allemandes. Nos conseils.',
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/911-arriere.jpg',
    coverAlt: 'Porsche 911 jaune vue de l’arrière, une occasion récente importée d’Allemagne',
    minutes: 6,
    keywords: ['revendre voiture importée', 'vente voiture importée Allemagne', 'vendre voiture de luxe', 'revente voiture import', 'malus remboursé revente', 'TVA revente véhicule'],
    intro: 'Acheter une voiture de luxe importée d’Allemagne, c’est aussi penser au jour où vous la revendrez. Bonne nouvelle : une fois immatriculée en France, elle se vend comme n’importe quelle voiture française, à condition d’avoir gardé les bons documents. Voici les règles et les bons réflexes.',
    blocs: [
      { h2: 'Une voiture importée se revend comme une autre', paras: [
        'Dès qu’elle porte une carte grise française, votre voiture est une voiture française aux yeux de l’acheteur et de l’administration. Ce qui rassure un acheteur, c’est l’historique : carnet d’entretien complet, factures, certificat de conformité européen, quitus fiscal conservé. Chez Corsiva Prime, chaque véhicule importé est livré avec son dossier complet.',
      ] },
      { h2: 'Le malus n’est jamais remboursé', paras: [
        'Le malus écologique est payé une seule fois, à la première immatriculation en France, et n’est pas restitué à la revente. Il fait donc partie du prix de revient de la voiture, sans se retrouver dans sa cote : c’est la raison pour laquelle la question du malus se règle avant l’achat, pas après.',
      ] },
      { h2: 'TVA : particulier ou professionnel', paras: [
        'Un particulier qui revend sa voiture ne facture pas de TVA. Au sens de la TVA intracommunautaire, un véhicule est toutefois considéré comme neuf s’il a moins de six mois ou moins de 6 000 km : une revente vers un autre pays de l’Union dans ce cas fait naître la TVA dans le pays d’arrivée. Pour une revente rapide, faites-vous conseiller.',
      ] },
      { h2: 'Les documents à réunir', list: [
        'La carte grise barrée, datée et signée, et le certificat de cession.',
        'Le certificat de situation administrative (non-gage) de moins de quinze jours.',
        'Un contrôle technique de moins de six mois si le véhicule a plus de quatre ans.',
        'Le carnet d’entretien, les factures, le certificat de conformité et, pour un import, une copie du quitus fiscal.',
      ] },
      { h2: 'La cote d’une configuration allemande', paras: [
        'Les voitures importées d’Allemagne sont souvent mieux configurées que les versions vendues en France : packs, jantes, sellerie, couleurs rares. Une configuration soignée et un kilométrage maîtrisé se valorisent à la revente. Un historique de propriété clair (un seul propriétaire, entretien en réseau) compte tout autant.',
      ] },
      { h2: 'Et avec l’immatriculation européenne ?', paras: [
        'Lorsque le véhicule est porté par une structure européenne, la revente s’organise avec cette structure. Les modalités dépendent de votre situation ; nos conseillers vous les présentent lors d’un appel, avec nos avocats partenaires si nécessaire.',
      ], note: 'Acheter en pensant à la revente : configuration désirable, kilométrage, historique complet. C’est aussi ce que nous vérifions pour vous au moment du sourcing.' },
    ],
    faq: [
      { q: 'Faut-il un contrôle technique pour vendre ?', a: 'Oui si le véhicule a plus de quatre ans : un contrôle technique de moins de six mois doit être remis à l’acheteur particulier.' },
      { q: 'Une origine allemande freine-t-elle les acheteurs ?', a: 'Non, à condition de présenter un dossier complet : certificat de conformité, historique d’entretien, factures et quitus fiscal. Une configuration allemande riche est plutôt un argument.' },
      { q: 'Le malus payé à l’achat est-il récupérable ?', a: 'Non. Il n’est ni remboursé ni transféré à l’acheteur. La bonne question se pose avant l’achat : où immatriculer le véhicule.' },
    ],
    liens: LIENS_SERVICES,
    related: ['importer-voiture-luxe-allemagne-guide', 'eviter-malus-ecologique-2026', 'immatriculation-etranger-societe-europeenne'],
  },
  {
    slug: 'import-voiture-luxe-paris',
    metaTitle: 'Import voiture de luxe à Paris',
    title: 'Importer une voiture de luxe à Paris : rendez-vous, livraison et zéro malus',
    h1: ['Import de voiture de luxe', 'à Paris.'],
    description: 'Nos conseillers vous reçoivent à Paris : import d’Allemagne, immatriculation européenne sans malus ni TVA, livraison en transport fermé en Île-de-France.',
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/paris.jpg',
    coverAlt: 'Paris, où les conseillers Corsiva Prime reçoivent leurs clients',
    minutes: 6,
    keywords: ['import voiture de luxe Paris', 'mandataire voiture Allemagne Paris', 'éviter malus Paris', 'import voiture Île-de-France', 'immatriculation européenne Paris', 'acheter voiture de luxe Paris'],
    intro: 'Paris concentre les acheteurs de voitures de luxe et les prix les plus élevés de France. Nos conseillers vous y reçoivent pour cadrer votre projet : la voiture, le budget, le package. Ensuite, tout est géré, de la concession allemande à votre adresse.',
    blocs: [
      { h2: 'Un rendez-vous à Paris, puis tout est géré', paras: [
        'Corsiva Prime vous reçoit à Paris, ou échange avec vous à distance si vous préférez. En deux à trois jours, la phase de validation fixe le cahier des charges : modèle, configuration, neuf ou occasion récente, budget, calendrier, et le choix entre l’import seul et l’import avec immatriculation européenne.',
        'Le sourcing se fait ensuite chez nos concessions partenaires en Allemagne, sans que vous ayez à vous déplacer : présélection, inspection, négociation et contrôle documentaire sont réalisés pour vous.',
      ] },
      { h2: 'Le malus est le même à Paris qu’ailleurs', paras: [
        `Le malus écologique est une taxe nationale : un Parisien paie exactement le même montant qu’un Lyonnais ou un Annécien. ${EXEMPLES_MALUS}`,
        'Ce qui change à Paris, c’est le niveau des prix pratiqués par les distributeurs et la rareté des configurations. L’Allemagne offre plus de choix et des prix hors taxes négociés.',
      ] },
      { h2: 'Livraison à votre adresse en Île-de-France', paras: [
        'La voiture est acheminée en camion fermé privé jusqu’à votre domicile, votre bureau ou votre parking, à Paris comme dans toute l’Île-de-France. Aucun kilomètre inutile, aucune exposition. Elle arrive telle qu’elle a quitté la concession, avec ses plaques.',
      ] },
      { h2: 'Quelles voitures ?', paras: [
        `Les neuf fiches d’acquisition de notre catalogue Zéro malus : Porsche 911 Carrera S, Mercedes-AMG G 63 et CLE 53, Audi RS Q8, RS6 Avant et R8 V10 performance, BMW M4 et M3 Competition, Lamborghini Urus S. Et toute marque premium disponible chez nos concessions partenaires : Bentley, Range Rover, Aston Martin, Maserati… Sur la page Import, cinq pépites négociées sont proposées chaque mois.`,
      ] },
      { h2: 'Import seul ou immatriculation européenne ?', paras: [
        `Import seul : vous gagnez l’écart de prix négocié, mais la TVA de 20 % et le malus (jusqu’à ${euro(PLAFOND_MALUS)}) restent dus à l’immatriculation en France. Import avec immatriculation européenne : le véhicule est porté par une structure européenne encadrée par nos avocats partenaires, ni le malus ni la TVA ne sont supportés, et la voiture circule dans toute l’Union. Les détails vous sont présentés de vive voix.`,
      ], note: 'Environ cinq semaines de l’accord à la livraison avec l’immatriculation européenne, trois à quatre semaines pour un import seul.' },
    ],
    faq: [
      { q: 'Où se déroule le rendez-vous ?', a: 'À Paris, où nos conseillers vous reçoivent, ou à distance par téléphone. Vous pouvez réserver un créneau en ligne.' },
      { q: 'Livrez-vous dans toute l’Île-de-France ?', a: 'Oui, et partout en France, en transport fermé privé jusqu’à l’adresse de votre choix.' },
      { q: 'Faut-il aller en Allemagne ?', a: 'Non pour l’import : présélection, inspection et négociation sont faites pour vous. Le package avec immatriculation européenne comprend un déplacement organisé de trois à quatre jours, hôtel et transports inclus.' },
    ],
    liens: LIENS_VILLE([{ label: 'Import de voiture de luxe à Lyon', href: '/articles/import-voiture-luxe-lyon' }, { label: 'Import de voiture de luxe à Annecy et Chambéry', href: '/articles/import-voiture-luxe-annecy-chambery' }]),
    related: ['import-voiture-luxe-lyon', 'import-voiture-luxe-annecy-chambery', 'voitures-malus-maximal-2026-classement'],
  },
  {
    slug: 'import-voiture-luxe-lyon',
    metaTitle: 'Import voiture de luxe à Lyon',
    title: 'Importer une voiture de luxe à Lyon : nos conseillers se déplacent, livraison incluse',
    h1: ['Import de voiture de luxe', 'à Lyon.'],
    description: 'Import d’Allemagne et immatriculation européenne sans malus ni TVA à Lyon : nos conseillers se déplacent, livraison en transport fermé dans toute la région.',
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/g63-arriere.jpg',
    coverAlt: 'Mercedes Classe G 63 AMG vu de l’arrière, un modèle au plafond du malus livré à Lyon',
    minutes: 6,
    keywords: ['import voiture de luxe Lyon', 'mandataire voiture Allemagne Lyon', 'éviter malus Lyon', 'import voiture Rhône', 'immatriculation européenne Lyon', 'acheter voiture de luxe Lyon'],
    intro: 'À une heure du siège du groupe Corsiva, en Savoie, Lyon est l’une des villes où nos conseillers se déplacent le plus. Import d’Allemagne, immatriculation européenne, livraison à domicile : voici comment se déroule un projet Corsiva Prime pour un client lyonnais.',
    blocs: [
      { h2: 'Nos conseillers viennent à vous', paras: [
        'Corsiva Prime accompagne ses clients à Lyon et dans toute la région Auvergne-Rhône-Alpes. Le premier échange se fait par téléphone ou en rendez-vous ; la phase de validation prend deux à trois jours et fixe la voiture visée, le budget et le package.',
        'Le groupe Corsiva est basé à Chambéry, à une heure de Lyon : une équipe proche, qui a déjà réalisé plus de 48 immatriculations européennes.',
      ] },
      { h2: 'Le malus, une taxe nationale', paras: [
        `Le malus écologique ne dépend pas de la ville : il est identique à Lyon, Paris ou Marseille. ${EXEMPLES_MALUS}`,
        'C’est le poste qui fait basculer un projet : sur ces modèles, il dépasse souvent l’économie réalisée sur le prix d’achat en Allemagne.',
      ] },
      { h2: 'Livraison à Lyon et dans la région', paras: [
        'La voiture arrive en camion fermé privé à l’adresse de votre choix : Lyon, Villeurbanne, l’Ouest lyonnais, le Beaujolais, l’Ain ou l’Isère. Aucun kilomètre inutile, plaques posées, dossier complet remis à la livraison.',
      ] },
      { h2: 'Les voitures que nous chiffrons pour Lyon', paras: [
        'Les voitures dneuf fiches d’acquisition du catalogue Zéro malus (911 Carrera S, G 63, RS Q8 performance, M4 Competition, R8 V10 performance, Urus S, CLE 53 Coupé, RS6 Avant performance, M3 Competition), et toute marque premium disponible chez nos concessions partenaires en Allemagne. Le simulateur compare trente et un modèles à fort malus.',
      ] },
      { h2: 'Deux façons d’acheter', paras: [
        `L’import seul fait gagner l’écart de prix négocié ; la TVA de 20 % et le malus, jusqu’à ${euro(PLAFOND_MALUS)}, restent dus à l’immatriculation en France. L’import avec immatriculation européenne évite les deux : le véhicule est porté par une structure européenne encadrée par nos avocats partenaires et circule dans toute l’Union. Un conseiller vous présente le fonctionnement de vive voix.`,
      ], note: 'Environ cinq semaines de l’accord à la livraison avec l’immatriculation européenne, trois à quatre semaines pour un import seul.' },
    ],
    faq: [
      { q: 'Vous déplacez-vous à Lyon ?', a: 'Oui. Nos conseillers se déplacent à Lyon et dans toute la région ; le premier échange peut aussi se faire par téléphone ou en réservant un créneau en ligne.' },
      { q: 'La livraison est-elle comprise ?', a: 'Le transport fermé privé jusqu’à votre adresse fait partie des deux packages, Import et Import + immatriculation européenne.' },
      { q: 'Puis-je voir la voiture avant d’acheter ?', a: 'Chaque véhicule est inspecté et documenté pour vous en Allemagne (photos, historique, contrôle). Le package avec immatriculation européenne comprend un déplacement organisé de trois à quatre jours.' },
    ],
    liens: LIENS_VILLE([{ label: 'Import de voiture de luxe à Paris', href: '/articles/import-voiture-luxe-paris' }, { label: 'Import de voiture de luxe à Annecy et Chambéry', href: '/articles/import-voiture-luxe-annecy-chambery' }]),
    related: ['import-voiture-luxe-annecy-chambery', 'import-voiture-luxe-paris', 'bareme-malus-2026-complet'],
  },
  {
    slug: 'import-voiture-luxe-annecy-chambery',
    metaTitle: 'Import voiture de luxe Annecy et Chambéry',
    title: 'Importer une voiture de luxe à Annecy et Chambéry : le groupe Corsiva près de chez vous',
    h1: ['Import de voiture de luxe', 'à Annecy et Chambéry.'],
    description: 'Basé à Chambéry et présent à Annecy, le groupe Corsiva importe votre voiture d’Allemagne sans malus ni TVA. Livraison en Savoie, Haute-Savoie et en station.',
    date: '2026-09-22',
    updated: '2026-09-22',
    cover: '/media/photos/m3-lac-2.jpg',
    coverAlt: 'BMW M3 Competition au bord du lac, en Savoie, région d’origine du groupe Corsiva',
    minutes: 6,
    keywords: ['import voiture de luxe Annecy', 'import voiture de luxe Chambéry', 'mandataire Allemagne Haute-Savoie', 'éviter malus Annecy', 'import voiture Savoie', 'immatriculation européenne Annecy', 'voiture de luxe Courchevel'],
    intro: 'Le groupe Corsiva est né à Chambéry et grandit entre les lacs et les stations : Annecy, Aix-les-Bains, Courchevel. Corsiva Prime, son activité d’import et d’immatriculation européenne, accompagne donc les Savoyards et les Haut-Savoyards en voisin. Voici comment.',
    blocs: [
      { h2: 'Une équipe savoyarde', paras: [
        'Le siège du groupe Corsiva est à Chambéry, rue Marguerite Sevez. Nos conseillers reçoivent et se déplacent à Chambéry, Annecy et dans les deux Savoie ; ils connaissent les routes de montagne comme les attentes des clients des stations.',
        'Plus de 48 voitures ont déjà été immatriculées avec Corsiva Prime, avec l’exigence du groupe : 4,9 sur Google, plus de 100 avis.',
      ] },
      { h2: 'Le malus, identique à Annecy comme à Paris', paras: [
        `Le malus écologique est national. ${EXEMPLES_MALUS}`,
        'Pour les modèles prisés en montagne, Classe G 63, Cayenne, Range Rover Sport SV, Urus, le plafond est atteint dans tous les cas : c’est le premier poste à traiter.',
      ] },
      { h2: 'Livraison en Savoie, Haute-Savoie et en station', paras: [
        'Transport fermé privé jusqu’à votre adresse : Annecy, Chambéry, Aix-les-Bains, Annemasse, Courchevel ou Megève. Aucun kilomètre inutile ; la voiture arrive avec ses plaques et son dossier complet.',
      ] },
      { h2: 'Les voitures que nous importons', paras: [
        'Les voitures dneuf fiches d’acquisition du catalogue Zéro malus (911 Carrera S, G 63, RS Q8 performance, M4 Competition, R8 V10 performance, Urus S, CLE 53 Coupé, RS6 Avant performance, M3 Competition), les pépites du mois négociées chez nos concessions partenaires, et toute marque premium sur demande.',
      ] },
      { h2: 'Import seul ou immatriculation européenne ?', paras: [
        `Import seul : écart de prix négocié, mais TVA de 20 % et malus (jusqu’à ${euro(PLAFOND_MALUS)}) dus à l’immatriculation en France. Import avec immatriculation européenne : véhicule porté par une structure européenne encadrée par nos avocats partenaires, ni malus ni TVA supportés, circulation dans toute l’Union. Le fonctionnement vous est présenté lors d’un appel.`,
      ], note: 'Environ cinq semaines de l’accord à la livraison avec l’immatriculation européenne, trois à quatre semaines pour un import seul.' },
    ],
    faq: [
      { q: 'Où vous rencontrer en Savoie ?', a: 'À Chambéry, siège du groupe Corsiva, ou à Annecy ; nos conseillers se déplacent aussi chez vous. Le premier échange peut se faire par téléphone ou en réservant un créneau en ligne.' },
      { q: 'Livrez-vous en station ?', a: 'Oui, en transport fermé privé, à Courchevel, Megève ou toute autre station, comme partout en France.' },
      { q: 'Le malus est-il différent en Haute-Savoie ?', a: 'Non, le malus écologique est une taxe nationale. Seule la taxe régionale de la carte grise varie d’une région à l’autre.' },
    ],
    liens: LIENS_VILLE([{ label: 'Import de voiture de luxe à Lyon', href: '/articles/import-voiture-luxe-lyon' }, { label: 'Import de voiture de luxe à Paris', href: '/articles/import-voiture-luxe-paris' }]),
    related: ['import-voiture-luxe-lyon', 'import-voiture-luxe-paris', 'acheter-lamborghini-urus-import-malus'],
  },
]

export const ARTICLES: Article[] = [...TETE, ...BASE, ...QUEUE]

export const articleParSlug = (slug: string) => ARTICLES.find((a) => a.slug === slug)
