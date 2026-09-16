import { Resend } from 'resend'
import { SITE } from '@/lib/site'

/* Envoi transactionnel commun aux deux routes : Resend, gabarit sombre + blanc, tout est échappé. */
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 120
export const isPhone = (s: string) => {
  const digits = s.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15 && /^[\d\s()+.-]+$/.test(s)
}

export function gabarit(titre: string, corps: string, pied = '') {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f4f6fa;font-family:Inter,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0a0a0a">
<div style="max-width:600px;margin:0 auto;padding:24px 16px">
  <div style="background:#090909;border-radius:20px 20px 0 0;padding:26px 28px;text-align:left">
    <img src="${SITE.url}/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" height="26" style="height:26px;width:auto;display:block">
  </div>
  <div style="background:#ffffff;border:1px solid rgba(10,10,10,0.08);border-top:0;border-radius:0 0 20px 20px;padding:28px">
    <h1 style="margin:0 0 14px;font-size:22px;line-height:1.15;letter-spacing:-0.02em;font-weight:600">${titre}</h1>
    ${corps}
  </div>
  <p style="font-size:12px;color:rgba(10,10,10,0.5);margin:16px 6px 0;line-height:1.5">${pied || `${SITE.legalEntity} · ${SITE.legalCountry} · Groupe Corsiva · ${SITE.phone}`}</p>
</div></body></html>`
}

export function ligne(k: string, v: string, strong = false) {
  return `<tr><td style="padding:9px 0;border-bottom:1px solid rgba(10,10,10,0.08);font-size:14px;color:rgba(10,10,10,0.64)">${k}</td><td style="padding:9px 0;border-bottom:1px solid rgba(10,10,10,0.08);font-size:${strong ? 17 : 14}px;font-weight:${strong ? 600 : 500};text-align:right;white-space:nowrap;color:${strong ? '#0045ff' : '#0a0a0a'}">${v}</td></tr>`
}

export function destinataires() {
  return (process.env.PRIME_LEADS_TO || 'corsivafr@gmail.com').split(',').map((s) => s.trim()).filter(Boolean)
}

export async function envoyer(messages: { to: string[]; subject: string; html: string; replyTo?: string }[]) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[prime] RESEND_API_KEY absent : e-mails non envoyés (' + messages.map((m) => m.subject).join(' | ') + ')')
    return { mailed: false }
  }
  const resend = new Resend(key)
  const from = process.env.RESEND_FROM || 'Corsiva Prime <onboarding@resend.dev>'
  const res = await Promise.allSettled(messages.map((m) => resend.emails.send({ from, to: m.to, subject: m.subject, html: m.html, replyTo: m.replyTo })))
  const failed = res.filter((r) => r.status === 'rejected' || (r.status === 'fulfilled' && r.value.error))
  failed.forEach((r) => console.error('[prime] resend', r.status === 'rejected' ? r.reason : r.value.error))
  return { mailed: failed.length < messages.length }
}
