import SingleProject from "@/Components/projects/SingleProject";
import SEOUpdater from "@/Components/SEOUpdater";
import { IProject } from "@/interfaces/Project.interface";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(process.env.NEXT_PUBLIC_URI as string);

  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" ? "Our Projects" : "مشاريعنا",
    description:
      currentLocale === "en"
        ? "Explore our portfolio of successful projects and implementations."
        : "اكتشف مجموعة مشاريعنا الناجحة والتنفيذات المتميزة.",
    keywords:
      currentLocale === "en"
        ? ["projects", "portfolio", "case studies", "implementations"]
        : ["مشاريع", "أعمال", "دراسات حالة", "تنفيذ"],
    openGraph: {
      title: currentLocale === "en" ? "Project Portfolio" : "حافظة المشاريع",
      description:
        currentLocale === "en"
          ? "Discover our range of completed and ongoing projects across various sectors."
          : "اكتشف مجموعة مشاريعنا المنتهية والجارية في مختلف القطاعات.",
      url: new URL(
        `/${currentLocale}/projects/${params.slug}`,
        baseUrl
      ).toString(),
      images: [
        {
          url: "/projects-og-image.jpg",
          width: 1200,
          height: 630,
          alt:
            currentLocale === "en"
              ? "Projects Overview"
              : "نظرة عامة على المشاريع",
        },
      ],
      locale: currentLocale,
      type: "website",
      ...(currentLocale === "ar" && {
        "ar:locale": "ar_AR",
        "ar:title": "المشاريع والتنفيذات",
        "ar:description": "عرض تفصيلي لأبرز المشاريع والإنجازات",
      }),
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-website/projects`,
      {
        cache: "no-cache",
      }
    );

    if (!response.status) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }

    const { data } = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("⚠ No projects data found! Using fallback parameters.");
      return [{ slug: "default-project", locale: "en" }];
    }

    // Return both `slug` and `id` for dynamic routes
    return data.flatMap((project: IProject) => [
      { slug: project.slug, locale: "en" }, // English version
      { slug: project.slug_ar, locale: "ar" }, // Arabic version
    ]);
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

interface SingleProjectPageProps {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: {
    id?: string;
  };
}

const SingleProjectPage: React.FC<SingleProjectPageProps> = ({ params }) => {
  const { locale, slug } = params;
  return (
    <>
      <SEOUpdater page={slug} locale={locale} />
      <SingleProject slug={slug} locale={locale} />
    </>
  );
};

export default SingleProjectPage;
