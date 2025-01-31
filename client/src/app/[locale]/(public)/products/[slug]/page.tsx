import SingleProduct from "@/Components/Products/SubPage";
import SEOUpdater from "@/Components/SEOUpdater";
import { IProduct } from "@/interfaces/Products.interface";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const currentLocale = params.locale;
  const baseUrl = new URL(process.env.NEXT_PUBLIC_URI as string);

  return {
    metadataBase: baseUrl,
    title: currentLocale === "en" ? "Our Products" : "منتجاتنا",
    description:
      currentLocale === "en"
        ? "Explore our range of high-quality products and innovative solutions."
        : "اكتشف تشكيلتنا من المنتجات عالية الجودة والحلول المبتكرة.",
    keywords:
      currentLocale === "en"
        ? ["products", "solutions", "offerings", "product catalog"]
        : ["منتجات", "حلول", "عروض", "كتالوج المنتجات"],
    openGraph: {
      title: currentLocale === "en" ? "Product Catalog" : "كتالوج المنتجات",
      description:
        currentLocale === "en"
          ? "Discover our comprehensive product portfolio and technical specifications."
          : "اكتشف مجموعة منتجاتنا الشاملة والمواصفات الفنية.",
      url: new URL(
        `/${currentLocale}/products/${params.slug}`,
        baseUrl
      ).toString(),
      images: [
        {
          url: "/products-og-image.jpg",
          width: 1200,
          height: 630,
          alt:
            currentLocale === "en"
              ? "Product Collection Overview"
              : "نظرة عامة على مجموعة المنتجات",
        },
      ],
      locale: currentLocale,
      type: "website",
      ...(currentLocale === "ar" && {
        "ar:locale": "ar_AR",
        "ar:title": "المنتجات والخدمات",
        "ar:description": "تصفح تشكيلة المنتجات المميزة والخدمات المتخصصة",
      }),
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-website/products`,
      {
        cache: "no-cache",
      }
    );

    if (!response.status) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const { data } = await response.json();

    // Return both `slug` and `id` for dynamic routes
    return data.flatMap((product: IProduct) => [
      { slug: product.slug, locale: "en" }, // English version
      { slug: product.slug_ar, locale: "ar" }, // Arabic version
    ]);
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

interface SingleProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: {
    id?: string;
  };
}

const SingleProductPage: React.FC<SingleProductPageProps> = ({ params }) => {
  const { locale, slug } = params;
  return (
    <>
      <SEOUpdater page={slug} locale={locale} />
      <SingleProduct locale={locale} slug={slug} />
    </>
  );
};

export default SingleProductPage;
