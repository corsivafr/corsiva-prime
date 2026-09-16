import { NextResponse } from 'next/server'
import { esc, isEmail, isPhone, gabarit, ligne, destinataires, envoyer } from '../_mail'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 }) }
  if (typeof b.site === 'string' && b.site) return NextResponse.json({ ok: true, mailed: false })

  const nom = String(b.nom ?? '').trim().slice(0, 80)
  const tel = String(b.tel ?? '').trim().slice(0, 30)
  const email = String(b.email ?? '').trim().toLowerCase().slice(0, 120)
  const service = String(b.service ?? '').trim().slice(0, 60)
  const projet = String(b.projet ?? '').trim().slice(0, 2000)
  if (nom.length < 2 || !isPhone(tel) || !isEmail(email)) return NextResponse.json({ ok: false, error: 'champs' }, { status: 400 })

  const html = gabarit(
    `Nouveau projet · ${esc(nom)}`,
    `<table style="width:100%;border-collapse:collapse">
      ${ligne('Nom', esc(nom))}
      ${ligne('Téléphone', `<a href="tel:${esc(tel.replace(/\s/g, ''))}" style="color:#0045ff;text-decoration:none">${esc(tel)}</a>`)}
      ${ligne('E-mail', `<a href="mailto:${esc(email)}" style="color:#0045ff;text-decoration:none">${esc(email)}</a>`)}
      ${ligne('Service', esc(service || 'Non précisé'))}
    </table>
    <p style="margin:16px 0 6px;font-size:13px;color:rgba(10,10,10,0.5)">Projet</p>
    <p style="margin:0;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(projet || '—')}</p>`
  )
  const { mailed } = await envoyer([{ to: destinataires(), subject: `Contact Prime · ${nom} · ${service || 'projet'}`, html, replyTo: email }])
  return NextResponse.json({ ok: true, mailed })
}
