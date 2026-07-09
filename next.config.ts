import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.auditranking.uz",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;