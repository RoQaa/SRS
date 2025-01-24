import News from "@/Components/News";
import PageTitle from "@/Components/titles/PageTitle";

const fetchSeo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/findByPage/news`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure fresh SEO data for each request
    });

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
    title: currentLocale === "en" ? "News" : "الأخبار",
    description:
      currentLocale === "en"
        ? "Stay updated with the latest news from My Website."
        : "تابع أحدث الأخبار من موقعنا.",
    keywords:
      currentLocale === "en"
        ? "news, updates, my website"
        : "الأخبار, التحديثات, غزالة",
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
      url: `${process.env.NEXT_PUBLIC_URI}/${currentLocale}/news`,
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

interface NewsPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

const NewsPage: React.FC<NewsPageProps> = ({ params: { locale } }) => {
  return (
    <>
      <PageTitle
        title={locale === "en" ? "News" : "الأخبار"}
        imgSrc={"/imgs/page-head/banner-news.jpg"}
      />
      <News all={true} />
    </>
  );
};

export default NewsPage;
