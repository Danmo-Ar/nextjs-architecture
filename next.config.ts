/** @type {import('next').NextConfig} */
import { createEnv } from './src/config/env';
createEnv();
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone'
};

export default nextConfig;
