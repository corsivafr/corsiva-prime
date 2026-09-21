import Image from 'next/image'
import Link from 'next/link'
import HeroPicture from '@/components/HeroPicture'
import { Arrow } from '@/components/ui'
import { SITE, STATS } from '@/lib/site'

/* Hero façon Corsiva OS, priorité au service malus : badge pill logo, titre en deux lignes (la seconde
   en dégradé bleu), sous-titre, deux pills, ligne de confiance. Fond : la M3 Competition vue d'en haut
   sur la rampe du garage (dossier « image voiture »), affichée immédiatement. */
export default function Hero() {
  return (
    <header className="relative overflow-hidden flex items-center hero-pad" style={{ minHeight: 'min(100svh, 980px)', background: '#090909' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <HeroPicture hero="home" position="center 45%" opacity={0.48} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.62) 0%, rgba(9,9,9,0.36) 45%, rgba(9,9,9,0.66) 80%, #090909 100%)' }} />
      </div>
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 text-center w-full">
        <div className="hin inline-flex pillbadge" style={{ ['--d' as string]: '0s' }}>
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} style={{ width: 'auto', height: 14 }} />
        </div>

        <h1 className="h-hero hin mx-auto mt-7" style={{ ['--d' as string]: '0.12s', maxWidth: 1080 }}>
          Sans malus ni TVA,
          <br />
          <span className="grad-blue">votre voiture d’Allemagne.</span>
        </h1>

        <p className="hin lead mx-auto" style={{ ['--d' as string]: '0.24s', margin: '22px auto 30px', maxWidth: '52ch', lineHeight: 1.55 }}>
          <span className="sub-b">Import de voitures de luxe depuis l’Allemagne, clé en main.</span> Jusqu’à 80 000 € de malus et 20 % de TVA évités grâce à l’immatriculation européenne, encadrée par nos avocats partenaires.
        </p>

        <div className="hin flex flex-wrap justify-center gap-3" style={{ ['--d' as string]: '0.36s' }}>
          <Link href="/simulateur" className="btn-cta">Simuler mon gain <Arrow /></Link>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn-w">Prendre un appel <Arrow /></a>
        </div>

        <div className="hin herotrust" style={{ ['--d' as string]: '0.48s' }}>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 17h14l-1.5-5H6.5zM7 12l1.5-4h7L17 12M7 17v2M17 17v2" /></svg> <b className="text-white">+{STATS.voitures}</b>&nbsp;voitures immatriculées avec Corsiva Prime</span>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" /></svg> Concessions partenaires en Allemagne, remises négociées</span>
          <span className="ht"><Image src="/media/logos/eu-flag.svg" alt="Union européenne" width={20} height={14} unoptimized style={{ height: 14, width: 'auto', borderRadius: 2 }} /> Avocats partenaires, France et Bulgarie</span>
          <span className="ht"><Image src="/media/logos/google-logo.png" alt="Google" width={60} height={20} style={{ height: 14, width: 'auto' }} /> {STATS.noteGoogle} · {STATS.avisGoogle} avis · Groupe Corsiva</span>
        </div>
      </div>
      <div className="scrollhint hidden sm:block" aria-hidden="true" />
    </header>
  )
}
