import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", 
      allowedOrigins: ["http://localhost:3000"],
    },
  },
    webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "async_hooks": false,
        "fs": false,
        "net": false,
        "tls": false,
      };
    }
    return config;
  },
};

export default nextConfig;
