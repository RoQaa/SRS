import VideoGallery from "@/Components/About/Media/VideoGallery";
import PageTitle from "@/Components/titles/PageTitle";
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
      ? "Video Gallery" 
      : "معرض الفيديو",
    description: currentLocale === "en"
      ? "Explore our collection of videos showcasing our work and achievements."
      : "استكشف مجموعة الفيديوهات التي تعرض أعمالنا وإنجازاتنا.",
    keywords: currentLocale === "en"
      ? ["video gallery", "multimedia", "corporate videos", "showcase"]
      : ["معرض فيديو", "وسائط متعددة", "فيديوهات مؤسسية", "عرض الأعمال"],
    openGraph: {
      title: currentLocale === "en" 
        ? "Video Gallery" 
        : "معرض الفيديوهات",
      description: currentLocale === "en"
        ? "Browse through our curated selection of corporate and project videos."
        : "تصفح مجموعة مختارة من الفيديوهات المؤسسية وفيديوهات المشاريع.",
      url: new URL(`/${currentLocale}/video-gallery`, baseUrl).toString(),
      images: [
        {
          url: '/video-gallery-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" 
            ? "Video Gallery Preview" 
            : "معاينة معرض الفيديوهات",
        },
      ],
      locale: currentLocale,
      type: 'website',
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "معرض الفيديوهات",
        'ar:description': "مجموعة مرئية تعرض إنجازات الشركة وأعمالها البارزة"
      })
    }
  };
}

interface VideoGalleryPageProps {
  params: {
    locale: string;
  };
}

const VideoGalleryPage: React.FC<VideoGalleryPageProps> = ({
  params: { locale },
}) => {
  return (
    <>
    <SEOUpdater page="video-gallery" locale={locale} />
      <PageTitle
        title={locale === "en" ? "Video Gallery" : "معرض الفديو"}
        imgSrc="/imgs/page-head/banner-media.jpg"
      />
      <VideoGallery />
    </>
  );
};

export default VideoGalleryPage;
