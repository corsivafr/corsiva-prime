import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Wrap, Arrow } from '@/components/ui'
import { SITE } from '@/lib/site'

/* Appel à l'action final : la bande RDV de Corsiva OS — panneau nuit, filet bleu, halo, centré. */
export default function CTA({ title = ['Votre prochaine voiture', 'vous attend en Allemagne.'], text = 'Parlons de votre projet. Un conseiller vous rappelle rapidement, avec un premier chiffrage.', appel = false }: { title?: [string, string]; text?: string; appel?: boolean }) {
  return (
    <section className="relative py-20 sm:py-28">
      <Wrap>
        <Reveal className="rdvband rise rise-scale">
          <h2 className="h-sec">
            {title[0]}
            <br />
            <span className="grad-blue">{title[1]}</span>
          </h2>
          <p className="lead mx-auto mt-2" style={{ maxWidth: '52ch' }}>{text}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {appel ? (
              <>
                <a href={SITE.phoneTel} className="btn-cta">Prendre un appel <Arrow /></a>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w">Réserver un créneau <Arrow /></a>
                <Link href="/contact" className="btn-dark">Nous écrire</Link>
              </>
            ) : (
              <>
                <Link href="/contact" className="btn-cta">Parlons de votre projet <Arrow /></Link>
                <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w">Réserver un appel</a>
                <a href={SITE.phoneTel} className="btn-dark">{SITE.phone}</a>
              </>
            )}
          </div>
        </Reveal>
      </Wrap>
    </section>
  )
}
