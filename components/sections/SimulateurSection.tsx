import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Simulateur from '@/components/Simulateur'
import { Section, Wrap, SecHead, Arrow } from '@/components/ui'

export default function SimulateurSection({ full = false }: { full?: boolean }) {
  return (
    <Section tone="light-3" id="simulateur">
      <Wrap>
        <SecHead a="Combien" b="allez-vous économiser ?">Prix France, prix Allemagne, CO₂, masse : la règle complète du malus 2026 et la TVA, appliquées à votre voiture. Le résultat vous est envoyé, un conseiller vous rappelle.</SecHead>
        {!full && <Reveal className="rise -mt-8 mb-10 text-center"><Link href="/simulateur" className="inline-flex items-center gap-2 min-h-[40px] text-[14px] font-medium" style={{ color: 'var(--blue-deep)' }}>Lire la règle de calcul complète <Arrow /></Link></Reveal>}
        <Reveal className="rise">
          <Simulateur compact={!full} />
        </Reveal>
      </Wrap>
    </Section>
  )
}
