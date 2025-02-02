import ImageComponent from "./ImageComponent";
import ProductContent from "./ProductContent";
import ButtonComponent from "../ButtonComponent";
import { IProduct } from "@/interfaces/Products.interface";
import { useLocale, useTranslations } from "next-intl";

// Define props for the ProductCard component
interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const locale = useLocale();
  const t = useTranslations();

  const {
    thumbnail,
    name,
    name_ar,
    description,
    description_ar,
    slug,
    slug_ar,
  } = product;
  return (
    <div className="prod-box">
      <ImageComponent
        src={`${process.env.NEXT_PUBLIC_API_URL}/${thumbnail}`}
        alt={locale === "en" ? name : name_ar}
        width={60}
        height={60}
      />
      <ProductContent
        title={locale === "en" ? name.toUpperCase() : name_ar.toUpperCase()}
        description={locale === "en" ? description : description_ar}
      />
      <ButtonComponent
        href={`${process.env.NEXT_PUBLIC_URI}/${locale}/products/${
          locale === "en" ? slug + "?id=" + product._id : slug_ar + "?id=" + product._id
        }`}
        btnText={t("learn_more")}
        extraClasses="mt-3"
        target={""}
        rel={""}
      />
    </div>
  );
};

export default ProductCard;
