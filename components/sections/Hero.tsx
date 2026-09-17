import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/ui'

/* Hero façon Corsiva OS : centré, badge pill avec le logo, titre en deux lignes (la seconde en dégradé
   bleu), sous-titre avec la phrase clé en blanc, deux pills, ligne de confiance. En fond, la M3 CS
   du groupe dans le garage Corsiva, en retrait, sous un halo bleu. */
export default function Hero() {
  return (
    <header className="relative overflow-hidden flex items-center" style={{ minHeight: 'min(100svh, 980px)', padding: '140px 0 90px', background: '#090909' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <Image src="/media/photos/m3-garage-face.jpg" alt="" fill priority quality={80} sizes="100vw" className="object-cover kenburns" style={{ objectPosition: 'center 62%', opacity: 0.42 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9,9,9,0.55) 0%, rgba(9,9,9,0.1) 45%, rgba(9,9,9,0.55) 80%, #090909 100%)' }} />
      </div>
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative max-w-wrap mx-auto px-5 sm:px-6 lg:px-8 text-center w-full">
        <div className="hin inline-flex pillbadge" style={{ ['--d' as string]: '0s' }}>
          <Image src="/media/logos/logo-prime-blanc.png" alt="Corsiva Prime" width={1588} height={224} style={{ width: 'auto', height: 14 }} />
        </div>

        <h1 className="h-hero hin mx-auto mt-7" style={{ ['--d' as string]: '0.12s', maxWidth: 1080 }}>
          Import de voitures premium
          <br />
          <span className="grad-blue">d’Allemagne, clé en main.</span>
        </h1>

        <p className="hin lead mx-auto" style={{ ['--d' as string]: '0.24s', margin: '22px auto 30px', maxWidth: '58ch', lineHeight: 1.6 }}>
          <span className="sub-b">Sourcing, import, immatriculation européenne.</span> Le vrai prix allemand, sans malus ni TVA à supporter : nous trouvons, contrôlons, importons et immatriculons votre voiture, livrée en France en cinq semaines environ.
        </p>

        <div className="hin flex flex-wrap justify-center gap-3" style={{ ['--d' as string]: '0.36s' }}>
          <Link href="/simulateur" className="btn-cta">Simuler mon gain <Arrow /></Link>
          <Link href="/catalogue" className="btn-w">Voir le catalogue <Arrow /></Link>
        </div>

        <div className="hin herotrust" style={{ ['--d' as string]: '0.48s' }}>
          <span className="ht"><Image src="/media/logos/google-logo.png" alt="Google" width={60} height={20} style={{ height: 14, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} /> Groupe Corsiva · 4,9 sur Google</span>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg> Avocats partenaires, France et Bulgarie</span>
          <span className="ht"><svg viewBox="0 0 24 24" fill="none" stroke="#0099ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-4.4 7-10.5A7 7 0 0 0 5 10.5C5 16.6 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.5" /></svg> Équipe à Paris, sur rendez-vous</span>
        </div>
      </div>
      <div className="scrollhint hidden sm:block" aria-hidden="true" />
    </header>
  )
}
