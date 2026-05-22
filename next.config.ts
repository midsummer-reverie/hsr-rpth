import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'],
  
  // บังคับข้ามการตรวจ ESLint ทั้งหมดตอนบิลด์เว็บ
  eslint: {
    ignoreDuringBuilds: true,
  },
  // บังคับข้ามการตรวจความปลอดภัยของ TypeScript ทั้งหมดตอนบิลด์เว็บ
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;