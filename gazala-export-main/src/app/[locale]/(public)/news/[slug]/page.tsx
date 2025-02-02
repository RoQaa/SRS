import SingleNewsContainer from "@/Components/News/SingleNewsContainer/SingleNewsContainer";
import SEOUpdater from "@/Components/SEOUpdater";
import { INews } from "@/interfaces/News.interface";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(process.env.NEXT_PUBLIC_URI as string);

  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" ? "Latest News" : "آخر الأخبار",
    description:
      currentLocale === "en"
        ? "Stay updated with the latest news and announcements from My Website."
        : "ابق على اطلاع بآخر الأخبار والإعلانات من موقعنا.",
    keywords:
      currentLocale === "en"
        ? "news, updates, announcements, latest"
        : "أخبار, تحديثات, إعلانات, آخر الأخبار",
    openGraph: {
      title: currentLocale === "en" ? "Latest News" : "آخر الأخبار",
      description:
        currentLocale === "en"
          ? "Stay updated with the latest news and announcements from My Website."
          : "ابق على اطلاع بآخر الأخبار والإعلانات من موقعنا.",
      url: new URL(`/${currentLocale}/news/${params.slug}`, baseUrl).toString(),
      images: [
        {
          url: "/default-news-og-image.jpg",
          width: 1200,
          height: 630,
          alt: currentLocale === "en" ? "Latest News" : "آخر الأخبار",
        },
      ],
      locale: currentLocale,
      type: "website",
      // Add Arabic locale support
      ...(currentLocale === "ar" && {
        "ar:locale": "ar_AR",
        "ar:title": "آخر الأخبار",
        "ar:description": "ابق على اطلاع بآخر الأخبار والإعلانات من موقعنا.",
      }),
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-website/news`,
      {
        cache: "no-cache",
      }
    );

    if (!response.status) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const { data } = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("⚠ No news data found! Using fallback parameters.");
      return [{ slug: "default-news", locale: "en" }];
    }

    // Return both `slug` and `id` for dynamic routes
    return data.flatMap((news: INews) => [
      { slug: news.slug, locale: "en" }, // English version
      { slug: news.slug_ar, locale: "ar" }, // Arabic version
    ]);
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

const SingleNewsPage = ({
  params,
}: {
  params: { slug: string; locale: string };
}) => {
  const { slug, locale } = params;

  return (
    <>
      <SEOUpdater page={slug} locale={locale} />
      <SingleNewsContainer slug={slug} locale={locale} />
    </>
  );
};

export default SingleNewsPage;
