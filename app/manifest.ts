import type { MetadataRoute } from 'next'

/* Manifeste web : nom, couleurs et icônes du site (onglet, écran d'accueil, raccourci). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Corsiva Prime',
    short_name: 'Corsiva Prime',
    description: 'Import de voitures de luxe depuis l’Allemagne et immatriculation européenne, sans malus ni TVA.',
    start_url: '/',
    display: 'browser',
    background_color: '#090909',
    theme_color: '#090909',
    lang: 'fr',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
