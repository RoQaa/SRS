"use client";
import PageTitle from "@/Components/titles/PageTitle";
import { useState, useEffect, useRef } from "react";
import ProjectCategory from "@/Components/projects/ProjectCategory";
import ProjectCard from "@/Components/projects/ProjectCard";
import { useLocale, useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProjects } from "@/Redux/Reducers/ProjectSlice";
import { fetchProducts } from "@/Redux/Reducers/ProductsSlice";

const ProjectsPageComponent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mixerRef = useRef<any>(null);
  const locale = useLocale();
  const t = useTranslations("projects");
  const { projectsData } = useAppSelector((state) => state.project);
  const { productsData } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projectsData.length < 1) dispatch(fetchProjects()).unwrap();
    if (productsData.length < 1) dispatch(fetchProducts()).unwrap();
  }, [dispatch, projectsData.length, productsData.length]);

  const publishedProjects = projectsData.filter((project) => project.published);
  const publishedProducts = productsData.filter((product) => product.published);

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      import("mixitup")
        .then((MixItUp) => {
          mixerRef.current = MixItUp.default(containerRef.current, {
            selectors: {
              target: ".mix",
            },
            animation: {
              duration: 300,
            },
          });
        })
        .catch((error) => console.error("MixItUp failed to load:", error));
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.destroy();
      }
    };
  }, [publishedProjects]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (mixerRef.current) mixerRef.current.filter(filter);
  };

  const categories =
    publishedProducts.length > 0 &&
    publishedProducts.map((product) => ({
      label: locale === "en" ? product.name.toUpperCase() : product.name_ar,
      filter: `.${product.name.toLowerCase().replace(/\s+/g, "-")}`,
    }));

  return (
    <>
      <PageTitle
        title={t("title")}
        imgSrc={"/imgs/page-head/banner-projects.jpg"}
      />
      <div className="project-sect p-5">
        <div id="project-glry" className="proj-gallery">
          <ul>
            {categories &&
              categories.map((category, index) => (
                <ProjectCategory
                  key={index}
                  label={category.label}
                  filter={category.filter}
                  isActive={activeFilter === category.filter}
                  onClick={() => handleFilterClick(category.filter)}
                />
              ))}
          </ul>
          <div className="img-glry" ref={containerRef}>
            {publishedProjects.length > 0 &&
              publishedProjects.map((project) => {
                const product = publishedProducts.find(
                  (prod) => prod._id === project.category?._id
                );

                return (
                  <div
                    key={project._id}
                    className={`col mix ${product?.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <ProjectCard
                      image={project.images[0]}
                      title={
                        locale === "en"
                          ? product?.name.toUpperCase() || "Unknown Product"
                          : product?.name_ar || "منتج غير معروف"
                      }
                      description={
                        locale === "en"
                          ? project.title.toUpperCase() as string
                          : project.title_ar as string
                      }
                      link={`${
                        process.env.NEXT_PUBLIC_URI
                      }/${locale}/projects/${
                        locale === "en" ? project.slug : project.slug_ar
                      }?id=${project._id}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPageComponent;
