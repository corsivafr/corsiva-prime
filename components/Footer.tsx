import Link from 'next/link'
import Image from 'next/image'
import { NAV, SITE, STATS } from '@/lib/site'

/* Pied de page façon Corsiva OS : marque et conformité, services, nous joindre, groupe ; barre légale. */
export default function Footer() {
  return (
    <footer className="relative border-t" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,153,255,0.035))', borderColor: 'var(--hairline-soft)' }}>
      <div className="max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8">
        <div className="md:col-span-5 lg:col-span-4">
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} style={{ width: 210, height: 'auto' }} />
          <p className="text-[14.5px] leading-relaxed mt-5 max-w-sm" style={{ color: 'var(--ink-2)' }}>
            Zéro malus, zéro TVA : immatriculation européenne et import de voitures premium depuis l’Allemagne, au vrai prix allemand. Chaque mois, cinq pépites négociées chez nos concessions partenaires. Une entité du groupe Corsiva.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="legalbadge"><Image src="/media/logos/eu-flag.svg" alt="Union européenne" width={24} height={16} unoptimized style={{ height: 16, width: 'auto', borderRadius: 2 }} /> <span>Droit <b>européen</b></span></span>
            <span className="legalbadge"><Image src="/media/logos/rgpd.svg" alt="RGPD" width={40} height={16} unoptimized style={{ height: 16, width: 'auto' }} /> <span>Conforme</span></span>
            <span className="legalbadge"><Image src="/media/logos/google-logo.png" alt="Google" width={48} height={16} style={{ height: 14, width: 'auto' }} /> <span><b>{STATS.noteGoogle}</b> · {STATS.avisGoogle} avis · Groupe Corsiva</span></span>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-6">
            <a href={SITE.phoneTel} className="btn-w btn-sm">{SITE.phone}</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-dark btn-sm">WhatsApp</a>
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <p className="display text-[15px] font-medium mb-4 text-white" style={{ letterSpacing: '-0.01em' }}>Services</p>
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="inline-flex min-h-[38px] items-center text-[14.5px] transition-colors hover:text-white" style={{ color: 'var(--ink-2)' }}>{n.label}</Link></li>
            ))}
            <li><Link href="/simulateur" className="inline-flex min-h-[38px] items-center text-[14.5px] font-medium" style={{ color: 'var(--blue)' }}>Simulateur de gain</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <p className="display text-[15px] font-medium mb-4 text-white" style={{ letterSpacing: '-0.01em' }}>Nous joindre</p>
          <ul className="flex flex-col gap-1 text-[14.5px]" style={{ color: 'var(--ink-2)' }}>
            <li className="flex flex-wrap items-center gap-x-2"><a href={SITE.phoneTel} className="inline-flex items-center min-h-[40px] hover:text-white">{SITE.phone}</a><span>· 7j/7, 9h – 18h</span></li>
            <li><a href={`mailto:${SITE.email}`} className="inline-flex items-center min-h-[40px] hover:text-white">{SITE.email}</a></li>
            <li>Nos conseillers se déplacent partout en France</li>
            <li className="flex flex-wrap gap-2 pt-1">
              {SITE.villes.map((v) => <span key={v} className="text-[12.5px] px-2.5 py-1 rounded-full" style={{ background: 'var(--surface-1)', border: '1px solid var(--hairline)', color: 'var(--ink)' }}>{v}</span>)}
            </li>
          </ul>
        </div>

        <div className="md:col-span-12 lg:col-span-3">
          <p className="display text-[15px] font-medium mb-4 text-white" style={{ letterSpacing: '-0.01em' }}>Le groupe Corsiva</p>
          <ul className="flex flex-col gap-2.5 text-[14.5px]" style={{ color: 'var(--ink-2)' }}>
            <li><a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[40px] hover:text-white">Réserver un appel</a></li>
            <li><a href="https://corsiva.fr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[40px] hover:text-white">corsiva.fr</a></li>
            <li className="flex gap-4 pt-1">
              <a href="https://www.instagram.com/corsiva.eu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[40px] hover:text-white"><Image src="/media/logos/instagram.png" alt="" width={18} height={18} style={{ width: 18, height: 18 }} /> Instagram</a>
              <a href="https://www.tiktok.com/@corsivafr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[40px] hover:text-white"><Image src="/media/logos/tiktok.svg" alt="" width={16} height={16} unoptimized style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} /> TikTok</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--hairline-soft)' }}>
        <div className="max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
          <p>© 2026 {SITE.legalEntity} · {SITE.legalCountry} · Groupe Corsiva · Simulations indicatives, non contractuelles (barème 2026)</p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white min-h-[40px] inline-flex items-center">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white min-h-[40px] inline-flex items-center">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
