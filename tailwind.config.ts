import type { Config } from 'tailwindcss'

/* Corsiva Prime — jetons de la DA Corsiva (dark canvas Framer / Corsiva OS), déclinée ici en
   noir, blanc et nuances de bleu. Le site alterne des sections sombres et des sections claires. */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#090909',
        surface: { 1: '#141414', 2: '#1c1c1c' },
        hairline: { DEFAULT: '#262626', soft: '#1a1a1a' },
        ink: { DEFAULT: '#ffffff', muted: '#999999' },
        light: { DEFAULT: '#ffffff', 2: '#f4f6fa', 3: '#e9eef7' },
        blue: { DEFAULT: '#0099ff', deep: '#0045ff', ink: '#062a6b', tint: '#e6f2ff' },
        night: '#0a0a0a',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { lg: '15px', xl: '20px', '2xl': '30px' },
      maxWidth: { wrap: '1200px' },
    },
  },
  plugins: [],
}

export default config
