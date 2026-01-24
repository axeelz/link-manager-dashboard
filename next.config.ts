import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon.horse",
        port: "",
        pathname: "/icon/**",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
