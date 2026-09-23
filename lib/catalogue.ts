import type { Energie } from '@/lib/malus'

/* ─────────────────────────────────────────────────────────────────────────────
   Catalogue : les véhicules mis en avant et les packages configurables.
   Les chiffres publiés (prix France / Allemagne) sont ceux du brief du dirigeant ; CO₂ et masse
   sont des données constructeur indicatives (WLTP), à confirmer sur le certificat de conformité.
   Les modèles « sur demande » n'ont volontairement aucun prix : rien n'est inventé.
   ───────────────────────────────────────────────────────────────────────────── */

/* Frais tout compris du package immatriculation européenne (tarifs internes du brief : structure européenne
   + avocat + séjour 3 000 €, transport 1 500 €, frais annexes 4 500 €). Le tarif final client affiché sur les
   fiches = prix Allemagne HT + ces frais. À valider par le dirigeant avant toute publication définitive. */
export const FRAIS_TOUT_COMPRIS = 9_000

export type Etat = 'neuf' | 'occasion'
export type Categorie = 'berline' | 'suv' | 'sport' | 'electrique' | 'compacte'

export type Chiffres = {
  prixFranceTTC: number
  prixAllemagneHT: number
  co2: number
  masse: number
  energie: Energie
  occasionMois: number
}

export type Vehicule = {
  id: string
  marque: string
  logo: string
  modele: string
  version?: string
  etat: Etat
  categorie: Categorie
  detail: string
  cover?: string
  coverPosition?: string
  photos: string[]
  chiffres?: Chiffres
  /** Prix TTC fixé par le dirigeant (transport et formalités inclus), quand il n'y a pas de détail chiffré. */
  prixFixeTTC?: number
  points: string[]
}

/* Toutes les fiches véhicules connues : les articles y puisent leurs exemples chiffrés (M3, Classe G, 911 GTS). */
export const REFERENCES: Vehicule[] = [
  {
    id: 'm3',
    marque: 'BMW',
    logo: '/media/logos/bmw.svg',
    modele: 'M3 Competition',
    version: '2025',
    etat: 'neuf',
    categorie: 'sport',
    detail: 'Berline sport, configuration sur mesure chez une concession partenaire allemande.',
    cover: '/media/photos/m3c-face.jpg',
    coverPosition: 'center 55%',
    photos: ['/media/photos/m3c-face.jpg', '/media/photos/m3c-3-4.jpg', '/media/photos/m3c-portrait.jpg', '/media/photos/m3-volant.jpg', '/media/photos/m3-sieges.jpg'],
    chiffres: { prixFranceTTC: 133_000, prixAllemagneHT: 107_600, co2: 230, masse: 1_780, energie: 'thermique', occasionMois: 0 },
    points: ['Neuve, configurée à votre goût', 'Malus 2026 au plafond en France', 'Livraison France en transport fermé'],
  },
  {
    id: 'g',
    marque: 'Mercedes-Benz',
    logo: '/media/logos/mercedes.svg',
    modele: 'Classe G',
    version: '2026',
    etat: 'neuf',
    categorie: 'suv',
    detail: 'Le tout-terrain de luxe, très recherché, aux délais souvent plus courts en Allemagne. Ici, la Classe G grise 2025 du groupe Corsiva.',
    cover: '/media/photos/g-gris-face.jpg',
    coverPosition: 'center 55%',
    photos: ['/media/photos/g-gris-face.jpg', '/media/photos/g-gris-duo.jpg'],
    chiffres: { prixFranceTTC: 209_000, prixAllemagneHT: 193_000, co2: 285, masse: 2_545, energie: 'thermique', occasionMois: 0 },
    points: ['Neuf, millésime 2026', 'Malus CO₂ et poids au plafond en France', 'Covering possible avant livraison'],
  },
  {
    id: '911-gts',
    marque: 'Porsche',
    logo: '/media/logos/porsche.svg',
    modele: '911 (992) GTS',
    etat: 'occasion',
    categorie: 'sport',
    detail: 'Occasion récente, état neuf, moins de 5 000 km, sélectionnée chez un distributeur officiel.',
    cover: '/media/photos/911-avant.jpg',
    coverPosition: 'center 45%',
    photos: ['/media/photos/911-avant.jpg', '/media/photos/911-arriere.jpg'],
    chiffres: { prixFranceTTC: 200_000, prixAllemagneHT: 190_000, co2: 255, masse: 1_595, energie: 'thermique', occasionMois: 12 },
    points: ['Occasion récente, moins de 5 000 km', 'Décote du malus selon l’ancienneté', 'Inspection avant achat'],
  },
  {
    id: 'taycan',
    marque: 'Porsche',
    logo: '/media/logos/porsche.svg',
    modele: 'Taycan',
    etat: 'neuf',
    categorie: 'electrique',
    detail: 'Pépite du mois, négociée chez une concession partenaire. Prix TTC, transport fermé et formalités d’immatriculation en France inclus.',
    prixFixeTTC: 64_000,
    cover: '/media/photos/taycan-3-4-avant.jpg',
    coverPosition: 'center 55%',
    photos: ['/media/photos/taycan-3-4-avant.jpg', '/media/photos/taycan-profil.jpg', '/media/photos/taycan-3-4-arriere.jpg', '/media/photos/taycan-detail.jpg'],
    points: ['Électrique : aucun malus écologique', 'Configuration au choix', 'Livraison en transport fermé'],
  },
  {
    id: 'urus',
    marque: 'Lamborghini',
    logo: '/media/logos/lamborghini.svg',
    modele: 'Urus',
    etat: 'neuf',
    categorie: 'suv',
    detail: 'Pépite en cours de négociation chez une concession partenaire : prix communiqué sur demande.',
    cover: '/media/photos/urus-avant.jpg',
    coverPosition: 'center 55%',
    photos: ['/media/photos/urus-avant.jpg', '/media/photos/urus-interieur.jpg', '/media/photos/urus-interieur-2.jpg'],
    points: ['Malus CO₂ et poids au plafond en France', 'Structure européenne recommandée', 'Covering possible avant livraison'],
  },
]

/* Tarif final client, tout compris : le véhicule au prix allemand HT (sans TVA ni malus) + le package. */
export const prixFinal = (c: Chiffres) => c.prixAllemagneHT + FRAIS_TOUT_COMPRIS

/* Pépites = service Import seul : véhicule négocié + transport (1 500 €) + frais annexes (4 500 €), tarifs internes du brief.
   Prix hors TVA française et hors malus, qui s'appliquent comme pour tout véhicule immatriculé en France. */
export const FRAIS_IMPORT = 6_000
export const prixImport = (c: Chiffres) => c.prixAllemagneHT + FRAIS_IMPORT
/* Prix TTC affiché sur les pépites : véhicule négocié HT + transport et formalités, TVA française de 20 %
   incluse (due à l'immatriculation en France). Hors malus écologique, propre à chaque modèle. */
export const TVA_FR = 0.2
export const prixImportTTC = (c: Chiffres) => Math.round(prixImport(c) * (1 + TVA_FR))
export const tvaImport = (c: Chiffres) => prixImportTTC(c) - prixImport(c)
/* Les pépites affichées ce mois-ci (décision du dirigeant du 23 sept. 2026 : la Taycan seule). */
export const VEHICULES: Vehicule[] = REFERENCES.filter((v) => v.id === 'taycan')
/* Prix TTC à afficher : prix fixé, sinon calculé depuis les chiffres. */
export const prixAffiche = (v: Vehicule): number | undefined => v.prixFixeTTC ?? (v.chiffres ? prixImportTTC(v.chiffres) : undefined)

export const MARQUES = ['Toutes', 'BMW', 'Mercedes-Benz', 'Porsche', 'Lamborghini'] as const

export type PackageId = 'import' | 'import-immat'

export const PACKAGES: { id: PackageId; name: string; court: string; accroche: string; items: string[]; duree: string; semaines: number; featured?: boolean; img: string }[] = [
  {
    id: 'import-immat',
    name: 'Import + immatriculation européenne',
    court: 'Import + immatriculation',
    accroche: 'Le prix allemand, sans malus ni TVA à supporter. Le véhicule est porté par une structure européenne encadrée.',
    items: ['Tout le package Import', 'Structure européenne mise en place avec nos avocats partenaires', 'Déplacement organisé : hôtel 5 étoiles, transports et restauration inclus', 'Immatriculation européenne et récupération de TVA', 'Assurance simplifiée et allégée'],
    duree: 'environ 5 semaines',
    semaines: 5,
    featured: true,
    img: '/media/photos/g63-arriere.jpg',
  },
  {
    id: 'import',
    name: 'Import',
    court: 'Import seul',
    accroche: 'Import depuis l’Allemagne et immatriculation en France : tout est géré, de la pépite négociée aux plaques.',
    items: ['On déniche la pépite chez nos concessions partenaires', 'Configuration et options au choix, deal négocié', 'Inspection, historique, contrôle documentaire', 'Transport fermé privé jusqu’à chez vous', 'Immatriculation en France : carte grise et formalités gérées'],
    duree: '3 à 4 semaines',
    semaines: 4,
    img: '/media/photos/rsq8-arriere.jpg',
  },
]

export const OPTIONS_IMG = '/media/photos/urus-interieur.jpg'

export const OPTIONS: { id: string; name: string; text: string }[] = [
  { id: 'covering', name: 'Covering complet', text: 'Teinte au choix, posé pendant la phase d’acquisition, avant la livraison.' },
]

export const CATEGORIES: Record<Categorie, string> = { berline: 'Berline', suv: 'SUV', sport: 'Sport', electrique: 'Électrique', compacte: 'Compacte' }
export const ETATS: Record<Etat, string> = { neuf: 'Neuf', occasion: 'Occasion' }
