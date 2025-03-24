/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.moody.mx',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'drive.google.com',
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: 'www.googleapis.com',
            port: '',
            pathname: '/**'
          }
        ],
      },
};

export default nextConfig;
