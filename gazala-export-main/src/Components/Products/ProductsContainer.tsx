"use client";
import React, { useEffect } from "react";
import PageTitle from "../titles/PageTitle";
import ProductPageCard from "./ProductPageCard";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";

const ProductsContainer = ({ locale }: { locale: string }) => {
  const dispatch = useAppDispatch();
  const { productsData } = useAppSelector((state) => state.products);

  const publishedProducts = productsData.length > 0 && productsData.filter(product => product.published)

  useEffect(() => {
    if(!productsData) dispatch(fetchProducts());
  }, [dispatch, productsData]);
  return (
    <>
      <PageTitle
        imgSrc={"/imgs/page-head/banner-product.jpg"}
        title={locale === "en" ? "Products" : "المنتجات"}
      />
      <section className="products-sect p-5">
        {publishedProducts && publishedProducts.map((product, index) => (
          <ProductPageCard
            key={index}
            imgSrc={`${process.env.NEXT_PUBLIC_API_URL}/${product.thumbnail}`}
            title={locale === "en" ? product.name.toUpperCase() : product.name_ar}
            description={locale === "en" ? product.description.slice(0, 57) + "..." : product.description_ar.slice(0, 57) + "..."}
            link={`/${locale}/products/${locale === "en" ? `${product.slug}?id=${product?._id}` : `${product.slug_ar}?id=${product?._id}`}`}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            highlight={product.highlight || false}
          />
        ))}
      </section>
    </>
  );
};

export default ProductsContainer;
