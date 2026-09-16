import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { Section, Wrap, Title, d } from '@/components/ui'
import { AVIS } from '@/lib/site'

const PHOTOS = ['/media/photos/taycan-profil.jpg', '/media/photos/m3-3-4-avant-2.jpg', '/media/photos/cayenne-interieur.jpg', '/media/photos/m3-interieur.jpg']

/* Avis réels du groupe Corsiva, avec une photo de la flotte : la confiance déjà acquise. */
export default function Temoignages() {
  return (
    <Section id="avis">
      <Wrap>
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <Title a="Ils font confiance" b="au groupe Corsiva." />
          <p className="rise flex items-center gap-3 text-[14px]" style={{ ...d(0.1), color: 'var(--ink-2)' }}>
            <Image src="/media/logos/google-logo.png" alt="Google" width={72} height={24} style={{ width: 72, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
            <span style={{ color: '#f5c842', letterSpacing: '0.08em' }} aria-hidden="true">★★★★★</span>
            4,9 · 100+ avis
          </p>
        </Reveal>
        <Reveal as="ul" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none">
          {AVIS.map((a, i) => (
            <li key={a.nom} className="rise rise-scale card lift overflow-hidden flex flex-col" style={d(0.08 * (i + 1))}>
              <div className="relative zoom-media" style={{ aspectRatio: '4 / 3' }}>
                <Image src={PHOTOS[i % PHOTOS.length]} alt="" fill quality={84} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span style={{ color: '#f5c842', letterSpacing: '0.1em', fontSize: 13 }} aria-label="5 étoiles sur 5">★★★★★</span>
                <blockquote className="text-[15px] leading-relaxed mt-3">« {a.texte} »</blockquote>
                <p className="text-[12.5px] mt-auto pt-4" style={{ color: 'var(--ink-3)' }}>{a.nom} · {a.source} · Groupe Corsiva</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Wrap>
    </Section>
  )
}
