import Contact from "@/Components/Contact";
import SEOUpdater from "@/Components/SEOUpdater";
import PageTitle from "@/Components/titles/PageTitle";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(process.env.NEXT_PUBLIC_URI as string);

  // Common metadata configuration
  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" ? "Contact Us" : "تواصل معنا",
    description: currentLocale === "en"
      ? "Get in touch with us at My Website for any inquiries."
      : "تواصل معنا على موقعنا لأي استفسارات.",
    keywords: currentLocale === "en"
      ? "contact us, inquiries, my website"
      : "تواصل معنا, استفسارات, غزالة",
    openGraph: {
      title: currentLocale === "en" ? "Contact Us" : "تواصل معنا",
      description: currentLocale === "en"
        ? "Get in touch with us at My Website for any inquiries."
        : "تواصل معنا على موقعنا لأي استفسارات.",
      url: new URL(`/${currentLocale}/contact-us`, baseUrl).toString(),
      images: [
        {
          url: '/default-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" ? "Contact Us" : "تواصل معنا",
        },
      ],
      locale: currentLocale,
      type: 'website',
    },
  };
}

interface ContactUsPageProps {
  params: {
    locale: string;
  };
}

const ContactUsPage: React.FC<ContactUsPageProps> = ({ params: { locale } }) => {
  return (
    <>
      <SEOUpdater page={"contact-us"} locale={locale} />
      <PageTitle
        title={locale === "en" ? "Contact Us" : "اتصل بنا"}
        imgSrc={"/imgs/page-head/banner-contact.jpg"}
      />
      <Contact bgImg={false} />
    </>
  );
};

export default ContactUsPage;