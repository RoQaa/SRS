import AccredintionPageContainer from "@/Components/AccredintionPageContainer/AccredintionPageContainer";
import SEOUpdater from "@/Components/SEOUpdater";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_URI as string
  );

  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" ? "Our Accreditations" : "اعتماداتنا",
    description:
      currentLocale === "en"
        ? "Discover our official accreditations and quality certifications."
        : "اكتشف اعتماداتنا وشهادات الجودة الرسمية الخاصة بنا.",
    keywords:
      currentLocale === "en"
        ? [
            "accreditations",
            "certifications",
            "quality standards",
            "compliance",
          ]
        : ["اعتمادات", "شهادات", "معايير الجودة", "التوافق"],
    openGraph: {
      title:
        currentLocale === "en"
          ? "Accreditations & Certifications"
          : "الاعتمادات والشهادات",
      description:
        currentLocale === "en"
          ? "Explore our recognized accreditations and quality assurance certifications."
          : "استكشف اعتماداتنا المعترف بها وشهادات ضمان الجودة.",
      url: new URL(`/${currentLocale}/accreditations`, baseUrl).toString(),
      images: [
        {
          url: "/accreditations-og-image.jpg",
          width: 1200,
          height: 630,
          alt:
            currentLocale === "en"
              ? "Accreditations Overview"
              : "نظرة عامة على الاعتمادات",
        },
      ],
      locale: currentLocale,
      type: "website",
      ...(currentLocale === "ar" && {
        "ar:locale": "ar_AR",
        "ar:title": "اعتماداتنا وشهاداتنا",
        "ar:description": "اعتمادات معتمدة وشهادات جودة دولية",
      }),
    },
  };
}

const AccreditationsPage = ({ params }: { params: { locale: string } }) => {
  return (
    <>
      <SEOUpdater page="accreditations" locale={params.locale} />
      <AccredintionPageContainer />
    </>
  );
};

export default AccreditationsPage;
