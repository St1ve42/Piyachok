import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "client",
};

module.exports = {
    images: {
        remotePatterns: [new URL('https://lh3.googleusercontent.com/**'), new URL('https://pub-056209615f824dd09b2c8225085e978d.r2.dev/**')],
    },
}

export default nextConfig;
