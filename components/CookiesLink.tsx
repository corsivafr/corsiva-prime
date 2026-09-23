'use client'

/* Lien du pied de page qui rouvre le bandeau cookies. */
export default function CookiesLink({ className = '' }: { className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('open-cookies'))}>Gérer mes cookies</button>
}
