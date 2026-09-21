import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { ARTICLES } from '@/lib/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages: { p: string; pr: number }[] = [
    { p: '', pr: 1 }, { p: '/import', pr: 0.9 }, { p: '/immatriculation', pr: 0.9 }, { p: '/comment-ca-fonctionne', pr: 0.8 },
    { p: '/tarifs', pr: 0.8 }, { p: '/simulateur', pr: 0.9 }, { p: '/contact', pr: 0.7 },
  ]
  const statiques = pages.map((x) => ({ url: `${SITE.url}${x.p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: x.pr }))
  const articles = [{ url: `${SITE.url}/articles`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 }, ...ARTICLES.map((a) => ({ url: `${SITE.url}/articles/${a.slug}`, lastModified: new Date(a.updated), changeFrequency: 'monthly' as const, priority: 0.7 }))]
  return [...statiques, ...articles]
}
