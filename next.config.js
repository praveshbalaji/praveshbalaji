/** @type {import('next').NextConfig} */
// basePath is needed because this deploys to praveshbalaji.github.io/praveshbalaji/
// (a project page, not a root user page). If you ever rename the repo to
// praveshbalaji.github.io, set BASE_PATH to "" instead.
const basePath = process.env.BASE_PATH ?? "/praveshbalaji";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
