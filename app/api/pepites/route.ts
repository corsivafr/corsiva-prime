import { NextResponse } from 'next/server'
import { SITE } from '@/lib/site'
import { esc, isEmail, isPhone, gabarit, ligne, destinataires, envoyer } from '../_mail'

export const runtime = 'nodejs'

/* Inscription aux « pépites allemandes » : cinq véhicules par mois, tarif final tout compris. */
export async function POST(req: Request) {
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }) }
  if (typeof b.site === 'string' && b.site) return NextResponse.json({ ok: true, mailed: false })
  const email = String(b.email ?? '').trim().toLowerCase().slice(0, 120)
  const tel = String(b.tel ?? '').trim().slice(0, 30)
  if (!isEmail(email) || (tel && !isPhone(tel))) return NextResponse.json({ ok: false, error: 'champs' }, { status: 400 })

  const htmlEquipe = gabarit(
    'Nouvel abonné aux pépites allemandes',
    `<table style="width:100%;border-collapse:collapse">
      ${ligne('E-mail', `<a href="mailto:${esc(email)}" style="color:#0045ff;text-decoration:none">${esc(email)}</a>`)}
      ${ligne('Téléphone', tel ? `<a href="tel:${esc(tel.replace(/\s/g, ''))}" style="color:#0045ff;text-decoration:none">${esc(tel)}</a>` : '—')}
      ${ligne('Source', 'Pop-up du site Corsiva Prime')}
    </table>`
  )
  const htmlProspect = gabarit(
    'Bienvenue parmi les pépites allemandes',
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.55">Bonjour,<br>vous recevrez chaque mois nos cinq pépites dénichées et négociées chez nos concessions partenaires en Allemagne, avec le tarif final tout compris — sans malus ni TVA à supporter.</p>
     <p style="margin:0 0 12px;font-size:15px;line-height:1.55">Une voiture précise en tête ? Répondez à cet e-mail ou appelez-nous : nous la trouvons.</p>
     <p style="margin:18px 0 0;font-size:14px"><a href="${SITE.phoneTel}" style="color:#0045ff;text-decoration:none;font-weight:600">${SITE.phone}</a> · <a href="${SITE.calendly}" style="color:#0045ff;text-decoration:none;font-weight:600">Réserver un appel</a></p>`
  )
  const { mailed } = await envoyer([
    { to: destinataires(), subject: `Pépites · nouvel abonné · ${email}`, html: htmlEquipe, replyTo: email },
    { to: [email], subject: 'Bienvenue parmi les pépites allemandes', html: htmlProspect, replyTo: destinataires()[0] },
  ])
  return NextResponse.json({ ok: true, mailed })
}
