import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images:{
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gazala.net",
      },
      {
        protocol: "https",
        hostname: "stagingsrv.gazala.net",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port:"5000",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
