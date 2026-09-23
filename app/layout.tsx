import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import SiteLoader from '@/components/SiteLoader'
import PepitesPopup from '@/components/PepitesPopup'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieBanner from '@/components/CookieBanner'
import { SITE } from '@/lib/site'
import './globals.css'

/* Inter auto-hébergé (pas d'appel à Google Fonts) ; Geist via le paquet npm. */
const inter = localFont({
  src: [{ path: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Import voiture de luxe sans malus | Corsiva Prime', template: '%s | Corsiva Prime' },
  description:
    'Import de voitures de luxe d’Allemagne : immatriculation européenne sans malus ni TVA, pépites négociées chez nos concessions partenaires, livraison partout en France.',
  keywords: ['import voiture de luxe', 'achat Lamborghini Urus', 'import voiture de luxe Lyon', 'import voiture de luxe Paris', 'import voiture de luxe Annecy', 'mandataire automobile Allemagne', 'malus Urus', 'import voiture Allemagne', 'éviter le malus écologique', 'malus 2026', 'immatriculation à l’étranger', 'immatriculation européenne', 'société européenne voiture', 'voiture sans malus', 'import BMW M3', 'import Mercedes Classe G', 'import Porsche 911', 'mandataire auto Allemagne'],
  applicationName: 'Corsiva Prime',
  authors: [{ name: 'Corsiva Prime', url: SITE.url }],
  creator: 'Corsiva Prime',
  publisher: 'Corsiva Good',
  category: 'automotive',
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE.url,
    siteName: 'Corsiva Prime',
    title: 'Import voiture de luxe sans malus | Corsiva Prime',
    description: 'Immatriculation européenne, pépites négociées chez nos concessions partenaires, livraison partout en France. Jusqu’à 80 000 € de malus et 20 % de TVA évités.',
    images: [{ url: '/media/hero/home.jpg', width: 1920, height: 1279, alt: 'BMW M3 Competition importée d’Allemagne par Corsiva Prime' }],
  },
  twitter: { card: 'summary_large_image', title: 'Import voiture de luxe sans malus | Corsiva Prime', description: 'Immatriculation européenne, pépites négociées, livraison partout en France.', images: ['/media/hero/home.jpg'] },
  alternates: { canonical: SITE.url, languages: { 'fr-FR': SITE.url } },
  manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/icon.png', type: 'image/png', sizes: '512x512' }], apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }], shortcut: ['/favicon.ico'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
}

export const viewport: Viewport = {
  themeColor: '#090909',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${GeistSans.variable}`} style={{ background: '#090909' }} suppressHydrationWarning>
      <body style={{ background: '#090909', margin: 0 }}>
        {/* html.js : les révélations au défilement ne masquent le contenu que si le script tourne */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){var h=document.documentElement;h.classList.add('js');var vu=false;try{vu=!!sessionStorage.getItem('sl-vu')}catch(e){}var veil=function(){return document.querySelector('.sl-veil')};if(vu||navigator.webdriver){h.classList.add('ready');var v0=veil();if(v0){v0.style.display='none'}}else{setTimeout(function(){h.classList.add('ready')},850);setTimeout(function(){var v=veil();if(v){v.classList.add('sl-leave')}},1150);setTimeout(function(){var v=veil();if(v){v.style.display='none'}},1650)}})()" }} />
        <SiteLoader />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <PepitesPopup />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
