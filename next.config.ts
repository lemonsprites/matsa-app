import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    __APP_VERSION__: require('./package.json').version,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lottie.host',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mtsn1ciamis.sch.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yvlcbqoabvoapczvckny.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
