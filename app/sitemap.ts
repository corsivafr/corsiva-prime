import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: { p: string; pr: number }[] = [
    { p: '', pr: 1 }, { p: '/import', pr: 0.9 }, { p: '/immatriculation', pr: 0.9 }, { p: '/comment-ca-fonctionne', pr: 0.8 },
    { p: '/tarifs', pr: 0.8 }, { p: '/simulateur', pr: 0.9 }, { p: '/contact', pr: 0.7 },
  ]
  return pages.map((x) => ({ url: `${SITE.url}${x.p}`, lastModified: now, changeFrequency: 'monthly', priority: x.pr }))
}
