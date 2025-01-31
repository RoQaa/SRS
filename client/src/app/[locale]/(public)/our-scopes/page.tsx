import ScopesOfWork from "@/Components/ScopesOfWork";
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
      ? "Our Business Scopes" 
      : "مجالات عملنا",
    description: currentLocale === "en"
      ? "Discover the diverse range of services and business areas we operate in."
      : "اكتشف مجموعة الخدمات المتنوعة والمجالات التجارية التي نعمل بها.",
    keywords: currentLocale === "en"
      ? ["business scopes", "services", "operations", "capabilities"]
      : ["مجالات العمل", "الخدمات", "العمليات", "القدرات"],
    openGraph: {
      title: currentLocale === "en" 
        ? "Our Operational Scopes" 
        : "نطاقات عملنا",
      description: currentLocale === "en"
        ? "Explore our comprehensive range of professional services and business expertise."
        : "استكشف مجموعة خدماتنا المهنية وخبراتنا التجارية الشاملة.",
      url: new URL(`/${currentLocale}/our-scopes`, baseUrl).toString(),
      images: [
        {
          url: '/our-scopes-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" 
            ? "Business Scopes Overview" 
            : "نظرة عامة على مجالات العمل",
        },
      ],
      locale: currentLocale,
      type: 'website',
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "مجالات عملنا التجارية",
        'ar:description': "تعرف على مختلف نطاقات العمل والخدمات التي نقدمها"
      })
    }
  };
}

const ScopesPage = ({params}: {params: {locale: string}}) => {
  return (
    <>
    <SEOUpdater page="our-scopes" locale={params.locale} />
      <ScopesOfWork />
    </>
  );
};

export default ScopesPage;
