import SingleScopeContainer from "@/Components/ScopesOfWork/SingleScopeContainer/SingleScopeContainer";
import SEOUpdater from "@/Components/SEOUpdater";
import { IScope } from "@/interfaces/Scope.interface";

export async function generateMetadata({
  params,
}: {
  params: { locale: string, slug: string };
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
      url: new URL(`/${currentLocale}/our-scopes/${params.slug}`, baseUrl).toString(),
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

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-website/scopes`,
      {
        cache: "no-cache",
      }
    );

    if (!response.status) {
      throw new Error(`Failed to fetch scopes: ${response.status}`);
    }

    const { data } = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("⚠ No scopes data found! Using fallback parameters.");
      return [{ slug: "default-scope", locale: "en" }];
    }
    
    // Return both `slug` and `id` for dynamic routes
    return data.flatMap((scope: IScope) => [
      { slug: scope.slug, locale: "en" }, // English version
      { slug: scope.slug_ar, locale: "ar" }, // Arabic version
    ]);
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

interface SingleScopePageProps {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: {
    id?: string;
  };
}

const SingleScopePage: React.FC<SingleScopePageProps> = ({ params }) => {
  const { locale, slug } = params;

  return (
    <>
      <SEOUpdater page={slug} locale={locale} />
      <SingleScopeContainer locale={locale} slug={slug} />
    </>
  );
};

export default SingleScopePage;
