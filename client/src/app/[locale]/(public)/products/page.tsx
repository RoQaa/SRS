import ProductsContainer from "@/Components/Products/ProductsContainer";

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
      ? "Our Products" 
      : "منتجاتنا",
    description: currentLocale === "en"
      ? "Explore our range of high-quality products and innovative solutions."
      : "اكتشف تشكيلتنا من المنتجات عالية الجودة والحلول المبتكرة.",
    keywords: currentLocale === "en"
      ? ["products", "solutions", "offerings", "product catalog"]
      : ["منتجات", "حلول", "عروض", "كتالوج المنتجات"],
    openGraph: {
      title: currentLocale === "en" 
        ? "Product Catalog" 
        : "كتالوج المنتجات",
      description: currentLocale === "en"
        ? "Discover our comprehensive product portfolio and technical specifications."
        : "اكتشف مجموعة منتجاتنا الشاملة والمواصفات الفنية.",
      url: new URL(`/${currentLocale}/products`, baseUrl).toString(),
      images: [
        {
          url: '/products-og-image.jpg',
          width: 1200,
          height: 630,
          alt: currentLocale === "en" 
            ? "Product Collection Overview" 
            : "نظرة عامة على مجموعة المنتجات",
        },
      ],
      locale: currentLocale,
      type: 'website',
      ...(currentLocale === 'ar' && {
        'ar:locale': 'ar_AR',
        'ar:title': "المنتجات والخدمات",
        'ar:description': "تصفح تشكيلة المنتجات المميزة والخدمات المتخصصة"
      })
    }
  };
}

interface ProductsPageProps {
  params: {
    locale: string;
  };
}

const ProductsPage: React.FC<ProductsPageProps> = ({ params: { locale } }) => {
  return <ProductsContainer locale={locale} />;
};

export default ProductsPage;
