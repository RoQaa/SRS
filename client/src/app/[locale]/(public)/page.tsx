import MainSlider from "@/Components/slides/MainSlider";
import Counter from "@/Components/Counter";
import ValuesSection from "@/Components/ValuesSection";
import MiddleSection from "@/Components/MiddleSection";
import OurClientsSlider from "@/Components/slides/OurClientSlide";
import Contact from "@/Components/Contact";
import News from "@/Components/News";
import dynamic from "next/dynamic";


const fetchSeo = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo/findByPage/home`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const seoData = await res.json();

    if (!seoData || !seoData.data) {
      throw new Error("Invalid response data");
    }

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
  const seo = await fetchSeo();

  if (!seo) {
    return;
  }

  // If SEO data is available, return the metadata
  return {
    title: currentLocale === "en" ? seo.title_en : seo.title_ar,
    description:
      currentLocale === "en"
        ? seo.meta_description_en
        : seo.meta_description_ar,
    keywords: currentLocale === "en" ? seo.keywords_en : seo.keywords_ar,
  };
}

const Products = dynamic(() => import("@/Components/Products"), {
  ssr: false,
});


export default function Home() {
  return (
    <>
      <div className="header">
        <MainSlider />
        <Counter />
      </div>
      <ValuesSection />
      <MiddleSection />
      <Products />
      <OurClientsSlider />
      <Contact />
      <News />
    </>
  );
}
