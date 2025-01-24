import SingleProject from "@/Components/projects/SingleProject";

const fetchSeo = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo/findByPage/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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
  params: { locale: string; slug: string };
}) {
  const currentLocale = params.locale;
  const slug = params.slug;

  // Fetch SEO data
  const seo = await fetchSeo(slug);

  // Default metadata if fetching fails
  const defaultMetadata = {
    title: currentLocale === "en" ? "Our Projects" : "مشاريعنا",
    description:
      currentLocale === "en"
        ? "Explore the various scopes and services offered by My Website."
        : "استكشف النطاقات والخدمات التي نقدمها في غزالة.",
    keywords:
      currentLocale === "en"
        ? "scopes, services, my website"
        : "النطاقات, الخدمات, غزالة",
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
      url: `${process.env.NEXT_PUBLIC_URI}/${currentLocale}/our-scopes/${slug}`,
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

interface SingleProjectPageProps {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: {
    id?: string;
  }
}

const SingleProjectPage: React.FC<SingleProjectPageProps> = ({
  params, searchParams
}) => {
  const { locale, slug } = params;
  const { id } = searchParams;
  return <SingleProject slug={slug} locale={locale} id={String(id)} />;
};

export default SingleProjectPage;