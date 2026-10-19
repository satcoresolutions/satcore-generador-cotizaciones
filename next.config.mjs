/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // @react-pdf/renderer intenta cargar "canvas" en Node; no lo necesitamos
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
