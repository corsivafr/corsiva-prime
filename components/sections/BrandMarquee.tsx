import Image from 'next/image'

/* Toutes les marques sourcées en Allemagne, sur deux rangées qui défilent en sens inverse.
   Logos officiels (SVG), rendus en blanc sur sombre, noir sur clair. */
const ROW_A = [
  { name: 'Porsche', logo: 'porsche', h: 22 },
  { name: 'Mercedes-Benz', logo: 'mercedes', h: 34 },
  { name: 'BMW', logo: 'bmw', h: 48 },
  { name: 'Audi', logo: 'audi', h: 30 },
  { name: 'Lamborghini', logo: 'lamborghini', h: 30 },
  { name: 'Bentley', logo: 'bentley', h: 34 },
  { name: 'Rolls-Royce', logo: 'rolls-royce', h: 46 },
  { name: 'Aston Martin', logo: 'aston-martin', h: 30 },
  { name: 'Volkswagen', logo: 'volkswagen', h: 46 },
]
const ROW_B = [
  { name: 'Mercedes-AMG', logo: 'amg', h: 22 },
  { name: 'McLaren', logo: 'mclaren', h: 22 },
  { name: 'Maserati', logo: 'maserati', h: 40 },
  { name: 'Land Rover', logo: 'land-rover', h: 40 },
  { name: 'Range Rover', logo: 'range-rover', h: 16 },
  { name: 'Brabus', logo: 'brabus', h: 36 },
  { name: 'MINI', logo: 'mini', h: 34 },
  { name: 'Tesla', logo: 'tesla', h: 40 },
  { name: 'Cupra', logo: 'cupra', h: 36 },
]
const COPIES = [0, 1, 2, 3]

function Row({ items, reverse = false, light }: { items: typeof ROW_A; reverse?: boolean; light: boolean }) {
  return (
    <div className={`marquee-track items-center ${reverse ? 'reverse' : 'slow'}`}>
      {COPIES.map((c) => (
        <div key={c} className="flex items-center" aria-hidden={c > 0}>
          {items.map((b) => (
            <div key={b.name} className="flex items-center justify-center px-8 sm:px-12 h-16">
              <Image src={`/media/logos/${b.logo}.svg`} alt={c === 0 ? b.name : ''} width={200} height={b.h} unoptimized
                style={{ width: 'auto', height: b.h, filter: light ? 'brightness(0)' : 'brightness(0) invert(1)', opacity: light ? 0.8 : 0.92 }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function BrandMarquee({ light = false, title = true }: { light?: boolean; title?: boolean }) {
  return (
    <div className={`relative py-10 sm:py-12 border-y ${light ? 'light light-2' : ''}`} style={{ borderColor: 'var(--hairline-soft)' }} aria-label="Marques sourcées en Allemagne">
      {title && <p className="text-center text-[12.5px] font-medium mb-7" style={{ color: 'var(--ink-3)', letterSpacing: '0.02em' }}>Toutes les marques, sourcées chez les distributeurs officiels allemands</p>}
      <div className="marquee flex flex-col gap-2">
        <Row items={ROW_A} light={light} />
        <Row items={ROW_B} reverse light={light} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40" style={{ background: `linear-gradient(90deg, ${light ? 'var(--light-2)' : 'var(--canvas)'}, transparent)` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40" style={{ background: `linear-gradient(270deg, ${light ? 'var(--light-2)' : 'var(--canvas)'}, transparent)` }} aria-hidden="true" />
    </div>
  )
}
