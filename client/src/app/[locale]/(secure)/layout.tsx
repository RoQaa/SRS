import "@/index.scss";
import NoSsr from "@/utils/NoSsr";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <html>
        <Head>
          <link
            rel="icon"
            href="/assets/images/favicon.png"
            type="image/x-icon"
          />
          <link
            rel="shortcut icon"
            href="/assets/images/favicon.png"
            type="image/x-icon"
          />
          <title>Gazala - Dashboard</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
            rel="stylesheet"
          />
        </Head>
        <body suppressHydrationWarning={true}>
          <NoSsr>
            {children}
          <ToastContainer />
            
            </NoSsr>
        </body>
      </html>
  );
}
