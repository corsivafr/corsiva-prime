import Reveal from '@/components/Reveal'
import CountUp from '@/components/fx/CountUp'
import { Wrap } from '@/components/ui'
import { STATS } from '@/lib/site'
import { euro, PLAFOND_MALUS, ANNEE_BAREME } from '@/lib/malus'

/* La bande bleue des chiffres, façon Corsiva OS. Les faits viennent du dirigeant et du barème légal. */
export default function Chiffres({ className = '' }: { className?: string }) {
  return (
    <section className={`relative py-6 ${className}`}>
      <Wrap>
        <Reveal className="blueband rise rise-scale grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="display tabular leading-none" style={{ fontSize: 'clamp(40px, 4.6vw, 60px)' }}>+<CountUp value={STATS.voitures} /></p>
            <p className="text-[16px] font-semibold mt-3">voitures immatriculées</p>
            <p className="text-[13.5px] mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>avec Corsiva Prime, via une société de location européenne.</p>
          </div>
          <div>
            <p className="display tabular leading-none" style={{ fontSize: 'clamp(40px, 4.6vw, 60px)' }}>{euro(PLAFOND_MALUS)}</p>
            <p className="text-[16px] font-semibold mt-3">de malus non supporté</p>
            <p className="text-[13.5px] mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>plafond {ANNEE_BAREME}, atteint dès 192 g/km de CO₂.</p>
          </div>
          <div>
            <p className="display tabular leading-none" style={{ fontSize: 'clamp(40px, 4.6vw, 60px)' }}><CountUp value={20} suffix=" %" /></p>
            <p className="text-[16px] font-semibold mt-3">de TVA récupérée</p>
            <p className="text-[13.5px] mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>par la société, sur le prix d’achat hors taxes.</p>
          </div>
          <div>
            <p className="display tabular leading-none" style={{ fontSize: 'clamp(40px, 4.6vw, 60px)' }}>≈ <CountUp value={5} /></p>
            <p className="text-[16px] font-semibold mt-3">semaines</p>
            <p className="text-[13.5px] mt-1" style={{ color: 'rgba(255,255,255,0.78)' }}>de l’accord à la livraison, concessions partenaires comprises.</p>
          </div>
        </Reveal>
      </Wrap>
    </section>
  )
}
