import News from "@/Components/News";
import SEOUpdater from "@/Components/SEOUpdater";
import PageTitle from "@/Components/titles/PageTitle";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(process.env.NEXT_PUBLIC_URI as string);

  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" ? "Latest News" : "آخر الأخبار",
    description: currentLocale === "en"
      ? "Stay updated with the latest news and announcements from My Website."
      : "ابق على اطلاع بآخر الأخبار والإعلانات من موقعنا.",
    keywords: currentLocale === "en"
      ? "news, updates, announcements, latest"
      : "أخبار, تحديثات, إعلانات, آخر الأخبار",
    openGraph: {
      title: currentLocale === "en" ? "Latest News" : "آخر الأخبار",
      description: currentLocale === "en"
        ? "Stay updated with the latest news and announcements from My Website."
        : "ابق على اطلاع بآخر الأخبار والإعلانات من موقعنا.",
      url: new URL(`/${currentLocale}/news`, baseUrl).toString(),
      images: [
        {
          url: '/default-news-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" ? "Latest News" : "آخر الأخبار",
        },
      ],
      locale: currentLocale,
      type: 'website',
      // Add Arabic locale support
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "آخر الأخبار",
        'ar:description': "ابق على اطلاع بآخر الأخبار والإعلانات من موقعنا."
      })
    },
  };
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
    <SEOUpdater page={"news"} locale={locale} />
      <PageTitle
        title={locale === "en" ? "News" : "الأخبار"}
        imgSrc={"/imgs/page-head/banner-news.jpg"}
      />
      <News all={true} />
    </>
  );
};

export default NewsPage;
