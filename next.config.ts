import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages";
const repoName = "luma-portfolio-store";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repoName}` : undefined,
  images: {
    unoptimized: isGitHubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
    ],
  },
};

export default nextConfig;
