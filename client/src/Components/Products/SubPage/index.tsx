"use client";
import ContactForm from "@/Components/Contact/ContactForm";
import PageTitle from "@/Components/titles/PageTitle";
import ProductDetails from "./ProductDetails";
import ProductsSlide from "@/Components/slides/ProductsSlide";
import Image from "next/image";
import RelatedProjects from "@/Components/RelatedProjects";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect } from "react";
import {
  fetchProductById,
  fetchProducts,
} from "@/Redux/Reducers/ProductsSlice";
import { fetchProjects } from "@/Redux/Reducers/ProjectSlice";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

interface SingleProductProps {
  locale: string;
  slug: string;
}

const SingleProduct: React.FC<SingleProductProps> = ({
  locale,
  slug,
}) => {
  const t = useTranslations("form");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { productsData, currentProduct } = useAppSelector(
    (state) => state.products
  );
  const { projectsData } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductById(id as string));
    dispatch(fetchProducts());
    dispatch(fetchProjects());
  }, [dispatch, id]);

  const publishedProducts =
    productsData && productsData.filter((product) => product.published);

  const publishedProjects =
    projectsData &&
    projectsData.filter((project) => project.published).slice(0, 4);

  return (
    <>
      <PageTitle
        mainPage={false}
        title={locale === "en" ? "Products" : "المنتجات"}
        slug={
          currentProduct
            ? locale === "en"
              ? currentProduct.name
              : currentProduct.name_ar
            : ""
        }
        imgSrc={"/imgs/page-head/banner-steel-str.jpg"}
        locale={locale}
      />
      {currentProduct && (
        <>
          <ProductsSlide
            images={(currentProduct && currentProduct.images) || []}
          />
          <div className="container">
            <ProductDetails
              product={currentProduct}
              locale={locale}
              slug={slug}
            />
          </div>
          <RelatedProjects
            projects={publishedProjects}
            products={publishedProducts}
          />
          <div
            className="fluid-container form-container"
            style={{
              backgroundColor: "#eee",
              position: "relative",
              padding: "50px",
            }}
          >
            <Image
              src="/imgs/from-bg.jpg"
              alt=""
              className="form-bg"
              layout="fill"
              objectFit="cover"
            />
            <ContactForm inner={true} title={t("quick_enquiries")} />
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
