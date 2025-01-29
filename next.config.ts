import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    __APP_VERSION__: require('./package.json').version,
  },
};

export default nextConfig;
