const { createSecureHeaders } = require('next-secure-headers');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        locale: false,
        headers: [
          ...createSecureHeaders({
            forceHTTPSRedirect: [true, { maxAge: 63072000, includeSubDomains: true, preload: true }],
          }),
        ],
      },
    ];
  },
  images: {
    domains: ['gxdhxigvkmntfgqtbpob.supabase.co'],
  },
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gxdhxigvkmntfgqtbpob.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
};

module.exports = nextConfig;
