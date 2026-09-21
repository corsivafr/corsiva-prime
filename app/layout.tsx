import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import SiteLoader from '@/components/SiteLoader'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
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
  title: { default: 'Corsiva Prime — Votre voiture d’Allemagne, clé en main', template: '%s | Corsiva Prime' },
  description:
    'Sourcing, import et immatriculation européenne. Corsiva Prime vous fait profiter du vrai prix allemand, gère tout de A à Z et structure votre projet avec ses avocats partenaires. Devis rapide.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Corsiva Prime',
    title: 'Corsiva Prime — Votre voiture d’Allemagne, clé en main',
    description: 'Sourcing, import, immatriculation. Votre voiture de rêve livrée sans une seule contrainte.',
    images: [{ url: '/media/photos/m3-3-4-avant.jpg', width: 2000, height: 1125, alt: 'BMW M3 Competition — Corsiva Prime' }],
  },
  robots: { index: true, follow: true },
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
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <SiteLoader />
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
