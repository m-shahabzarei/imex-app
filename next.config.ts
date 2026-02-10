import type { NextConfig } from "next";

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

if (!API_ORIGIN) {
  throw new Error("NEXT_PUBLIC_API_ORIGIN is not defined");
}

const API_ROUTES = [
  "auth",
  "users",
  "core",
  "subscription",
  "ai_assistant",

  "knowledge",
  "knowledge/business-knowledge",

  "book/tariff",
  "book/statistics",
  "book/preferential-tariff",
  "book/preferential-tariff-country",
] as const;

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
    return API_ROUTES.map((route) => ({
      source: `/api/${route}/:path*/`,
      destination: `${API_ORIGIN}/${route}/:path*/`,
    }));
  },
};

export default nextConfig;
