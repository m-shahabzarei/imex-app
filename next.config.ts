import type { NextConfig } from "next";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

if (!API_ORIGIN) {
  throw new Error("NEXT_PUBLIC_API_ORIGIN is not defined");
}

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webapp.imexapp.ir",
        pathname: "/**",
      },
    ],
  },

async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${API_ORIGIN}/:path*/`,
        basePath : false
      },
    ];
  },
 
};

export default nextConfig;
