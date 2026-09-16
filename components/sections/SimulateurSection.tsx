import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Simulateur from '@/components/Simulateur'
import { Section, Wrap, Title, Lead, Arrow, d } from '@/components/ui'

export default function SimulateurSection({ full = false }: { full?: boolean }) {
  return (
    <Section tone="light-3" id="simulateur">
      <Wrap>
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7"><Title a="Combien" b="allez-vous économiser ?" /></div>
          <div className="lg:col-span-5">
            <Lead>Prix France, prix Allemagne, CO₂, masse : la règle complète du malus 2026 et la TVA, appliquées à votre voiture. Le résultat vous est envoyé, un conseiller vous rappelle.</Lead>
            {!full && <Link href="/simulateur" className="rise inline-flex items-center gap-2 text-[14px] font-medium mt-4" style={{ ...d(0.14), color: 'var(--blue-deep)' }}>Lire la règle de calcul complète <Arrow /></Link>}
          </div>
        </Reveal>
        <Reveal className="rise">
          <Simulateur compact={!full} />
        </Reveal>
      </Wrap>
    </Section>
  )
}
