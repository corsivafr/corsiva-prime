import Reveal from '@/components/Reveal'
import ServicesSwitch from '@/components/sections/ServicesSwitch'
import { Section, Wrap, Title, Lead } from '@/components/ui'

/* Les deux services, indépendants et cumulables : onglets animés, visuel qui change, liste qui se redéploie. */
export default function Services() {
  return (
    <Section id="services" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gridlines" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 -top-20 w-[560px] h-[560px] glow-blue" aria-hidden="true" />
      <Wrap className="relative">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7"><Title a="Deux services," b="indépendants, cumulables." /></div>
          <div className="lg:col-span-5"><Lead>Import seul, ou import et immatriculation européenne. Choisissez, on gère tout de A à Z.</Lead></div>
        </Reveal>
        <Reveal className="rise rise-scale">
          <ServicesSwitch />
        </Reveal>
        <Reveal className="rise mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-[14px] text-center" style={{ color: 'var(--ink-2)' }}>
          <span className="glass rounded-full px-4 py-2">Import</span>
          <span className="display text-[22px] leading-none" style={{ color: 'var(--blue)' }}>+</span>
          <span className="glass rounded-full px-4 py-2">Immatriculation européenne</span>
          <span className="display text-[22px] leading-none" style={{ color: 'var(--blue)' }}>=</span>
          <span className="font-semibold" style={{ color: 'var(--ink)' }}>le prix allemand, sans la fiscalité française</span>
        </Reveal>
      </Wrap>
    </Section>
  )
}
