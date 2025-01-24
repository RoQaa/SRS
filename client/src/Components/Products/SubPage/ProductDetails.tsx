import SideMenu from "@/Components/SingleItem/SideMenu";
import SingleItemDetails from "@/Components/SingleItem/SingleItemDetails";
import { IProduct } from "@/interfaces/Products.interface";



interface ProductDetailsProps {
  product: IProduct;
  locale: string;
  slug: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, locale, slug}) => {
  return (
    <div className="row">
      <div className="col-12 col-lg-9">
        <SingleItemDetails locale={locale} item={{product: product}} />
      </div>
      <div className="col-12 col-lg-3">
        <div className="pro-side-menu">
          <h2>{locale === "en" ? "Other Products" : "منتجات اخرى"}</h2>
          <SideMenu locale={locale} currentProduct={product} slug={slug} scope={false} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
