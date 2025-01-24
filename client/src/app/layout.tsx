import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "GAZALA",
    template: `%s | GAZALA`,
  },
  description: "Gazala Steel Fabrication Website",
  icons: [
    {
      url: "/GSF-SiteIcon.png",
      type: "image/png",
    },
    {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
