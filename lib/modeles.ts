import { simuler, type Energie, type Resultat } from '@/lib/malus'

/* ─────────────────────────────────────────────────────────────────────────────
   Les modèles à fort malus du catalogue « Zéro malus » et du simulateur.
   - source 'brief' : prix relevés par Corsiva Prime (brief du dirigeant).
   - source 'indicatif' : prix constructeur France indicatifs (configuration courante, arrondis) ; prix
     Allemagne HT estimé = prix France hors TVA (÷ 1,2) diminué d'une remise moyenne de 6 % constatée chez les
     concessions partenaires, arrondi au 500 €. CO₂ WLTP et masse en ordre de marche : données constructeur
     indicatives, à confirmer sur le certificat de conformité. Le malus est calculé par lib/malus.ts (barème légal).
   Tout est présenté sur le site comme indicatif et non contractuel.
   ───────────────────────────────────────────────────────────────────────────── */

export type Cat = 'sport' | 'suv' | 'berline' | 'gt'
export type Modele = {
  id: string
  marque: string
  modele: string
  cat: Cat
  prixFranceTTC: number
  prixAllemagneHT: number
  co2: number
  masse: number
  energie: Energie
  occasionMois: number
  source: 'brief' | 'indicatif'
}

export const CATS: Record<Cat, string> = { sport: 'Sportive', suv: 'SUV', berline: 'Berline', gt: 'GT' }

export const MODELES: Modele[] = [
  { id: 'bmw-m3-competition', marque: 'BMW', modele: 'M3 Competition', cat: 'sport', prixFranceTTC: 133000, prixAllemagneHT: 107600, co2: 230, masse: 1780, energie: 'thermique', occasionMois: 0, source: 'brief' },
  { id: 'mercedes-benz-classe-g-63-amg', marque: 'Mercedes-Benz', modele: 'Classe G 63 AMG', cat: 'suv', prixFranceTTC: 209000, prixAllemagneHT: 193000, co2: 285, masse: 2545, energie: 'thermique', occasionMois: 0, source: 'brief' },
  { id: 'porsche-911-992-gts-occasion-12-mois', marque: 'Porsche', modele: '911 (992) GTS · occasion 12 mois', cat: 'sport', prixFranceTTC: 200000, prixAllemagneHT: 190000, co2: 255, masse: 1595, energie: 'thermique', occasionMois: 12, source: 'brief' },
  { id: 'bmw-m4-competition', marque: 'BMW', modele: 'M4 Competition', cat: 'sport', prixFranceTTC: 130000, prixAllemagneHT: 102000, co2: 232, masse: 1750, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'bmw-m5-g90', marque: 'BMW', modele: 'M5 (G90)', cat: 'berline', prixFranceTTC: 158000, prixAllemagneHT: 124000, co2: 39, masse: 2435, energie: 'hybride-rechargeable', occasionMois: 0, source: 'indicatif' },
  { id: 'bmw-x5-m-competition', marque: 'BMW', modele: 'X5 M Competition', cat: 'suv', prixFranceTTC: 170000, prixAllemagneHT: 133000, co2: 290, masse: 2385, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'bmw-x6-m-competition', marque: 'BMW', modele: 'X6 M Competition', cat: 'suv', prixFranceTTC: 175000, prixAllemagneHT: 137000, co2: 292, masse: 2395, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'bmw-m8-competition-coupe', marque: 'BMW', modele: 'M8 Competition Coupé', cat: 'gt', prixFranceTTC: 175000, prixAllemagneHT: 137000, co2: 250, masse: 1885, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'mercedes-amg-gt-63-4matic', marque: 'Mercedes-AMG', modele: 'GT 63 4Matic+', cat: 'gt', prixFranceTTC: 190000, prixAllemagneHT: 149000, co2: 285, masse: 1970, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'mercedes-amg-gle-63-s', marque: 'Mercedes-AMG', modele: 'GLE 63 S', cat: 'suv', prixFranceTTC: 165000, prixAllemagneHT: 129000, co2: 265, masse: 2480, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'mercedes-amg-c-63-s-e-performance', marque: 'Mercedes-AMG', modele: 'C 63 S E Performance', cat: 'berline', prixFranceTTC: 120000, prixAllemagneHT: 94000, co2: 20, masse: 2160, energie: 'hybride-rechargeable', occasionMois: 0, source: 'indicatif' },
  { id: 'mercedes-maybach-gls-600', marque: 'Mercedes-Maybach', modele: 'GLS 600', cat: 'suv', prixFranceTTC: 220000, prixAllemagneHT: 172500, co2: 285, masse: 2785, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'porsche-cayenne-s', marque: 'Porsche', modele: 'Cayenne S', cat: 'suv', prixFranceTTC: 130000, prixAllemagneHT: 102000, co2: 260, masse: 2110, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'porsche-cayenne-turbo-e-hybrid', marque: 'Porsche', modele: 'Cayenne Turbo E-Hybrid', cat: 'suv', prixFranceTTC: 190000, prixAllemagneHT: 149000, co2: 30, masse: 2595, energie: 'hybride-rechargeable', occasionMois: 0, source: 'indicatif' },
  { id: 'porsche-911-turbo-s', marque: 'Porsche', modele: '911 Turbo S', cat: 'sport', prixFranceTTC: 260000, prixAllemagneHT: 203500, co2: 265, masse: 1640, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'porsche-panamera-turbo-s-e-hybrid', marque: 'Porsche', modele: 'Panamera Turbo S E-Hybrid', cat: 'berline', prixFranceTTC: 230000, prixAllemagneHT: 180000, co2: 28, masse: 2470, energie: 'hybride-rechargeable', occasionMois: 0, source: 'indicatif' },
  { id: 'audi-rs-6-avant', marque: 'Audi', modele: 'RS 6 Avant', cat: 'berline', prixFranceTTC: 145000, prixAllemagneHT: 113500, co2: 265, masse: 2090, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'audi-rs-q8', marque: 'Audi', modele: 'RS Q8', cat: 'suv', prixFranceTTC: 160000, prixAllemagneHT: 125500, co2: 280, masse: 2350, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'audi-sq8', marque: 'Audi', modele: 'SQ8', cat: 'suv', prixFranceTTC: 115000, prixAllemagneHT: 90000, co2: 245, masse: 2300, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'lamborghini-urus-s', marque: 'Lamborghini', modele: 'Urus S', cat: 'suv', prixFranceTTC: 270000, prixAllemagneHT: 211500, co2: 320, masse: 2200, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'lamborghini-hurac-n-tecnica', marque: 'Lamborghini', modele: 'Huracán Tecnica', cat: 'sport', prixFranceTTC: 260000, prixAllemagneHT: 203500, co2: 300, masse: 1379, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'ferrari-purosangue', marque: 'Ferrari', modele: 'Purosangue', cat: 'suv', prixFranceTTC: 420000, prixAllemagneHT: 329000, co2: 393, masse: 2033, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'ferrari-roma', marque: 'Ferrari', modele: 'Roma', cat: 'gt', prixFranceTTC: 250000, prixAllemagneHT: 196000, co2: 255, masse: 1472, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'bentley-bentayga-v8', marque: 'Bentley', modele: 'Bentayga V8', cat: 'suv', prixFranceTTC: 240000, prixAllemagneHT: 188000, co2: 294, masse: 2416, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'bentley-continental-gt-v8', marque: 'Bentley', modele: 'Continental GT V8', cat: 'gt', prixFranceTTC: 260000, prixAllemagneHT: 203500, co2: 275, masse: 2273, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'rolls-royce-cullinan', marque: 'Rolls-Royce', modele: 'Cullinan', cat: 'suv', prixFranceTTC: 400000, prixAllemagneHT: 313500, co2: 355, masse: 2660, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'range-rover-sport-sv', marque: 'Range Rover', modele: 'Sport SV', cat: 'suv', prixFranceTTC: 200000, prixAllemagneHT: 156500, co2: 295, masse: 2560, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'range-rover-autobiography-p530', marque: 'Range Rover', modele: 'Autobiography P530', cat: 'suv', prixFranceTTC: 190000, prixAllemagneHT: 149000, co2: 280, masse: 2585, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'aston-martin-dbx707', marque: 'Aston Martin', modele: 'DBX707', cat: 'suv', prixFranceTTC: 260000, prixAllemagneHT: 203500, co2: 323, masse: 2245, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'aston-martin-vantage', marque: 'Aston Martin', modele: 'Vantage', cat: 'sport', prixFranceTTC: 200000, prixAllemagneHT: 156500, co2: 274, masse: 1605, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
  { id: 'maserati-grecale-trofeo', marque: 'Maserati', modele: 'Grecale Trofeo', cat: 'suv', prixFranceTTC: 130000, prixAllemagneHT: 102000, co2: 254, masse: 2027, energie: 'thermique', occasionMois: 0, source: 'indicatif' },
]

export const nomModele = (m: Modele) => `${m.marque} ${m.modele}`
export const calculer = (m: Modele): Resultat => simuler({ prixFranceTTC: m.prixFranceTTC, prixAllemagneHT: m.prixAllemagneHT, co2: m.co2, masse: m.masse, energie: m.energie, occasionMois: m.occasionMois })
export const MARQUES_MODELES = ['Toutes', ...Array.from(new Set(MODELES.map((m) => m.marque)))]
export const modeleParId = (id: string) => MODELES.find((m) => m.id === id)
