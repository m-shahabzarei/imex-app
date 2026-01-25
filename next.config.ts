import { NextConfig } from "next";

const nextConfig : NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/users/:path*/",
        destination: "https://api.imexapp.ir/:path*/",
        basePath : false
      },
    ];
  },
};

export default nextConfig;