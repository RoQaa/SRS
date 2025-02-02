import ProjectsPageComponent from "@/Components/projects";

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
      ? "Our Projects" 
      : "مشاريعنا",
    description: currentLocale === "en"
      ? "Explore our portfolio of successful projects and implementations."
      : "اكتشف مجموعة مشاريعنا الناجحة والتنفيذات المتميزة.",
    keywords: currentLocale === "en"
      ? ["projects", "portfolio", "case studies", "implementations"]
      : ["مشاريع", "أعمال", "دراسات حالة", "تنفيذ"],
    openGraph: {
      title: currentLocale === "en" 
        ? "Project Portfolio" 
        : "حافظة المشاريع",
      description: currentLocale === "en"
        ? "Discover our range of completed and ongoing projects across various sectors."
        : "اكتشف مجموعة مشاريعنا المنتهية والجارية في مختلف القطاعات.",
      url: new URL(`/${currentLocale}/projects`, baseUrl).toString(),
      images: [
        {
          url: '/projects-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" 
            ? "Projects Overview" 
            : "نظرة عامة على المشاريع",
        },
      ],
      locale: currentLocale,
      type: 'website',
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "المشاريع والتنفيذات",
        'ar:description': "عرض تفصيلي لأبرز المشاريع والإنجازات"
      })
    }
  };
}

const ProjectPage = () => {
  return <ProjectsPageComponent />;
};

export default ProjectPage;
