"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import FooterLinksList from "./FooterLinksList";
import { useLocale, useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { stringToTitleCase } from "@/utils/stringToTitleCase";

const FooterColumn: React.FC<{
  title: string;
  links: { href: string; label: string; icon?: string }[];
  isSocial?: boolean;
}> = ({ title, links, isSocial = false }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3">
      <h5 className={`fot-t ${isSocial ? "" : "ar"}`}>{title}</h5>
      <FooterLinksList links={links} isSocial={isSocial} />
    </div>
  );
};

const Footer: React.FC = () => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { productsData } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (productsData?.length < 1) dispatch(fetchProducts());
  }, [dispatch, productsData]);

  const filteredProducts = useMemo(
    () => productsData?.filter((product) => product.published) || [],
    [productsData]
  );

  const quickLinks = useMemo(
    () => [
      { href: `/${locale}/`, label: t("home") },
      { href: `/${locale}/about`, label: t("about_us") },
      { href: `/${locale}/projects`, label: t("projects") },
      { href: `/${locale}/media`, label: t("media") },
      { href: `/${locale}/accreditations`, label: t("accreditations") },
      { href: `/${locale}/news`, label: t("news") },
    ],
    [locale, t]
  );

  const socialLinks = [
    {
      href: "https://www.facebook.com/Gazalasteeleg",
      icon: "fa-brands fa-facebook-f",
      label: "Facebook",
    },
    {
      href: "https://twitter.com/GazalaSteel",
      icon: "fa-brands fa-x-twitter",
      label: "Twitter",
    },
    {
      href: "https://www.youtube.com/channel/UCNSPM-Pnzadw1lqtyWws2sQ",
      icon: "fa-brands fa-youtube",
      label: "YouTube",
    },
    {
      href: "https://www.linkedin.com/company/gazalasteelfabrication/",
      icon: "fa-brands fa-linkedin-in",
      label: "LinkedIn",
    },
    {
      href: "https://wa.me/message/PLRT7V4AEVHNC1",
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
    },
  ];

  const productLinks = useMemo(
    () =>
      filteredProducts.slice(0, 5).map((product) => ({
        href: `/${locale}/products/${
          locale === "en" ? product.slug : product.slug_ar
        }`,
        label:
          locale === "en" ? stringToTitleCase(product.name) : product.name_ar,
      })),
    [filteredProducts, locale]
  );

  const contactLinks = [
    {
      href: "https://maps.app.goo.gl/2G68qJesz6UqxPb6A",
      icon: "fa-solid fa-location-dot",
      label: locale === "en" ? "Head Office" : "المكتب الرئيسي",
    },
    {
      href: "https://maps.app.goo.gl/toHCnSe5z82YxDJJ6",
      icon: "fa-solid fa-location-dot",
      label: locale === "en" ? "Factory" : "المصنع",
    },
    {
      href: "tel:+201000052087",
      icon: "fa-solid fa-phone",
      label: "+20 100 005 2087",
    },
    {
      href: "https://wa.me/message/PLRT7V4AEVHNC1",
      icon: "fa-brands fa-whatsapp",
      label: "+20 100 005 2087",
    },
    {
      href: "mailto:info@gazala.net",
      icon: "fa-solid fa-envelope",
      label: "info@gazala.net",
    },
  ];

  return (
    <div className="footer">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className="footer-logo">
            <Image
              src="/imgs/GSF-Footer-logo.png"
              alt="Gazala Steel Footer Logo"
              width={235}
              height={150}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="social mt-3">
            <FooterLinksList links={socialLinks} isSocial />
          </div>
        </div>
        <FooterColumn title={t("quick_links")} links={quickLinks} />
        <FooterColumn title={t("products")} links={productLinks} />
        <FooterColumn title={t("contact_us")} links={contactLinks} />
      </div>
    </div>
  );
};

export default Footer;
