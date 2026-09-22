'use client'

import { useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { Section, Wrap, SecHead, Arrow } from '@/components/ui'
import { PACKAGES, type PackageId } from '@/lib/catalogue'
import { FORFAIT_PRIME } from '@/lib/acquisitions'
import { euro } from '@/lib/malus'

type Cell = boolean | 'option'
const ROWS: { k: string; import: Cell; immat: Cell }[] = [
  { k: 'Pépite dénichée chez nos concessions partenaires en Allemagne', import: true, immat: true },
  { k: 'Négociation du prix, configuration et options au choix', import: true, immat: true },
  { k: 'Inspection, historique, contrôle documentaire', import: true, immat: true },
  { k: 'Transport fermé privé jusqu’à chez vous', import: true, immat: true },
  { k: 'Immatriculation en France : quitus fiscal, certificat de conformité, carte grise', import: true, immat: false },
  { k: 'Structure européenne mise en place avec nos avocats partenaires', import: false, immat: true },
  { k: 'Déplacement organisé : hôtel 5 étoiles, transports et restauration', import: false, immat: true },
  { k: 'Immatriculation européenne, TVA de 20 % récupérée', import: false, immat: true },
  { k: 'Malus français non supporté (jusqu’à 80 000 €)', import: false, immat: true },
  { k: 'Covering complet, posé avant la livraison', import: 'option', immat: 'option' },
]

function Cellule({ v }: { v: Cell }) {
  if (v === 'option') return <span className="opt">Option</span>
  if (v) return <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="#0099ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-label="Inclus"><path d="M4 10.5l4 4 8-9" /></svg>
  return <span className="dash" aria-label="Non inclus">—</span>
}

/* Les deux services comparés ligne à ligne. Sur mobile, une colonne à la fois (le sélecteur choisit
   laquelle) ; sur grand écran, les deux côte à côte, la colonne choisie surlignée. Le forfait
   global de l'import avec immatriculation européenne vient de lib/acquisitions.ts (fiches du 21 sept. 2026). */
export default function PackagesCompare({ lead = true }: { lead?: boolean }) {
  const [on, setOn] = useState<PackageId>('import-immat')
  const P = (id: PackageId) => PACKAGES.find((p) => p.id === id)!
  return (
    <Section id="packages" glow>
      <Wrap>
        <SecHead a="Deux services," b="un seul interlocuteur.">{lead ? `Comparez ce que chaque package comprend, puis composez le vôtre. Import + immatriculation européenne : forfait global de ${euro(FORFAIT_PRIME)}, hors prix du véhicule. Import seul : proposition personnalisée.` : undefined}</SecHead>
        <Reveal className="rise flex justify-center -mt-4 mb-8">
          <div className="seg" role="radiogroup" aria-label="Package à mettre en avant">
            <button type="button" aria-pressed={on === 'import'} onClick={() => setOn('import')}>Import seul</button>
            <button type="button" aria-pressed={on === 'import-immat'} onClick={() => setOn('import-immat')}>Import + immatriculation</button>
          </div>
        </Reveal>
        <Reveal className="rise rise-scale cmp-wrap">
          <div className="tbl-scroll">
            <table className="cmp">
              <thead>
                <tr>
                  <th>Ce qui est compris</th>
                  <th className={`col ${on === 'import' ? 'on' : 'hide'}`}>{P('import').court}</th>
                  <th className={`col ${on === 'import-immat' ? 'on' : 'hide'}`}>{P('import-immat').court}</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.k}>
                    <td>{r.k}</td>
                    <td className={`col ${on === 'import' ? 'on' : 'hide'}`}><Cellule v={r.import} /></td>
                    <td className={`col ${on === 'import-immat' ? 'on' : 'hide'}`}><Cellule v={r.immat} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cmp-foot">
            <div className="lbl">Forfait, délai indicatif et demande</div>
            {(['import', 'import-immat'] as PackageId[]).map((id) => (
              <div key={id} className={on === id ? 'on' : 'hidden md:block'}>
                <p className="num text-[24px] leading-none" style={{ color: on === id ? 'var(--blue)' : 'var(--ink)' }}>{id === 'import-immat' ? euro(FORFAIT_PRIME) : 'Sur proposition'}</p>
                <p className="text-[12.5px] mt-1.5" style={{ color: 'var(--ink-3)' }}>{id === 'import-immat' ? `Forfait global, hors prix du véhicule · ${P(id).duree}` : P(id).duree}</p>
                <Link href={`/tarifs#configurateur`} className={`${on === id ? 'btn-cta' : 'btn-dark'} btn-sm mt-4 inline-flex`}>Composer ce package <Arrow /></Link>
              </div>
            ))}
          </div>
        </Reveal>
      </Wrap>
    </Section>
  )
}
