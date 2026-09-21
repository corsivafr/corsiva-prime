import { HERO_IMAGES, type HeroKey } from '@/lib/site'

/* Fond de hero : une image statique (pas d'optimiseur à la volée), servie tout de suite, en priorité.
   Deux cadrages : paysage 1920 px sur grand écran, 9:16 sur mobile. Préchargée par l'écran de chargement. */
export default function HeroPicture({ hero, position = 'center', opacity = 0.44, className = '' }: { hero: HeroKey; position?: string; opacity?: number; className?: string }) {
  const img = HERO_IMAGES[hero]
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={img.d} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.m} alt="" fetchPriority="high" decoding="sync" className={`kenburns ${className}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, opacity }} />
    </picture>
  )
}
