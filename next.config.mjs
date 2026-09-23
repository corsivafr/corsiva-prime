/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Build en un seul processus : sur ce Mac, le worker webpack de Next 14 se fige. Sans effet sur Vercel. */
  experimental: { webpackBuildWorker: false },
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [{ source: '/catalogue', destination: '/import', permanent: true }]
  },
  async headers() {
    return [
      {
        /* Photos, logos, vidéos et fonds : une semaine en cache, revalidation en arrière-plan. */
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
