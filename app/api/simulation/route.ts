import { NextResponse } from 'next/server'
import { simuler, euro, type Energie, ANNEE_BAREME, PLAFOND_MALUS } from '@/lib/malus'
import { SITE } from '@/lib/site'
import { esc, isEmail, isPhone, gabarit, ligne, destinataires, envoyer } from '../_mail'

export const runtime = 'nodejs'

const num = (v: unknown, min: number, max: number) => {
  const n = Number(v)
  return Number.isFinite(n) && n >= min && n <= max ? n : null
}
const ENERGIES: Energie[] = ['thermique', 'hybride-rechargeable', 'electrique']

/* Le prospect lance la simulation avec son téléphone et son e-mail : on recalcule côté serveur,
   on envoie le lead à l'équipe et une copie du résultat au prospect. */
export async function POST(req: Request) {
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }) }

  if (typeof b.site === 'string' && b.site) return NextResponse.json({ ok: true, mailed: false }) // pot de miel

  const tel = String(b.tel ?? '').trim().slice(0, 30)
  const email = String(b.email ?? '').trim().toLowerCase().slice(0, 120)
  const modele = String(b.modele ?? '').trim().slice(0, 80)
  if (!isPhone(tel) || !isEmail(email)) return NextResponse.json({ ok: false, error: 'contact' }, { status: 400 })

  const prixFranceTTC = num(b.prixFranceTTC, 1_000, 5_000_000)
  const prixAllemagneHT = num(b.prixAllemagneHT, 1_000, 5_000_000)
  const co2 = num(b.co2, 0, 600)
  const masse = num(b.masse, 500, 5_000)
  const occasionMois = num(b.occasionMois, 0, 400) ?? 0
  const energie = ENERGIES.includes(b.energie as Energie) ? (b.energie as Energie) : 'thermique'
  if (prixFranceTTC === null || prixAllemagneHT === null || co2 === null || masse === null) {
    return NextResponse.json({ ok: false, error: 'valeurs' }, { status: 400 })
  }

  const r = simuler({ prixFranceTTC, prixAllemagneHT, co2, masse, energie, occasionMois })
  const libEnergie = energie === 'electrique' ? 'Électrique' : energie === 'hybride-rechargeable' ? 'Hybride rechargeable' : 'Thermique / hybride simple'
  const etat = occasionMois > 0 ? `Occasion, ${occasionMois} mois` : 'Neuf'

  const tableau = `<table style="width:100%;border-collapse:collapse;margin:8px 0 4px">
    ${ligne('Véhicule', esc(modele || 'Non précisé'))}
    ${ligne('État', esc(etat))}
    ${ligne('Énergie', libEnergie)}
    ${ligne('Prix France TTC', euro(prixFranceTTC))}
    ${ligne('Prix Allemagne HT', euro(prixAllemagneHT))}
    ${ligne('CO₂ WLTP / masse', `${co2} g/km · ${masse} kg`)}
    ${ligne('Écart d’achat', euro(r.ecartAchat))}
    ${ligne('TVA 20 % non supportée', euro(r.tvaEvitee))}
    ${ligne(`Malus CO₂ ${ANNEE_BAREME}${r.decote ? ` (décote ${Math.round(r.decote * 100)} %)` : ''}`, euro(r.malusCO2))}
    ${ligne('Malus au poids', euro(r.malusMasse))}
    ${ligne(`Malus total évité (plafond ${euro(PLAFOND_MALUS)})`, euro(r.malusTotal))}
    ${ligne('Avantage total estimé', euro(r.avantageTotal), true)}
  </table>`

  const htmlEquipe = gabarit(
    `Nouvelle simulation · ${esc(modele || 'véhicule')} · ${euro(r.avantageTotal)}`,
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.5">Un prospect vient de lancer le simulateur Corsiva Prime.</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 18px">
       ${ligne('Téléphone', `<a href="tel:${esc(tel.replace(/\s/g, ''))}" style="color:#0045ff;text-decoration:none">${esc(tel)}</a>`)}
       ${ligne('E-mail', `<a href="mailto:${esc(email)}" style="color:#0045ff;text-decoration:none">${esc(email)}</a>`)}
     </table>
     ${tableau}
     <p style="margin:16px 0 0;font-size:12px;color:rgba(10,10,10,0.5)">Barème ${ANNEE_BAREME} (loi de finances n° 2025-127, fiche service-public F35947). À rappeler sous 24 h.</p>`
  )

  const htmlProspect = gabarit(
    `Votre simulation Corsiva Prime : ${euro(r.avantageTotal)} d’avantage estimé`,
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.5">Bonjour,<br>voici le détail de la simulation que vous venez de lancer sur ${esc(SITE.name)}. Un conseiller vous rappelle sous 24 h pour la valider avec vous.</p>
     ${tableau}
     <p style="margin:18px 0 0;font-size:12.5px;line-height:1.5;color:rgba(10,10,10,0.6)">Simulation indicative et non contractuelle, calculée sur le barème français ${ANNEE_BAREME} du malus (CO₂ et poids, plafond ${euro(PLAFOND_MALUS)}) et une TVA de 20 % sur le prix d’achat hors taxes. Le montage effectif dépend de votre situation ; il est structuré avec nos avocats partenaires.</p>
     <p style="margin:18px 0 0;font-size:14px"><a href="${SITE.phoneTel}" style="color:#0045ff;text-decoration:none;font-weight:600">${SITE.phone}</a> · <a href="${SITE.whatsapp}" style="color:#0045ff;text-decoration:none;font-weight:600">WhatsApp</a></p>`
  )

  const { mailed } = await envoyer([
    { to: destinataires(), subject: `Simulation Prime · ${modele || 'véhicule'} · ${euro(r.avantageTotal)} · ${tel}`, html: htmlEquipe, replyTo: email },
    { to: [email], subject: `Votre simulation Corsiva Prime : ${euro(r.avantageTotal)} d’avantage estimé`, html: htmlProspect, replyTo: destinataires()[0] },
  ])

  return NextResponse.json({ ok: true, mailed, resultat: r })
}
