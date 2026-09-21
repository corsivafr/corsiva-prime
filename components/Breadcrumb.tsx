import { SITE } from '@/lib/site'

/* Fil d'Ariane en données structurées (invisible) : aide Google à comprendre l'arborescence. */
export default function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url }, ...items.map((it, i) => ({ '@type': 'ListItem', position: i + 2, name: it.name, item: `${SITE.url}${it.href}` }))],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}
