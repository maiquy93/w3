/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGO_URI:
      "mongodb+srv://maiquy93:bonghong@cluster0.ueqnvjq.mongodb.net/tiktok-clone-dev",
  },
};

module.exports = nextConfig;
