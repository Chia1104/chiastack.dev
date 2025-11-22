/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  reactCompiler: true,
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  experimental: {
    viewTransition: true,
    authInterrupts: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default config;
