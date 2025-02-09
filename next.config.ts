import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    __APP_VERSION__: require('./package.json').version,
  },
  images: {
    domains: [
      "placehold.co",
      "lottie.host",
      "www.mtsn1ciamis.sch.id",
      "yvlcbqoabvoapczvckny.supabase.co"
    ]
  }
};

export default nextConfig;
