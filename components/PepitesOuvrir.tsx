'use client'

import type { ReactNode } from 'react'

/* Bouton qui ouvre le pop-up des pépites (événement écouté par PepitesPopup). */
export default function PepitesOuvrir({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event('open-pepites'))}>{children}</button>
}
