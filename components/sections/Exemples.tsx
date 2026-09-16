import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import AutoVideo from '@/components/AutoVideo'
import { Section, Wrap, Title, Lead, Arrow, d } from '@/components/ui'
import { EXEMPLES } from '@/lib/site'
import { euro } from '@/lib/malus'

function Ligne({ k, v, strong = false, blue = false }: { k: string; v: string; strong?: boolean; blue?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b" style={{ borderColor: 'var(--hairline)' }}>
      <span className="text-[13.5px]" style={{ color: 'var(--ink-2)' }}>{k}</span>
      <span className={`tabular ${strong ? 'text-[18px] font-semibold' : 'text-[14.5px] font-medium'}`} style={{ color: blue ? 'var(--blue-deep)' : 'var(--ink)' }}>{v}</span>
    </div>
  )
}

/* Les exemples chiffrés du brief : deux véhicules neufs (avec vidéo) et une occasion. */
export default function Exemples({ showCta = true }: { showCta?: boolean }) {
  return (
    <Section tone="light" id="exemples">
      <Wrap>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7"><Title a="Des écarts" b="qui changent tout." /></div>
          <div className="lg:col-span-5">
            <Lead>Trois exemples réels de notre veille. Prix France, prix Allemagne, malus 2026 évité et TVA : l&apos;avantage total, poste par poste.</Lead>
          </div>
        </Reveal>

        <Reveal as="ul" className="grid grid-cols-1 lg:grid-cols-3 gap-5 list-none">
          {EXEMPLES.neufs.map((e, i) => (
            <li key={e.modele} className="rise rise-scale card lift overflow-hidden flex flex-col" style={d(0.08 * (i + 1))}>
              <div className="relative" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
                <AutoVideo src={e.video} poster={e.poster} alt={e.modele} sizes="(max-width: 1023px) 100vw, 33vw" objectPosition="center 40%" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>Neuf</span>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-[20px] leading-snug">{e.modele}</h3>
                <div className="mt-4">
                  <Ligne k="Prix en France" v={euro(e.prixFrance)} />
                  <Ligne k="Prix en Allemagne" v={euro(e.prixAllemagne)} />
                  <Ligne k="Écart d’achat" v={euro(e.ecart)} />
                  <Ligne k="Malus 2026 évité" v={euro(e.malus)} />
                  <Ligne k="TVA 20 %" v={`≈ ${euro(e.tva)}`} />
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-4 mt-auto">
                  <span className="text-[13.5px] font-medium">Avantage total</span>
                  <span className="display tabular text-[30px] leading-none" style={{ color: 'var(--blue-deep)' }}>{euro(e.total)}</span>
                </div>
              </div>
            </li>
          ))}

          {EXEMPLES.occasions.map((e) => (
            <li key={e.modele} className="rise rise-scale card lift overflow-hidden flex flex-col" style={d(0.3)}>
              <div className="relative zoom-media" style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}>
                <Image src={e.img} alt="Porsche, exemple d’import d’occasion" fill quality={86} sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.92)', color: '#0a0a0a' }}>Occasion</span>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-[20px] leading-snug">{e.modele}</h3>
                <p className="text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>{e.detail}</p>
                <div className="mt-4">
                  <Ligne k="Prix en France" v={euro(e.prixFrance)} />
                  <Ligne k="Prix en Allemagne" v={euro(e.prixAllemagne)} />
                  <Ligne k="Écart d’achat" v={euro(e.ecart)} />
                  <Ligne k="TVA 20 %" v={euro(e.tva)} />
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-4 mt-auto">
                  <span className="text-[13.5px] font-medium">Avantage total</span>
                  <span className="display tabular text-[30px] leading-none" style={{ color: 'var(--blue-deep)' }}>{euro(e.total)}</span>
                </div>
              </div>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="rise text-[12.5px] max-w-2xl" style={{ color: 'var(--ink-3)' }}>
            Exemples indicatifs relevés sur des offres réelles. Malus calculé sur le barème 2026 (plafond 80 000 €) ; TVA de 20 % sur le prix d&apos;achat. Chaque projet fait l&apos;objet d&apos;un chiffrage personnalisé.
          </p>
          {showCta && (
            <Link href="/simulateur" className="rise btn btn-blue flex-shrink-0" style={d(0.1)}>
              Simuler mon gain <Arrow />
            </Link>
          )}
        </Reveal>
      </Wrap>
    </Section>
  )
}
