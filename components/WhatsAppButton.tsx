import { SITE } from '@/lib/site'

/* Cadran WhatsApp demandé par le brief : message pré-rempli, bas droite, 56 px. */
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à Corsiva Prime sur WhatsApp"
      className="fixed z-40 bottom-5 right-5 w-14 h-14 rounded-full inline-flex items-center justify-center transition-transform hover:scale-105"
      style={{ background: '#25D366', boxShadow: '0 12px 32px rgba(37,211,102,0.35)' }}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#fff" aria-hidden="true">
        <path d="M20.5 3.5A11.8 11.8 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.1.55 4.13 1.6 5.93L0 24l6.4-1.68a11.85 11.85 0 0 0 5.65 1.44c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.4-8.4Zm-8.45 18.25a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.8 1 1.01-3.7-.23-.38a9.86 9.86 0 0 1-1.5-5.23C2.14 6.4 6.6 1.95 12.06 1.95a9.85 9.85 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  )
}
