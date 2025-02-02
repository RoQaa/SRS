"use client";
import ImageComponent from "./ImageComponent";
import ButtonComponent from "../ButtonComponent";
import SectionTitle from "../titles/SectionTitle";
import ProductCard from "./ProductCard";
import { project } from "@/staticData/productsData";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { useLocale, useTranslations } from "next-intl";
import { IProduct } from "@/interfaces/Products.interface";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productsData } = useAppSelector((state) => state.products);
  const locale = useLocale();
  const t = useTranslations("products");

  // Fetch products data
  useEffect(() => {
    if (!productsData || productsData.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsData]);

  const filteredProducts = useMemo(
    () =>
      productsData?.length > 0
        ? productsData.filter((product) => product.published).slice(-5)
        : [],
    [productsData]
  );

  // Render Products Section
  const renderProductCard = (product: IProduct, index: number) => (
    <div className="col-sm-12 col-md-6 col-lg-4 mt-3" key={index}>
      <ProductCard product={product} />
    </div>
  );

  // Render Project Card
  const renderProjectCard = () => (
    <div className="col-sm-12 col-md-6 col-lg-4 mt-3">
      <div className="prod-box proj-box">
        <ImageComponent
          src={project.imgSrc}
          alt={project.title}
          fill={true}
          style={{ objectFit: "cover" }}
        />
        <div className="proj-box-cta">
          <h3>{t("our_projects").toUpperCase()}</h3>
          <ButtonComponent
            href={`${process.env.NEXT_PUBLIC_URI}/${locale}/projects`}
            btnText={t("learn_more")}
            extraClasses="mt-3"
            target=""
            rel=""
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="products pb-5">
      <div className="container">
        {/* Section Title */}
        <SectionTitle title={t("products")} extraClasses="py-3 mb-5" />
        <div className="row">
          {/* Render Products */}
          {filteredProducts.map(renderProductCard)}
          {/* Render Project Card */}
          {renderProjectCard()}
        </div>
      </div>
    </div>
  );
};

export default Products;
