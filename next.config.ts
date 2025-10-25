
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence multi-lockfile root inference by explicitly setting the tracing root
  // This should point to the monorepo/workspace root that contains your app
  experimental: {
    outputFileTracingRoot: process.cwd(),
  } as any,
};

export default nextConfig;
