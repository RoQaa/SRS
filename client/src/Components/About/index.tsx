import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import Image from "next/image";
import PageTitle from "@/Components/titles/PageTitle";
import { aboutData } from "@/staticData/aboutData";
import { certData } from "@/staticData/aboutData";

// Dynamically import components to improve performance
const AboutValues = dynamic(() => import("@/Components/About/AboutValues"));
const CompanyInfo = dynamic(
  () => import("@/Components/About/AboutInfo/CompanyInfo")
);
const MvSection = dynamic(() => import("@/Components/About/MissionAndVission"));
const CertificatesSlider = dynamic(
  () => import("@/Components/slides/CertificatesSlider")
);

const AboutComponent = () => {
  const locale = useLocale();
  
  return (
    <>
      <PageTitle
        title={locale === "en" ? "About Us" : "من نحن"}
        imgSrc="/imgs/page-head/banner-about.jpg"
      />

      <CompanyInfo companyInfo={aboutData.companyInfo} />

      <div className="fluid-container">
        <div className="map">
          <Image
            src="/imgs/about-us/videoplayback.gif"
            layout="responsive"
            width={16}
            height={9}
            objectFit="cover"
            alt={locale === "en" ? "Map of our locations" : "خريطة مواقعنا"}
          />
        </div>
      </div>

      <MvSection visionMission={aboutData.visionMission} vmImg={aboutData.vmImg} />

      <AboutValues valuesData={aboutData.values} />

      <CertificatesSlider
        certData={certData}
        title={locale === "en" ? "Certificates" : "الشهادات"}
        additionClasses=""
      />
    </>
  );
};

export default AboutComponent;
