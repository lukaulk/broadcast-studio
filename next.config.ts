
import { dirname } from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   turbopack: {
    root: dirname(__dirname),
  },
};

export default nextConfig;
