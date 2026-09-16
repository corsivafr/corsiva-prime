import Link from 'next/link'
import { Wrap, Arrow } from '@/components/ui'

export default function NotFound() {
  return (
    <section className="grain relative min-h-screen flex items-center">
      <Wrap className="py-40 text-center">
        <p className="display tabular" style={{ fontSize: 'clamp(80px, 16vw, 180px)', color: 'var(--blue)', lineHeight: 1 }}>404</p>
        <h1 className="mt-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Cette page n’existe pas.</h1>
        <p className="mt-4 text-[16px]" style={{ color: 'var(--ink-2)' }}>La voiture, elle, vous attend toujours en Allemagne.</p>
        <Link href="/" className="btn btn-primary mt-8">Retour à l’accueil <Arrow /></Link>
      </Wrap>
    </section>
  )
}
