import Image from 'next/image'

const BRANDS = [
  { name: 'Porsche', logo: '/media/logos/porsche.svg', w: 168, h: 34 },
  { name: 'Mercedes-Benz', logo: '/media/logos/mercedes.svg', w: 56, h: 56 },
  { name: 'BMW', logo: '/media/logos/bmw.svg', w: 60, h: 60 },
]
const COPIES = [0, 1, 2, 3]

/* Bandeau des marques sourcées en Allemagne, en défilé infini (4 copies, translation de -25 %). */
export default function BrandMarquee({ light = false }: { light?: boolean }) {
  return (
    <div className={`marquee py-10 border-y ${light ? 'light light-2' : ''}`} style={{ borderColor: 'var(--hairline-soft)' }} aria-label="Marques sourcées en Allemagne">
      <div className="marquee-track items-center">
        {COPIES.map((c) => (
          <div key={c} className="flex items-center" aria-hidden={c > 0}>
            {BRANDS.map((b) => (
              <div key={b.name} className="flex items-center justify-center px-10 sm:px-16">
                <Image src={b.logo} alt={c === 0 ? b.name : ''} width={b.w} height={b.h} style={{ width: b.w, height: b.h, filter: light ? 'brightness(0)' : 'brightness(0) invert(1)', opacity: light ? 0.85 : 1 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
