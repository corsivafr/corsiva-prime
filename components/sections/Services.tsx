import Reveal from '@/components/Reveal'
import ServicesSwitch from '@/components/sections/ServicesSwitch'
import { Section, Wrap, SecHead } from '@/components/ui'

/* Les deux services, indépendants et cumulables : onglets animés, visuel qui change, liste qui se redéploie. */
export default function Services() {
  return (
    <Section id="services" grad>
      <Wrap>
        <SecHead a="Deux services," b="indépendants, cumulables.">Import seul, ou import et immatriculation européenne. Choisissez, on gère tout de A à Z.</SecHead>
        <Reveal className="rise rise-scale"><ServicesSwitch /></Reveal>
        <Reveal className="rise mt-8 text-center text-[14.5px]" style={{ color: 'var(--ink-2)' }}>
          <span className="text-white font-semibold">Import</span> + <span className="text-white font-semibold">Immatriculation européenne</span> = le prix allemand, sans la fiscalité française.
        </Reveal>
      </Wrap>
    </Section>
  )
}
