import MediaContainer from "@/Components/MediaContainer/MediaContainer";
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
      ? "Media" 
      : "الإعلامي",
    description: currentLocale === "en"
      ? "Explore our latest media resources, press releases, and news coverage."
      : "استكشف أحدث الموارد الإعلامية والبيانات الصحفية والتغطية الإخبارية الخاصة بنا.",
    keywords: currentLocale === "en"
      ? ["media center", "press releases", "news coverage", "media resources"]
      : ["المركز الإعلامي", "البيانات الصحفية", "التغطية الإخبارية", "الموارد الإعلامية"],
    openGraph: {
      title: currentLocale === "en" 
        ? "Media Center" 
        : "المركز الإعلامي",
      description: currentLocale === "en"
        ? "Access our media library, press kits, and official communications."
        : "تصفح مكتبتنا الإعلامية والأدلة الصحفية والبيانات الرسمية.",
      url: new URL(`/${currentLocale}/media`, baseUrl).toString(),
      images: [
        {
          url: '/media-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" 
            ? "Media Center Overview" 
            : "نظرة عامة على المركز الإعلامي",
        },
      ],
      locale: currentLocale,
      type: 'website',
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "المركز الإعلامي",
        'ar:description': "الوصول إلى المواد الإعلامية والبيانات الرسمية"
      })
    }
  };
}

const MediaPage = ({params}: {params: {locale: string}}) => {
  return (
    <>
      <SEOUpdater page="media" locale={params.locale} />
      <MediaContainer />
    </>
  );
};

export default MediaPage;
