import MediaContainer from "@/Components/MediaContainer/MediaContainer";


const fetchSeo = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/findByPage/media`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch SEO data:", res.status, res.statusText);
      return null;
    }

    const seoData = await res.json();
    return seoData.data;
  } catch (error) {
    console.error("Error fetching or parsing SEO data:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const currentLocale = params.locale;

  // Fetch SEO data
  const seo = await fetchSeo();

  // Default metadata if fetching fails
  const defaultMetadata = {
    title: currentLocale === "en" ? "Media" : "الوسائط",
    description:
      currentLocale === "en"
        ? "Discover the latest media content, news, and updates from our company."
        : "اكتشف أحدث محتويات وسائل الإعلام والأخبار والتحديثات من شركتنا.",
    keywords:
      currentLocale === "en"
        ? "media, news, updates, company"
        : "وسائل الإعلام, الأخبار, التحديثات, الشركة",
  };

  // Construct metadata based on availability of SEO data
  const metadata: Record<string, unknown> = {
    title: seo
      ? currentLocale === "en"
        ? seo.title_en
        : seo.title_ar
      : defaultMetadata.title,
    description: seo
      ? currentLocale === "en"
        ? seo.meta_description_en
        : seo.meta_description_ar
      : defaultMetadata.description,
    keywords: seo
      ? currentLocale === "en"
        ? seo.keywords_en
        : seo.keywords_ar
      : defaultMetadata.keywords,
  };

  // Add Open Graph metadata only if SEO data includes an image
  if (seo?.og_image) {
    metadata.openGraph = {
      title: currentLocale === "en" ? seo.og_title_en : seo.og_title_ar,
      description:
        currentLocale === "en" ? seo.og_description_en : seo.og_description_ar,
      url: `${process.env.NEXT_PUBLIC_URI}/${currentLocale}/media`,
      images: [
        {
          url: seo.og_image,
          width: 1200,
          height: 630,
          alt: currentLocale === "en" ? seo.title_en : seo.title_ar,
        },
      ],
    };
  }

  return metadata;
}


const MediaPage = () => {

  return (
    <MediaContainer />
  );
};

export default MediaPage;
