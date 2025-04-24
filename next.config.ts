import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 可单独配置目录，也可以 --dirs
  // 运行next lint的时候会执行当前dirs，即使有--file
  // eslint: {
  //   dirs: ['scripts', 'src', 'utils'],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: 'export',
  basePath: '/tangwei-blog',
  /* config options here */
};

export default nextConfig;
