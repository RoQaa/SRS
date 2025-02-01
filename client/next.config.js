import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "/", 
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
    ],
  },
};

export default withNextIntl(nextConfig);
