import { IProduct } from "@/interfaces/Products.interface";
import { IScope } from "@/interfaces/Scope.interface";
import { useLocale, useTranslations } from "next-intl";

interface productItem {
  Product: IProduct;
  subDropdown: [];
}

export const useMenuItems = (
  products: productItem[],
  scopeOfWork: IScope[]
) => {
  const t = useTranslations("navbar");
  const locale = useLocale();

  return [
    {
      title: t("home"),
      link: `/${locale}/`,
    },
    {
      title: t("about_us"),
      link: `/${locale}/about`,
    },
    {
      title: t("products"),
      link: `/${locale}/products`,
      dropdown: products
        .filter((product) => !product.Product.parentProductId)
        .map((product) => ({
          title:
            locale === "en"
              ? product?.Product.name?.toUpperCase()
              : product.Product.name_ar,
          link: `/${locale}/products/${
            locale === "en"
              ? product.Product.slug + "?id=" + product.Product._id
              : product.Product.slug_ar + "?id=" + product.Product._id
          }`,
          subDropdown: products
            .filter(
              (subProduct) =>
                subProduct.Product.parentProductId === product.Product._id
            )
            .map((subProduct) => ({
              title:
                locale === "en"
                  ? subProduct?.Product.name?.toUpperCase()
                  : subProduct.Product.name_ar,
              link: `/${locale}/products/${
                locale === "en"
                  ? subProduct.Product.slug + "?id=" + subProduct.Product._id
                  : subProduct.Product.slug_ar + "?id=" + subProduct.Product._id
              }`,
            })),
        })),
    },
    {
      title: t("projects"),
      link: `/${locale}/projects`,
    },
    {
      title: t("scope_of_work"),
      link: `/${locale}/our-scopes`,
      dropdown:
        scopeOfWork.length > 0 &&
        scopeOfWork.map((scope) => ({
          title:
            locale === "en" ? scope.service?.toUpperCase() : scope.service_ar,
          link: `/${locale}/our-scopes/${
            locale === "en"
              ? `${scope.slug}?id=${scope._id}`
              : `${scope.slug_ar}?id=${scope._id}`
          }`,
        })),
    },
    {
      title: t("media"),
      link: `/${locale}/media`,
      dropdown: [
        {
          title: t("video_gallery"),
          link: `/${locale}/media/video-gallery`,
        },
      ],
    },
    {
      title: t("accreditations"),
      link: `/${locale}/accreditations`,
    },
    {
      title: t("news"),
      link: `/${locale}/news`,
    },
    {
      title: t("contact_us"),
      link: `/${locale}/contact-us`,
    },
  ];
};
