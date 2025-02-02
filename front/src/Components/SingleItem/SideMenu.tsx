"use client";

import { IProduct } from "@/interfaces/Products.interface";
import { IProject } from "@/interfaces/Project.interface";
import { IScope } from "@/interfaces/Scope.interface";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { fetchScopes } from "@/Redux/Reducers/ScopeSlice";
import Link from "next/link";
import { useEffect } from "react";

interface SideMenuProps {
  locale?: string;
  slug?: string;
  scope?: boolean;
  currentProject?: IProject;
  currentProduct?: IProduct;
}

const SideMenu: React.FC<SideMenuProps> = ({
  locale,
  slug,
  scope = true,
  currentProject,
  currentProduct,
}) => {
  const { productsData } = useAppSelector((state) => state.products);
  const { scopesData } = useAppSelector((state) => state.scopes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (scope) {
      dispatch(fetchScopes());
    } else {
      (async () => {
        if (productsData.length < 1) await dispatch(fetchProducts());
      })();
    }
  }, [dispatch, productsData, scope]);

  if (!locale || !slug) {
    console.error("Invalid locale or slug provided to SideMenu.");
    return null;
  }

  const publishedProducts =
    productsData && productsData.filter((product) => product.published);
  const publishedScopes = scopesData.filter((scope) => scope.published);

  return (
    <ul>
      {(scope ? publishedScopes : publishedProducts || []).map(
        (otherItem, idx) => (
          <li
            key={idx}
            className={
              scope || currentProduct
                ? (locale === "en" && otherItem.slug === slug) ||
                  (locale !== "en" && otherItem.slug_ar === slug)
                  ? "active"
                  : ""
                : otherItem._id === currentProject?.category?._id
                ? "active"
                : ""
            }
          >
            <Link
              href={
                scope
                  ? `/${locale}/our-scopes/${
                      locale === "en"
                        ? `${otherItem.slug}?id=${otherItem._id}`
                        : `${otherItem.slug_ar}?id=${otherItem._id}`
                    }`
                  : `/${locale}/products/${
                      locale === "en"
                        ? `${otherItem.slug}?id=${otherItem._id}`
                        : `${otherItem.slug_ar}?id=${otherItem._id}`
                    }`
              }
            >
              {scope
                ? locale === "en"
                  ? (otherItem as IScope).service.toUpperCase()
                  : (otherItem as IScope).service_ar
                : locale === "en"
                ? (otherItem as IProduct).name?.toUpperCase()
                : (otherItem as IProduct).name_ar}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default SideMenu;
