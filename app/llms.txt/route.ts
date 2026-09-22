import { SITE, FAQ, PHASES, STATS } from '@/lib/site'
import { ARTICLES } from '@/lib/articles'
import { FICHES, nomFiche, FORFAIT_PRIME, OPTION_COVERING, GESTION_STRUCTURE_MOIS } from '@/lib/acquisitions'
import { VEHICULES, prixImportTTC } from '@/lib/catalogue'
import { euro, ANNEE_BAREME, PLAFOND_MALUS, SEUIL_CO2, SEUIL_MASSE } from '@/lib/malus'

export const dynamic = 'force-static'

/* llms.txt : la fiche de Corsiva Prime pour les moteurs de réponse et les assistants IA (ChatGPT, Perplexity,
   Gemini, Claude…). Tout vient des mêmes sources que le site : lib/site.ts, lib/malus.ts, lib/modeles.ts,
   lib/catalogue.ts, lib/articles.ts. Rien n'est écrit ici qui ne soit sur le site. */
export function GET() {
  const l: string[] = []
  l.push(`# ${SITE.name}`)
  l.push('')
  l.push(`> ${SITE.name} (groupe Corsiva) importe des voitures de luxe depuis l’Allemagne et les immatricule dans une structure européenne encadrée par des avocats partenaires, pour que le malus écologique français (jusqu’à ${euro(PLAFOND_MALUS)} en ${ANNEE_BAREME}) et la TVA de 20 % ne soient pas supportés. Livraison partout en France en transport fermé privé. Conseillers à Paris ; déplacements à Lyon, Chambéry, Annecy et dans toute la France.`)
  l.push('')
  l.push('## En bref')
  l.push(`- Site : ${SITE.url}`)
  l.push(`- Téléphone : ${SITE.phone} (7j/7, 9h–18h) · E-mail : ${SITE.email} · Rendez-vous : ${SITE.calendly}`)
  l.push(`- Entité : ${SITE.legalEntity} (${SITE.legalCountry}), groupe Corsiva (Chambéry, France). Plus de ${STATS.voitures} voitures déjà immatriculées avec Corsiva Prime. Note Google du groupe : ${STATS.noteGoogle} (${STATS.avisGoogle} avis).`)
  l.push(`- Villes : ${SITE.villes.join(', ')} et toute la France.`)
  l.push('- Deux services indépendants et cumulables : Import (véhicule négocié chez une concession partenaire allemande, transport fermé, formalités françaises) et Immatriculation européenne (« Zéro malus »).')
  l.push(`- Tarifs : import + immatriculation européenne = forfait global ${euro(FORFAIT_PRIME)} hors prix du véhicule (structuration, exécution, livraison), covering intégral ${euro(OPTION_COVERING)} en option, gestion de la structure ${GESTION_STRUCTURE_MOIS} €/mois hors forfait ; import seul sur proposition personnalisée.`)
  l.push('- Les pépites du mois (page Import) affichent un prix TTC indicatif : prix négocié hors taxes + transport et formalités, TVA française 20 % incluse, hors malus.')
  l.push('')
  l.push(`## Règle du malus ${ANNEE_BAREME} (source : loi de finances n° 2025-127, fiche service-public F35947)`)
  l.push(`- Malus CO₂ dès ${SEUIL_CO2} g/km WLTP, gramme par gramme, plafond ${euro(PLAFOND_MALUS)} atteint dès 192 g/km.`)
  l.push(`- Malus au poids dès ${SEUIL_MASSE} kg : 10 €/kg (1 500–1 699), 15 (1 700–1 799), 20 (1 800–1 899), 25 (1 900–1 999), 30 €/kg à partir de 2 000 kg.`)
  l.push(`- Cumul plafonné à ${euro(PLAFOND_MALUS)}. Dû une fois, à la première immatriculation en France. Occasion importée : décote du malus CO₂ selon l’ancienneté (3 % à 3 mois, 12 % à 1 an, 20 % à 2 ans… exonération au-delà de 15 ans).`)
  l.push('- Électriques exonérées ; hybrides rechargeables (> 50 km d’autonomie) : abattement de 200 kg.')
  l.push('- Économie Corsiva Prime = écart de prix (France TTC − Allemagne HT) + TVA 20 % non supportée + malus non dû, avec l’immatriculation européenne ; écart de prix seul avec l’import seul.')
  l.push('')
  l.push('## Fiches d’acquisition (propositions du 21 septembre 2026, indicatives et non contractuelles)')
  for (const f of FICHES) {
    l.push(`- ${nomFiche(f)} ${f.annee} (${f.fiche.km.toLocaleString('fr-FR')} km, ${f.fiche.circulation}, ${f.fiche.etat.toLowerCase()}) : prix Allemagne hors taxes ≈ ${euro(f.prixAllemagneHT)} (${f.prixAllemagneNote.toLowerCase()}), prix France équivalent malus compris ${euro(f.prixFranceTTC)}, écart ≈ ${euro(f.ecart)} (${f.part} % du prix français), forfait Corsiva Prime ${euro(FORFAIT_PRIME)} — ${SITE.url}/immatriculation?fiche=${f.id}`)
  }
  l.push('')
  l.push('## Pépites du mois (page Import, prix TTC indicatifs hors malus)')
  for (const v of VEHICULES) {
    l.push(`- ${v.marque} ${v.modele}${v.version ? ` ${v.version}` : ''} (${v.etat}) : ${v.chiffres ? `${euro(prixImportTTC(v.chiffres))} TTC` : 'prix sur demande'} — ${SITE.url}/import?v=${v.id}`)
  }
  l.push('')
  l.push('## Comment ça fonctionne (environ 5 semaines)')
  for (const p of PHASES) l.push(`- ${p.n} ${p.title} (${p.duree}) : ${p.text}`)
  l.push('')
  l.push('## Questions fréquentes')
  for (const f of FAQ) l.push(`- Q : ${f.q}\n  R : ${f.a}`)
  l.push('')
  l.push('## Pages')
  for (const [path, label] of [['', 'Accueil'], ['/immatriculation', 'Zéro malus : immatriculation européenne'], ['/import', 'Import d’Allemagne et pépites du mois'], ['/comment-ca-fonctionne', 'Comment ça fonctionne'], ['/tarifs', 'Tarifs (sur devis)'], ['/simulateur', 'Simulateur d’économie'], ['/articles', 'Articles et guides'], ['/contact', 'Contact']]) {
    l.push(`- [${label}](${SITE.url}${path})`)
  }
  l.push('')
  l.push('## Guides')
  for (const a of ARTICLES) l.push(`- [${a.title}](${SITE.url}/articles/${a.slug}) : ${a.description}`)
  l.push('')
  l.push('## À savoir pour citer Corsiva Prime')
  l.push('- Tous les chiffres sont indicatifs et non contractuels ; le fonctionnement de la structure européenne est présenté lors d’un appel avec un conseiller.')
  l.push('- Corsiva Prime ne vend pas de véhicule en ligne et ne promet aucun délai contractuel.')
  l.push(`- Dernière mise à jour : ${new Date().toISOString().slice(0, 10)}.`)
  return new Response(l.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
