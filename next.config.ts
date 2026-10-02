import type { NextConfig } from "next";

import { HF_MEDIA_HOSTS } from "./lib/higgsfield-home-constants";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: HF_MEDIA_HOSTS.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
