import AboutComponent from "@/Components/About";
import SEOUpdater from "@/Components/SEOUpdater";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(process.env.NEXT_PUBLIC_URI as string);

  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" 
      ? "About Us" 
      : "من نحن",
    description: currentLocale === "en"
      ? "Learn more about our company's history, mission, and values."
      : "تعرف على المزيد عن تاريخ شركتنا، مهمتنا، وقيمنا الأساسية.",
    keywords: currentLocale === "en"
      ? ["about us", "company history", "our mission", "our team"]
      : ["من نحن", "تاريخ الشركة", "مهمتنا", "فريق العمل"],
    openGraph: {
      title: currentLocale === "en" 
        ? "About Our Company" 
        : "معلومات عن الشركة",
      description: currentLocale === "en"
        ? "Discover our story and what drives us to deliver excellence."
        : "اكتشف قصتنا وما يدفعنا لتقديم التميز.",
      url: new URL(`/${currentLocale}/about`, baseUrl).toString(),
      images: [
        {
          url: '/about-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" 
            ? "About Us Overview" 
            : "نظرة عامة عن الشركة",
        },
      ],
      locale: currentLocale,
      type: 'website',
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "معلومات عنا",
        'ar:description': "تعرف على رحلة تأسيس الشركة وأهدافنا"
      })
    }
  };
}

const AboutPage = ({params}: {params: {locale: string}}) => {
  return (
    <>
      <SEOUpdater page="about" locale={params.locale} />
      <AboutComponent />
    </>
  );
};

export default AboutPage;
