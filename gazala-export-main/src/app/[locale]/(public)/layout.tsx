import { Cairo } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import PreNavbar from "@/Components/Header/PreNavbar";
import Navbar from "@/Components/Header/Navbar/index";
import { BootstrapInstallment } from "@/Components/BootstrapInstallment";
import Footer from "@/Components/Footer/Footer";
import CopyRights from "@/Components/CopyRights/CopyRights";
import { routing } from "@/i18n/routing";

const cairo_next = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}


export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale
  return (
    <html dir={locale === "en" ? "ltr" : "rtl"} lang={locale}>
      <body className={`${cairo_next.className}`}>
        <BootstrapInstallment />
        <div className="container">
          <PreNavbar />
          <Navbar />
        </div>
        <div style={{ minHeight: "63.4vh" }}>
        {children}
        </div>
        <Footer />
        <CopyRights />
      </body>
    </html>
  );
}
