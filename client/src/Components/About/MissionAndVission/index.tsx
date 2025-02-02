import Image from "next/image";
import MvBox from "./MvBox";
import { VisionMission } from "@/interfaces/About.interface";
import { useLocale } from "next-intl";

interface MvSectionProps {
  visionMission: VisionMission[];
  vmImg: string;
}

const MvSection: React.FC<MvSectionProps> = ({ visionMission, vmImg }) => {
  const locale = useLocale();

  return (
    <div className="about-acc mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <Image
              src={vmImg || ""}
              alt="Visual representation of our mission and vision"
              width={976}
              height={700}
              layout="intrinsic"
              objectFit="fill"
              style={{ minHeight: "100%" }}
            />
          </div>
          <div className="col-12 col-lg-8">
            <div className="vis-mis-sec">
              {visionMission &&
                visionMission?.length > 0 &&
                visionMission.map((item, index) => (
                  <MvBox
                    key={index}
                    locale={locale}
                    icon={
                      index === 0
                        ? "fa-regular fa-eye"
                        : index === 1
                        ? "fa-solid fa-bullseye"
                        : "fa-solid fa-medal"
                    }
                    label={
                      index === 0
                        ? locale === "en"
                          ? "Vision"
                          : "الرؤية"
                        : index === 1
                        ? locale === "en"
                          ? "Mission"
                          : "المهمة"
                        : locale === "en"
                        ? "Quality Assurance & Certification"
                        : "ضمان الجودة والشهادة"
                    }
                    title={locale === "en" ? item.title : item.title_ar}
                    content={locale === "en" ? item.content : item.content_ar}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvSection;
