/* ─────────────────────────────────────────────────────────────────────────────
   Barèmes légaux 2026 — source : loi de finances n° 2025-127 du 14 février 2025 (trajectoire
   2025-2027 du malus), fiche service-public.gouv.fr F35947 « Malus écologique », mise à jour 2026.
   Rien ici n'est inventé : les montants sont ceux publiés gramme par gramme.

   Trois composantes du malus à la première immatriculation en France (véhicule neuf ou importé) :
   1. malus CO2 (WLTP) — déclenché à 108 g/km en 2026, gramme par gramme, plafond 80 000 € dès 192 g ;
   2. malus au poids (masse en ordre de marche) — déclenché à 1 500 kg en 2026, par tranches ;
   3. le cumul des deux est plafonné au plafond du malus CO2 (80 000 € en 2026).
   Véhicule d'occasion importé : le malus CO2 subit une décote selon l'ancienneté (mois depuis la
   première immatriculation à l'étranger), de 3 % à 100 % (exonération) au-delà de 180 mois.
   ───────────────────────────────────────────────────────────────────────────── */

export const ANNEE_BAREME = 2026
export const SEUIL_CO2 = 108
export const PLAFOND_MALUS = 80_000
export const SEUIL_MASSE = 1_500
export const TVA = 0.2

/* Malus CO2 2026 : g/km → € (108 à 191 ; 192 et au-delà = plafond). */
const CO2_2026: Record<number, number> = {
  108: 50, 109: 75, 110: 100, 111: 125, 112: 150, 113: 170, 114: 190, 115: 210, 116: 230, 117: 240,
  118: 260, 119: 280, 120: 310, 121: 330, 122: 360, 123: 400, 124: 450, 125: 540, 126: 650, 127: 740,
  128: 818, 129: 898, 130: 983, 131: 1074, 132: 1172, 133: 1276, 134: 1386, 135: 1504, 136: 1629, 137: 1761,
  138: 1901, 139: 2049, 140: 2205, 141: 2370, 142: 2544, 143: 2726, 144: 2918, 145: 3119, 146: 3331, 147: 3552,
  148: 3784, 149: 4026, 150: 4279, 151: 4543, 152: 4818, 153: 5105, 154: 5404, 155: 5715, 156: 6126, 157: 6637,
  158: 7248, 159: 7959, 160: 8770, 161: 9681, 162: 10692, 163: 11803, 164: 13014, 165: 14325, 166: 15736, 167: 17247,
  168: 18858, 169: 20569, 170: 22380, 171: 24291, 172: 26302, 173: 28413, 174: 30624, 175: 32935, 176: 35346, 177: 37857,
  178: 40468, 179: 43179, 180: 45990, 181: 48901, 182: 51912, 183: 55023, 184: 58134, 185: 61245, 186: 64356, 187: 67467,
  188: 70578, 189: 73689, 190: 76800, 191: 79911,
}

/* Malus au poids 2026 : tranches de masse (kg) → €/kg. */
const MASSE_2026: { de: number; a: number; euroParKg: number }[] = [
  { de: 1500, a: 1699, euroParKg: 10 },
  { de: 1700, a: 1799, euroParKg: 15 },
  { de: 1800, a: 1899, euroParKg: 20 },
  { de: 1900, a: 1999, euroParKg: 25 },
  { de: 2000, a: Infinity, euroParKg: 30 },
]

/* Décote du malus CO2 pour un véhicule d'occasion importé, selon l'ancienneté en mois. */
const DECOTE_OCCASION: { jusqua: number; taux: number }[] = [
  { jusqua: 3, taux: 0.03 }, { jusqua: 6, taux: 0.06 }, { jusqua: 9, taux: 0.09 }, { jusqua: 12, taux: 0.12 },
  { jusqua: 18, taux: 0.16 }, { jusqua: 24, taux: 0.2 }, { jusqua: 36, taux: 0.28 }, { jusqua: 48, taux: 0.33 },
  { jusqua: 60, taux: 0.38 }, { jusqua: 72, taux: 0.43 }, { jusqua: 84, taux: 0.48 }, { jusqua: 96, taux: 0.53 },
  { jusqua: 108, taux: 0.58 }, { jusqua: 120, taux: 0.64 }, { jusqua: 132, taux: 0.7 }, { jusqua: 144, taux: 0.76 },
  { jusqua: 156, taux: 0.82 }, { jusqua: 168, taux: 0.88 }, { jusqua: 180, taux: 0.94 },
]

export type Energie = 'thermique' | 'hybride-rechargeable' | 'electrique'

export function malusCO2(gParKm: number): number {
  const g = Math.round(gParKm)
  if (!Number.isFinite(g) || g < SEUIL_CO2) return 0
  if (g >= 192) return PLAFOND_MALUS
  return CO2_2026[g] ?? 0
}

export function decoteOccasion(moisDepuisPremiereImmat: number): number {
  const m = Math.max(0, Math.round(moisDepuisPremiereImmat))
  if (m === 0) return 0
  if (m > 180) return 1
  return DECOTE_OCCASION.find((d) => m <= d.jusqua)?.taux ?? 1
}

/* Masse retenue : électrique exonéré ; hybride rechargeable (autonomie > 50 km) : abattement de 200 kg. */
export function malusMasse(masseKg: number, energie: Energie): number {
  if (energie === 'electrique') return 0
  const masse = Math.round(masseKg) - (energie === 'hybride-rechargeable' ? 200 : 0)
  if (!Number.isFinite(masse) || masse < SEUIL_MASSE) return 0
  let total = 0
  for (const t of MASSE_2026) {
    if (masse < t.de) break
    const haut = Math.min(masse, t.a)
    total += (haut - t.de + 1) * t.euroParKg
  }
  return total
}

export type Simulation = {
  prixFranceTTC: number
  prixAllemagneHT: number
  co2: number
  masse: number
  energie: Energie
  occasionMois: number // 0 = neuf
}

export type Resultat = {
  ecartAchat: number
  tvaEvitee: number
  malusCO2Brut: number
  decote: number
  malusCO2: number
  malusMasse: number
  malusTotal: number
  avantageTotal: number
}

/* Règle de calcul, affichée telle quelle sur le site :
   - écart d'achat = prix France TTC − prix Allemagne HT ;
   - TVA évitée = 20 % du prix d'achat HT (la TVA française qu'un particulier paierait à l'import ;
     une société européenne assujettie ne la supporte pas) ;
   - malus = CO2 (décoté si occasion) + poids, cumul plafonné à 80 000 € ;
   - avantage total = écart + TVA + malus. */
export function simuler(s: Simulation): Resultat {
  const ecartAchat = Math.max(0, s.prixFranceTTC - s.prixAllemagneHT)
  const tvaEvitee = Math.max(0, s.prixAllemagneHT) * TVA
  const malusCO2Brut = malusCO2(s.co2)
  const decote = s.occasionMois > 0 ? decoteOccasion(s.occasionMois) : 0
  const co2Net = Math.round(malusCO2Brut * (1 - decote))
  const masse = malusMasse(s.masse, s.energie)
  const malusTotal = Math.min(PLAFOND_MALUS, co2Net + masse)
  return {
    ecartAchat,
    tvaEvitee: Math.round(tvaEvitee),
    malusCO2Brut,
    decote,
    malusCO2: co2Net,
    malusMasse: masse,
    malusTotal,
    avantageTotal: Math.round(ecartAchat + tvaEvitee + malusTotal),
  }
}

export const euro = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
