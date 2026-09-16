import Link from 'next/link'
import Image from 'next/image'
import { NAV, SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="relative border-t" style={{ background: 'var(--canvas)', borderColor: 'var(--hairline-soft)' }}>
      <div className="max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} style={{ width: 200, height: 'auto' }} />
          <p className="text-[14.5px] leading-relaxed mt-5 max-w-sm" style={{ color: 'var(--ink-2)' }}>
            Sourcing, import et immatriculation européenne de voitures premium. Une entité du groupe Corsiva.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-6">
            <a href={SITE.phoneTel} className="btn btn-secondary min-h-[44px] text-[13.5px]">{SITE.phone}</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-tonal min-h-[44px] text-[13.5px]">WhatsApp</a>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-[13px] font-medium mb-4" style={{ color: 'var(--ink-3)' }}>Services</p>
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-[40px] items-center text-[14.5px] transition-colors hover:text-white" style={{ color: 'var(--ink-2)' }}>{n.label}</Link>
              </li>
            ))}
            <li><Link href="/simulateur" className="inline-flex min-h-[40px] items-center text-[14.5px]" style={{ color: 'var(--blue)' }}>Simulateur de gain</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[13px] font-medium mb-4" style={{ color: 'var(--ink-3)' }}>Nous joindre</p>
          <ul className="flex flex-col gap-1 text-[14.5px]" style={{ color: 'var(--ink-2)' }}>
            <li className="min-h-[40px] flex items-center">Équipe à Paris, sur rendez-vous</li>
            <li className="min-h-[40px] flex items-center">7j/7, de 9h à 18h</li>
            <li className="min-h-[40px] flex items-center"><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li className="min-h-[40px] flex items-center gap-4">
              <a href="https://www.instagram.com/corsiva.eu" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
              <a href="https://www.tiktok.com/@corsivafr" target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--hairline-soft)' }}>
        <div className="max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px]" style={{ color: 'var(--ink-3)' }}>
          <p>© 2026 {SITE.legalEntity} · {SITE.legalCountry} · Groupe Corsiva</p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-white min-h-[32px] inline-flex items-center">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white min-h-[32px] inline-flex items-center">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
