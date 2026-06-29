import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/**',
      'node_modules/esbuild/**',
      'node_modules/webpack/**',
      'node_modules/rollup/**',
      'node_modules/terser/**',
      'node_modules/typescript/**',
      'node_modules/prettier/**',
    ],
  },
};

export default nextConfig;