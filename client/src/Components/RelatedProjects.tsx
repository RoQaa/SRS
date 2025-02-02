import { IProduct } from "@/interfaces/Products.interface";
import { IProject } from "@/interfaces/Project.interface";
import { getCategoryNameById } from "@/utils/getCategoryNameById";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface RelatedProjectsProps {
  projects: IProject[];
  products?: IProduct[];
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  projects,
  products,
}) => {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <div className="rel-pr">
      <div className="rel-pr-ttl">{t("related")}</div>
      <div className="rel-pr-v-all">
        <Link href={`${process.env.NEXT_PUBLIC_URI}/${locale}/projects`}>
          {t("view_all")}
        </Link>
      </div>
      <div className="container">
        <div className="row">
          {projects?.length > 0 &&
            projects.map((project, idx) => (
              <div key={idx} className="col-12 col-lg-3 mb-3 mb-xl-0">
                <div className="rel-pr-box">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${project?.images[0]}`}
                    alt={
                      locale === "en"
                        ? project.title
                        : project.title_ar || "Project Image"
                    }
                    layout="responsive"
                    width={370}
                    height={245}
                    quality={80}
                  />
                  <div className="rel-pr-over">
                    <p>
                      {getCategoryNameById(
                        (project.category as IProduct)?._id as string || "",
                        products || [],
                        locale
                      ).toUpperCase()}
                    </p>
                    <p>
                      {locale === "en"
                        ? project.title.toUpperCase()
                        : project.title_ar}
                    </p>
                    <Link
                      href={`${
                        process.env.NEXT_PUBLIC_URI
                      }/${locale}/projects/${
                        locale === "en"
                          ? `${project.slug}?id=${project._id}`
                          : `${project.slug_ar}?id=${project._id}`
                      }`}
                    >
                      {t("more")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProjects;
