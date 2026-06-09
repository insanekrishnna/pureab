/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizePackageImports: ["lucide-react"],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
