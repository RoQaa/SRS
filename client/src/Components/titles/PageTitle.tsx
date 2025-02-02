import { stringToTitleCase } from "@/utils/stringToTitleCase";
import Image from "next/image";

interface PageTitleProps {
  imgSrc: string;
  title?: string;
  mainPage?: boolean;
  slug?: string;
  locale?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  imgSrc,
  title = "",
  mainPage = true,
  slug = "",
  locale
}) => {
  return (
    <>
      {mainPage && (
        <div className="page-title-sec">
          <div className="title-sec-overlay"></div>
          <Image
            src={imgSrc}
            alt={`${title} page image`}
            width={1920}
            height={600}
            quality={75}
            priority={true}
          />
          <div className="pg-ttl-cont">
            <h2>{stringToTitleCase(title)}</h2>
          </div>
        </div>
      )}
      {!mainPage && (
        <div className="project-bg-ttl">
          <div className="proj-bg-overlay"></div>
          <Image
            src={imgSrc}
            alt={slug}
            width={1920}
            height={600}
            quality={75}
            priority={true}
          />
          <div className={locale === "en" ? `project-pg-ttl-cont` : `project-pg-ttl-cont ar`}>
            <h2>{title}</h2>
            <h1>{slug}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default PageTitle;
