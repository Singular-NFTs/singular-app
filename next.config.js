/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gray-lucky-louse-813.mypinata.cloud',
                port: '',
                pathname: '/ipfs/**',
            }
        ]
    },
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
}

module.exports = nextConfig