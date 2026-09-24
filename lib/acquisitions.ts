/* ─────────────────────────────────────────────────────────────────────────────
   Fiches d'acquisition Corsiva Prime — source unique : les « Propositions d'acquisition » du
   21 septembre 2026 (dossier « Fiches d'acquisition avec tarifs », neuf véhicules). Photos : véhicules plaqués
   Corsiva (dossier « image prime », 24 septembre 2026), recadrées en 16:10 ; M3 et Classe G du groupe Corsiva.
   Chaque montant est celui de la fiche : prix Allemagne (annonce ou médiane, TTC et hors taxes),
   prix France équivalent (malus déjà compris), écart de marché, TVA allemande non facturée, écart total.
   Exceptions : prix France de la M3 (neuf, 204 000 €) et du G 63 (290 000 €) fixés par le dirigeant le 24 septembre
   2026, écarts recalculés (écart total = France − Allemagne HT, écart de marché = écart total − TVA de la fiche).
   Seuls le prix du véhicule (± covering) et l'économie sont calculés ici ; le forfait n'y entre pas.
   ───────────────────────────────────────────────────────────────────────────── */

/** Forfait global Corsiva Prime : structuration, exécution et livraison, hors prix du véhicule. */
export const FORFAIT_PRIME = 21_000
/** Option : covering intégral, teinte au choix, posé avant l'acheminement vers la France. */
export const OPTION_COVERING = 3_000
/** Hors forfait : gestion annuelle de la structure (comptabilité et suivi local), par mois. */
export const GESTION_STRUCTURE_MOIS = 60
export const DATE_FICHES = '2026-09-21'

export type CatAcq = 'sportive' | 'suv' | 'berline' | 'break' | 'coupe'
export const CATS_ACQ: Record<CatAcq, string> = { sportive: 'Sportive', suv: 'SUV', berline: 'Berline', break: 'Break', coupe: 'Coupé' }

export type Photo = { src: string; alt: string; pos?: string }
export type Fiche = {
  id: string
  ref: string
  marque: string
  modele: string
  cat: CatAcq
  annee: string
  /** Ligne signature : carrosserie, puissance, moteur, transmission, millésime. */
  titre: string
  texte: string
  /** L'annonce de référence identifiée (le véhicule final pourra différer). */
  reference: string
  options: string[]
  fiche: { motorisation: string; transmission: string; zeroCent: string; circulation: string; km: number; historique: string; etat: string }
  prixAllemagneTTC: number
  prixAllemagneHT: number
  /** D'où vient le prix allemand : annonce retenue ou médiane des annonces éligibles. */
  prixAllemagneNote: string
  prixFranceTTC: number
  /** Le comparable français : occasion malus payé, ou neuf + malus quand aucune occasion n'existe. */
  prixFranceNote: string
  /** Malus français chiffré dans la fiche quand il l'est. */
  malusFrance?: number
  ecartMarche: number
  tvaAllemande: number
  ecart: number
  /** Écart en part du prix français. */
  part: number
  scenario2?: { label: string; ht: number; ecart: number; part: number; franceTTC?: number }
  photos: Photo[]
}

const A = '/media/acquisitions/'

export const FICHES: Fiche[] = [
  {
    id: 'bmw-m3-competition', ref: 'CRS-BM3C-2026', marque: 'BMW', modele: 'M3 Competition', cat: 'berline', annee: '2026',
    titre: 'Berline 530 ch · 6 cylindres en ligne 3.0 biturbo · M xDrive · 2026',
    texte: 'Berline sportive de référence, la M3 Competition est propulsée par un 6 cylindres en ligne 3.0 L biturbo, 530 ch et 650 Nm, transmission intégrale M xDrive et boîte M Steptronic 8 rapports. Elle associe des performances de supersportive à quatre vraies places.',
    reference: 'M3 Competition M xDrive de 04/2026, 7 000 km, non accidentée, un seul propriétaire, vendue par un professionnel établi en Allemagne.',
    options: ['Pack Innovation', 'Affichage tête haute', 'Caméras 360°', 'Jantes forgées M'],
    fiche: { motorisation: '6 cyl. biturbo · 530 ch', transmission: 'M xDrive · BVA 8', zeroCent: '3,5 s', circulation: '04/2026', km: 7_000, historique: '1 propriétaire', etat: 'Non accidentée' },
    prixAllemagneTTC: 84_690, prixAllemagneHT: 71_200, prixAllemagneNote: 'Exemplaire retenu, TVA récupérable',
    prixFranceTTC: 204_000, prixFranceNote: 'Prix neuf en France d’une M3 Competition, malus compris : prix TTC, aucun malus à ajouter.',
    ecartMarche: 119_300, tvaAllemande: 13_500, ecart: 132_800, part: 65,
    scenario2: { label: 'Scénario prudent · médiane du marché', ht: 78_983, ecart: 125_017, part: 61 },
    photos: [{ src: '/media/photos/m3c-face.jpg', alt: 'BMW M3 Competition du groupe Corsiva, vue de face, plaque Corsiva', pos: 'center 55%' }, { src: '/media/photos/m3c-3-4.jpg', alt: 'BMW M3 Competition du groupe Corsiva, trois quarts', pos: 'center 55%' }, { src: '/media/photos/m3-interieur.jpg', alt: 'Intérieur de la BMW M3 Competition', pos: 'center' }],
  },
  {
    id: 'mercedes-amg-g-63', ref: 'CRS-MBG63-2026', marque: 'Mercedes-AMG', modele: 'G 63', cat: 'suv', annee: '2024',
    titre: 'Tout-terrain de luxe 585 ch · V8 4.0 biturbo · 4MATIC · 2024',
    texte: 'Icône du tout-terrain de luxe à transmission intégrale permanente, propulsée par un V8 4.0 L biturbo, 585 ch et 850 Nm, boîte AMG Speedshift 9 rapports. Le G 63 associe les performances AMG à une présence immédiatement reconnaissable.',
    reference: 'G 63 de 05/2024, 6 300 km, non accidenté, un seul propriétaire, vendu par une concession Mercedes-Benz agréée en Allemagne.',
    options: ['Peinture Manufaktur blanc Opalith Magno', 'Pack Night', 'Sièges massants', 'AMG Driver’s Package'],
    fiche: { motorisation: 'V8 4.0 biturbo · 585 ch', transmission: '4MATIC · 9 rapports', zeroCent: '4,5 s', circulation: '05/2024', km: 6_300, historique: '1 propriétaire', etat: 'Non accidenté' },
    prixAllemagneTTC: 205_000, prixAllemagneHT: 172_300, prixAllemagneNote: 'Médiane des 38 G 63 relevés en Allemagne',
    prixFranceTTC: 290_000, prixFranceNote: 'Prix en France d’un G 63, malus compris : prix TTC, aucun malus à ajouter.',
    ecartMarche: 85_000, tvaAllemande: 32_700, ecart: 117_700, part: 41,
    scenario2: { label: 'Meilleur cas · annonce de référence', ht: 146_370, ecart: 143_630, part: 50 },
    photos: [{ src: A + 'mercedes-amg-g-63--corsiva-3-4-avant.jpg', alt: 'Mercedes Classe G grise du groupe Corsiva de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: '/media/photos/g-gris-duo.jpg', alt: 'Mercedes Classe G et BMW M3 du groupe Corsiva', pos: 'center 55%' }],
  },
  {
    id: 'porsche-911-carrera-s', ref: 'CRS-P911S-2026', marque: 'Porsche', modele: '911 Carrera S', cat: 'sportive', annee: '2026',
    titre: 'Sportive 480 ch · 6 cylindres à plat 3.0 biturbo · PDK · 2026',
    texte: 'Dernière évolution de la 911, la Carrera S de génération 992.2 est propulsée par un 6 cylindres à plat 3.0 L biturbo, 480 ch et 530 Nm, boîte PDK 8 rapports. Elle associe des performances de premier ordre à un usage au quotidien.',
    reference: '911 Carrera S de 01/2026, 3 100 km, non accidentée, un seul propriétaire, carnet suivi, vendue par une concession Porsche officielle en Allemagne.',
    options: ['Pack Sport Chrono', 'Toit ouvrant en verre', 'Phares Matrix LED', 'Audio BOSE'],
    fiche: { motorisation: '6 cyl. biturbo · 480 ch', transmission: 'Propulsion · PDK 8', zeroCent: '3,3 s', circulation: '01/2026', km: 3_100, historique: '1 propriétaire', etat: 'Non accidentée' },
    prixAllemagneTTC: 163_189, prixAllemagneHT: 137_100, prixAllemagneNote: 'Médiane des 911 Carrera S phase 2 à TVA récupérable en Allemagne',
    prixFranceTTC: 239_700, prixFranceNote: '911 Carrera S phase 2 neuve en France, sans option : 159 700 € + 80 000 € de malus. Aucune occasion disponible.', malusFrance: 80_000,
    ecartMarche: 76_500, tvaAllemande: 26_100, ecart: 102_600, part: 43,
    scenario2: { label: 'Meilleur cas · prix plancher', ht: 131_008, ecart: 108_692, part: 45 },
    photos: [{ src: A + 'porsche-911-carrera-s--3-4-avant.jpg', alt: 'Porsche 911 Carrera S grise de trois quarts avant', pos: 'center 55%' }, { src: A + 'porsche-911-carrera-s--corsiva-3-4-arriere.jpg', alt: 'Porsche 911 Carrera S grise de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
  {
    id: 'bmw-m4-competition', ref: 'CRS-BM4C-2026', marque: 'BMW', modele: 'M4 Competition', cat: 'coupe', annee: '2025',
    titre: 'Coupé 510 ch · 6 cylindres en ligne 3.0 biturbo · propulsion · 2025',
    texte: 'Coupé emblématique de BMW M, la M4 Competition est propulsée par un 6 cylindres en ligne 3.0 L biturbo, 510 ch et 650 Nm, propulsion et boîte M Steptronic 8 rapports. Elle associe des performances de premier ordre à un vrai confort de grand tourisme.',
    reference: 'M4 Competition de 06/2025, 6 599 km, non accidentée, un seul propriétaire, vendue par une concession BMW officielle en Allemagne.',
    options: ['Phares laser', 'Audio Harman Kardon', 'M Drive Professional', 'Cuir Merino'],
    fiche: { motorisation: '6 cyl. biturbo · 510 ch', transmission: 'Propulsion · BVA 8', zeroCent: '3,9 s', circulation: '06/2025', km: 6_599, historique: '1 propriétaire', etat: 'Non accidentée' },
    prixAllemagneTTC: 79_939, prixAllemagneHT: 67_200, prixAllemagneNote: 'Exemplaire retenu en concession BMW, TVA récupérable',
    prixFranceTTC: 159_890, prixFranceNote: 'M4 Competition proposée en France, 12/2025, 6 900 km : prix TTC affiché par un distributeur français, malus compris.',
    ecartMarche: 79_900, tvaAllemande: 12_800, ecart: 92_700, part: 58,
    scenario2: { label: 'Scénario prudent · médiane du marché', ht: 78_814, ecart: 81_076, part: 51 },
    photos: [{ src: A + 'bmw-m4-competition--corsiva-3-4-avant.jpg', alt: 'BMW M4 blanche de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: A + 'bmw-m4-competition--corsiva-3-4-arriere.jpg', alt: 'BMW M4 blanche de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
  {
    id: 'lamborghini-urus-s', ref: 'CRS-LAMURUS-2026', marque: 'Lamborghini', modele: 'Urus S', cat: 'suv', annee: '2024',
    titre: 'Super SUV 666 ch · V8 4.0 biturbo · transmission intégrale · MY24',
    texte: 'Super SUV à transmission intégrale permanente, propulsé par un V8 4.0 L biturbo, 666 ch et 850 Nm, boîte automatique 8 rapports. L’Urus S associe les performances d’une supercar au confort d’un grand SUV.',
    reference: 'Urus S de 07/2024, 7 010 km, non accidenté, un seul propriétaire, vendu par une concession Lamborghini officielle en Allemagne.',
    options: ['Peinture Grigio Keres', 'Toit panoramique', 'Audio Bang & Olufsen'],
    fiche: { motorisation: 'V8 4.0 biturbo · 666 ch', transmission: 'Intégrale · 8 rapports', zeroCent: '3,5 s', circulation: '07/2024', km: 7_010, historique: '1 propriétaire', etat: 'Non accidenté' },
    prixAllemagneTTC: 305_000, prixAllemagneHT: 256_300, prixAllemagneNote: 'Médiane des sept Urus S éligibles en Allemagne',
    prixFranceTTC: 339_900, prixFranceNote: 'Urus S le moins cher en vente en France avec malus déjà payé : prix TTC, aucun malus à ajouter.',
    ecartMarche: 34_900, tvaAllemande: 48_700, ecart: 83_600, part: 25,
    scenario2: { label: 'Meilleur cas · annonce de référence', ht: 242_857, ecart: 97_043, part: 29 },
    photos: [{ src: A + 'lamborghini-urus-s--corsiva-3-4-avant.jpg', alt: 'Lamborghini Urus jaune de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: A + 'lamborghini-urus-s--corsiva-3-4-arriere.jpg', alt: 'Lamborghini Urus jaune de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
  {
    id: 'audi-rs-q8-performance', ref: 'CRS-ARSQ8P-2026', marque: 'Audi', modele: 'RS Q8 performance', cat: 'suv', annee: '2025',
    titre: 'SUV 640 ch · V8 4.0 biturbo · quattro · 2025',
    texte: 'Version la plus puissante du Q8, la RS Q8 performance est propulsée par un V8 4.0 L biturbo, 640 ch et 850 Nm, transmission quattro et boîte tiptronic 8 rapports. Elle associe des performances de supersportive à l’espace d’un grand SUV.',
    reference: 'RS Q8 performance de 09/2025, 4 900 km, véhicule de démonstration, un seul propriétaire, vendue par une concession Audi officielle en Allemagne.',
    options: ['Freins céramique', 'Toit panoramique', 'Affichage tête haute', 'Audio Bang & Olufsen 3D'],
    fiche: { motorisation: 'V8 biturbo · 640 ch', transmission: 'Intégrale · Tiptronic 8', zeroCent: '3,6 s', circulation: '09/2025', km: 4_900, historique: '1 propriétaire', etat: 'Véhicule de démonstration' },
    prixAllemagneTTC: 134_888, prixAllemagneHT: 113_400, prixAllemagneNote: 'Exemplaire retenu en concession Audi, TVA récupérable',
    prixFranceTTC: 208_800, prixFranceNote: 'Aucune occasion en vente en France : RS Q8 performance 2025 à moins de 10 000 km, 150 000 € + 58 800 € de malus (décote d’âge déduite).', malusFrance: 58_800,
    ecartMarche: 73_900, tvaAllemande: 21_500, ecart: 95_400, part: 46,
    scenario2: { label: 'Face à une RS Q8 neuve en France', ht: 113_351, ecart: 160_899, part: 59, franceTTC: 274_250 },
    photos: [{ src: A + 'audi-rs-q8-performance--corsiva-3-4-avant.jpg', alt: 'Audi RS Q8 noire de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: A + 'audi-rs-q8-performance--corsiva-3-4-arriere.jpg', alt: 'Audi RS Q8 noire de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
  {
    id: 'audi-r8-v10-performance', ref: 'CRS-AR8V10-2026', marque: 'Audi', modele: 'R8 V10 performance', cat: 'sportive', annee: '2024',
    titre: 'Coupé 620 ch · V10 5.2 FSI · quattro · 2024',
    texte: 'Supercar emblématique d’Audi, la R8 V10 performance quattro est propulsée par un V10 5.2 L atmosphérique, 620 ch et 580 Nm, transmission quattro et boîte S tronic 7 rapports. Sa production s’est achevée en 2024, ce qui en fait un modèle recherché.',
    reference: 'R8 V10 performance de 02/2024, 7 650 km, non accidentée, un seul propriétaire, aucune peinture refaite, vendue par un professionnel établi en Allemagne.',
    options: ['Pack carbone', 'Échappement sport', 'Audio Bang & Olufsen', 'Cuir Nappa intégral'],
    fiche: { motorisation: 'V10 5.2 · 620 ch', transmission: 'Intégrale · S tronic 7', zeroCent: '3,1 s', circulation: '02/2024', km: 7_650, historique: '1 propriétaire', etat: 'Non accidentée' },
    prixAllemagneTTC: 179_900, prixAllemagneHT: 151_200, prixAllemagneNote: 'Exemplaire retenu, TVA récupérable',
    prixFranceTTC: 239_990, prixFranceNote: 'R8 V10 performance française de 2023, 11 075 km, un propriétaire, malus déjà payé : prix TTC, aucun malus à ajouter.',
    ecartMarche: 60_100, tvaAllemande: 28_700, ecart: 88_800, part: 37,
    photos: [{ src: A + 'audi-r8-v10-performance--corsiva-3-4-avant.jpg', alt: 'Audi R8 blanche de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: A + 'audi-r8-v10-performance--corsiva-3-4-arriere.jpg', alt: 'Audi R8 blanche de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
  {
    id: 'mercedes-amg-cle-53', ref: 'CRS-MCLE53-2026', marque: 'Mercedes-AMG', modele: 'CLE 53 Coupé', cat: 'coupe', annee: '2025',
    titre: 'Coupé 449 ch · 6 cylindres en ligne 3.0 turbo · 4MATIC+ · 2025',
    texte: 'Coupé grand tourisme signé AMG, le CLE 53 4MATIC+ est propulsé par un 6 cylindres en ligne 3.0 L turbo à hybridation légère, 449 ch et 560 Nm, transmission intégrale et boîte AMG Speedshift 9 rapports. Il associe performances et confort de grand tourisme.',
    reference: 'CLE 53 4MATIC+ de 07/2025, 6 336 km, non accidenté, un seul propriétaire, carnet suivi, vendu par un professionnel établi en Allemagne.',
    options: ['Pack Premium', 'Toit panoramique', 'Audio Burmester 3D', 'Caméras 360°', 'Pack Night AMG'],
    fiche: { motorisation: '6 cyl. turbo · 449 ch', transmission: 'Intégrale · BVA 9', zeroCent: '4,2 s', circulation: '07/2025', km: 6_336, historique: '1 propriétaire', etat: 'Non accidenté' },
    prixAllemagneTTC: 76_690, prixAllemagneHT: 64_400, prixAllemagneNote: 'Exemplaire retenu, TVA récupérable',
    prixFranceTTC: 147_900, prixFranceNote: 'CLE 53 Coupé français de 04/2025, 490 km, malus de 70 000 € déjà payé : prix TTC, aucun malus à ajouter.', malusFrance: 70_000,
    ecartMarche: 71_300, tvaAllemande: 12_200, ecart: 83_500, part: 56,
    scenario2: { label: 'Scénario prudent · médiane du marché', ht: 75_622, ecart: 72_278, part: 49 },
    photos: [{ src: A + 'mercedes-amg-cle-53--corsiva-3-4-avant.jpg', alt: 'Mercedes-AMG CLE 53 Coupé grise de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: A + 'mercedes-amg-cle-53--corsiva-3-4-arriere.jpg', alt: 'Mercedes-AMG CLE 53 Coupé grise de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
  {
    id: 'audi-rs6-avant-performance', ref: 'CRS-ARS6P-2026', marque: 'Audi', modele: 'RS6 Avant performance', cat: 'break', annee: '2025',
    titre: 'Break 630 ch · V8 4.0 biturbo · quattro · 2025',
    texte: 'Break le plus rapide de la gamme Audi, la RS6 Avant performance est propulsée par un V8 4.0 L biturbo, 630 ch et 850 Nm, transmission quattro et boîte tiptronic 8 rapports. Elle associe des performances de supersportive à l’espace d’un grand break.',
    reference: 'RS6 Avant performance de 03/2025, 5 230 km, non accidentée, TVA récupérable, vendue par un professionnel établi en Allemagne.',
    options: [],
    fiche: { motorisation: 'V8 biturbo · 630 ch', transmission: 'Intégrale · Tiptronic 8', zeroCent: '3,4 s', circulation: '03/2025', km: 5_230, historique: 'Vendeur professionnel', etat: 'Non accidentée' },
    prixAllemagneTTC: 116_750, prixAllemagneHT: 98_100, prixAllemagneNote: 'Exemplaire retenu, TVA récupérable',
    prixFranceTTC: 179_900, prixFranceNote: 'RS6 Avant performance française de 02/2025, 4 900 km, malus déjà payé : prix TTC, aucun malus à ajouter.',
    ecartMarche: 63_200, tvaAllemande: 18_600, ecart: 81_800, part: 45,
    scenario2: { label: 'Scénario prudent · médiane du marché', ht: 116_802, ecart: 63_098, part: 35 },
    photos: [{ src: A + 'audi-rs6-avant-performance--corsiva-3-4-avant.jpg', alt: 'Audi RS6 Avant grise de trois quarts avant, plaque Corsiva', pos: 'center' }, { src: A + 'audi-rs6-avant-performance--corsiva-3-4-arriere.jpg', alt: 'Audi RS6 Avant grise de trois quarts arrière, plaque Corsiva', pos: 'center' }],
  },
]

export const nomFiche = (f: Fiche) => `${f.marque} ${f.modele}`
export const ficheParId = (id: string) => FICHES.find((f) => f.id === id)
export const MARQUES_ACQ = ['Toutes', ...Array.from(new Set(FICHES.map((f) => f.marque)))]
/** Prix du véhicule avec Corsiva Prime : hors taxes, covering en option. Le forfait n'est pas affiché sur les fiches
    (décision du dirigeant, 24 septembre 2026) : il figure sur la page Tarifs. */
export const budgetPrime = (f: Fiche, covering = false) => f.prixAllemagneHT + (covering ? OPTION_COVERING : 0)
/** Économie face au prix France équivalent : prix France − prix du véhicule (forfait non déduit, voir budgetPrime). */
export const economie = (f: Fiche, covering = false) => f.prixFranceTTC - budgetPrime(f, covering)
export const LOGOS_ACQ: Record<string, string> = { Audi: '/media/logos/audi.svg', BMW: '/media/logos/bmw.svg', Lamborghini: '/media/logos/lamborghini.svg', 'Mercedes-AMG': '/media/logos/amg.svg', Porsche: '/media/logos/porsche.svg' }
