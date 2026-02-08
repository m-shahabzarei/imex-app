import { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    domains: ["webapp.imexapp.ir"],
  },
  async rewrites() {
    return [
      {
        source: "/users/:path*/",
        destination: "https://api.imexapp.ir/users/:path*/",
        basePath: false,
      },
      {
        source: "/ai_assistant/:path*/",
        destination: "https://api.imexapp.ir/ai_assistant/:path*/",
        basePath: false,
      },
      {
        source: "/auth/:path*/",
        destination: "https://api.imexapp.ir/auth/:path*/",
        basePath: false,
      },
      {
        source: "/knowledge/business-knowledge/:path*/",
        destination:
          "https://api.imexapp.ir/knowledge/business-knowledge/:path*/",
        basePath: false,
      },
      {
        source: "/knowledge/:path*/",
        destination: "https://api.imexapp.ir/knowledge/:path*/",
        basePath: false,
      },
      {
        source: "/core/:path*/",
        destination: "https://api.imexapp.ir/core/:path*/",
        basePath: false,
      },
      {
        source: "/book/preferential-tariff-country/:path*/",
        destination:
          "https://api.imexapp.ir/book/preferential-tariff-country/:path*/",
        basePath: false,
      },
      {
        source: "/book/preferential-tariff/:path*/",
        destination: "https://api.imexapp.ir/book/preferential-tariff/:path*/",
        basePath: false,
      },
      {
        source: "/book/tariff/:path*/",
        destination: "https://api.imexapp.ir/book/tariff/:path*/",
        basePath: false,
      },
      {
        source: "/book/statistics/:path*/",
        destination: "https://api.imexapp.ir/book/statistics/:path*/",
        basePath: false,
      },
      {
        source: "/subscription/:path*/",
        destination: "https://api.imexapp.ir/subscription/:path*/",
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
