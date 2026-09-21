import type { Energie } from '@/lib/malus'

/* ─────────────────────────────────────────────────────────────────────────────
   Catalogue : les véhicules mis en avant et les packages configurables.
   Les chiffres publiés (prix France / Allemagne) sont ceux du brief du dirigeant ; CO₂ et masse
   sont des données constructeur indicatives (WLTP), à confirmer sur le certificat de conformité.
   Les modèles « sur demande » n'ont volontairement aucun prix : rien n'est inventé.
   ───────────────────────────────────────────────────────────────────────────── */

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
  points: string[]
}

export const VEHICULES: Vehicule[] = [
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
    detail: 'Le tout-terrain de luxe, très recherché, aux délais souvent plus courts en Allemagne.',
    cover: '/media/photos/g63-face.jpg',
    coverPosition: 'center 50%',
    photos: ['/media/photos/g63-face.jpg', '/media/photos/g63-arriere.jpg', '/media/photos/g63-detail.jpg'],
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
]

export const MARQUES = ['Toutes', 'BMW', 'Mercedes-Benz', 'Porsche'] as const

export type PackageId = 'import' | 'import-immat'

export const PACKAGES: { id: PackageId; name: string; court: string; accroche: string; items: string[]; duree: string; semaines: number; featured?: boolean; img: string }[] = [
  {
    id: 'import-immat',
    name: 'Import + immatriculation européenne',
    court: 'Import + immatriculation',
    accroche: 'Le prix allemand, sans malus ni TVA à supporter. Le véhicule est porté par votre société européenne.',
    items: ['Tout le package Import', 'Société de location porteuse créée avec notre avocat partenaire', 'Déplacement organisé : hôtel 5 étoiles, transports et restauration inclus', 'Immatriculation européenne et récupération de TVA', 'Assurance simplifiée et allégée'],
    duree: 'environ 5 semaines',
    semaines: 5,
    featured: true,
    img: '/media/photos/g63-arriere.jpg',
  },
  {
    id: 'import',
    name: 'Import',
    court: 'Import seul',
    accroche: 'La bonne voiture, au bon prix, livrée en France. Vous immatriculez en France.',
    items: ['Cahier des charges et validation du modèle', 'Sourcing chez nos concessions partenaires, remises négociées', 'Inspection, historique, contrôle documentaire', 'Transport fermé privé jusqu’à chez vous', 'Carte grise française et formalités'],
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
