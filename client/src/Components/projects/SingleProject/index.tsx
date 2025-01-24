/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import ContactForm from "@/Components/Contact/ContactForm";
import PageTitle from "@/Components/titles/PageTitle";
import Image from "next/image";
import RelatedProjects from "@/Components/RelatedProjects";
// import SideMenu from "@/Components/SingleItem/SideMenu";
import SingleItemDetails from "@/Components/SingleItem/SingleItemDetails";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect, useState } from "react";
import { fetchProjectById, fetchProjects } from "@/Redux/Reducers/ProjectSlice";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";
import { getCategoryNameById } from "@/utils/getCategoryNameById";
import dynamic from "next/dynamic";

interface SingleProjectProps {
  slug: string;
  locale: string;
  id?: string;
}

const SingleProject: React.FC<SingleProjectProps> = ({
  slug,
  locale,
  id = "",
}) => {
  const t = useTranslations("products");
  const { projectsData, currentProject } = useAppSelector(
    (state) => state.project
  );
  const { productsData } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const SideMenu = dynamic(()=>import("@/Components/SingleItem/SideMenu"), { ssr: false });

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchProjects());
      await dispatch(fetchProjectById(id));
      await dispatch(fetchProducts());
      setLoading(false);
    };

    loadData();
  }, [dispatch, id]);

  const currentProjectId = currentProject?._id;

  const relatedProjects =
    projectsData.filter(
      (project) =>
        project.published &&
        project?.category?._id === currentProject?.category?._id &&
        project._id !== currentProjectId
    ) || [];

  const additionalProjects = projectsData.filter(
    (project) =>
      project.published &&
      project?.category?._id !== currentProject?.category?._id &&
      project._id !== currentProjectId &&
      !relatedProjects.includes(project)
  );

  const displayedProjects =
    relatedProjects.length >= 4
      ? relatedProjects
      : [
          ...relatedProjects,
          ...additionalProjects.slice(0, 4 - relatedProjects.length),
        ];

  const publishedProducts = productsData.filter((product) => product.published);

  return (
    <>
      <PageTitle
        mainPage={false}
        title={t("projects_title")}
        slug={getCategoryNameById(
          currentProject?.category?._id || "",
          publishedProducts,
          locale
        )}
        imgSrc={"/imgs/page-head/banner-steel-str.jpg"}
        locale={locale}
      />
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-lg-9 mb-4">
            <div className="proj-img mb-3">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_API_URL}/${currentProject?.images[0]}` ||
                  ""
                }
                alt={currentProject?.title || ""}
              />
            </div>
            <SingleItemDetails
              locale={locale}
              // @ts-ignore
              item={currentProject && { project: currentProject }}
            />
          </div>
          <div className="col-12 col-lg-3">
            <div className="pro-side-menu">
              <h2>{t("other_products")}</h2>
              <SideMenu
                locale={locale}
                slug={slug}
                scope={false}
                currentProject={currentProject ?? undefined}
              />
            </div>
          </div>
        </div>
      </div>
      {displayedProjects.length > 0 && (
        <RelatedProjects
          projects={displayedProjects}
          products={publishedProducts}
        />
      )}
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
          alt="Form Image"
          className="form-bg"
          layout="fill"
          objectFit="cover"
        />
        <ContactForm inner={true} title={t("quick_enquiries")} />
      </div>
    </>
  );
};

export default SingleProject;
