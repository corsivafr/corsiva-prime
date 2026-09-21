import Image, { getImageProps } from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/ui'
import { STATS } from '@/lib/site'

/* Hero façon Corsiva OS, priorité au service malus : badge pill logo, titre en deux lignes (la seconde
   en dégradé bleu), sous-titre avec la phrase clé en blanc, deux pills, ligne de confiance.
   Fond : la M3 Competition (dossier « image voiture ») de face, en retrait sous un halo bleu. */
export default function Hero() {
  const { props: desk } = getImageProps({ src: '/media/photos/m3c-face.jpg', alt: '', fill: true, quality: 80, sizes: '100vw' })
  const { props: mob } = getImageProps({ src: '/media/photos/m3c-face-mobile.jpg', alt: '', fill: true, quality: 80, sizes: '100vw' })
  return (
    <header className="relative overflow-hidden flex items-center hero-pad" style={{ minHeight: 'min(100svh, 980px)', background: '#090909' }}>
      <div className="absolute inset-0" aria-hidden="true">
        {/* Une seule image téléchargée : cadrage paysage sur grand écran, recadrage 9:16 sur mobile. */}
        <picture>
          <source media="(min-width: 640px)" srcSet={desk.srcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...mob} alt="" className="kenburns" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%', opacity: 0.46 }} />
        </picture>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.62) 0%, rgba(9,9,9,0.38) 45%, rgba(9,9,9,0.66) 80%, #090909 100%)' }} />
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

        <p className="hin lead mx-auto" style={{ ['--d' as string]: '0.24s', margin: '22px auto 30px', maxWidth: '60ch', lineHeight: 1.6 }}>
          <span className="sub-b">Immatriculation européenne et import clé en main.</span> Une société de location porteuse, structurée avec nos avocats partenaires, vous évite le malus (jusqu’à 80 000 €) et la TVA (20 %).<span className="hidden sm:inline"> Notre réseau de concessions partenaires en Allemagne vous obtient le vrai prix allemand, remises comprises.</span>
        </p>

        <div className="hin flex flex-wrap justify-center gap-3" style={{ ['--d' as string]: '0.36s' }}>
          <Link href="/simulateur" className="btn-cta">Simuler mon gain <Arrow /></Link>
          <Link href="/immatriculation" className="btn-w">Zéro malus, comment ça marche <Arrow /></Link>
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
