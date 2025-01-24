import React, { useMemo } from "react";
import PageTitle from "@/Components/titles/PageTitle";
import { useLocale } from "next-intl";
import { accreditationsData } from "@/staticData/accreditationsData";
import { certData } from "@/staticData/aboutData";
import CertificatesSlider from "../slides/CertificatesSlider";

interface AccreditationSectionProps {
  title: string;
  content: string;
}
const AccreditationSection: React.FC<AccreditationSectionProps> = ({
  title,
  content,
}) => (
  <div className="mb-4">
    <p>
      <strong>{title}</strong>
    </p>
    <p>{content}</p>
  </div>
);

const AccredintionPageContainer: React.FC = () => {
  const locale = useLocale();

  // Locale-specific Helpers
  const localizedText = useMemo(
    () => ({
      pageTitle: locale === "en" ? "Accreditations" : "الاعتمادات",
      sliderTitle: locale === "en" ? "Certificates" : "الشهادات",
      highlightKey: locale === "en" ? "highlight" : "highlight_ar",
      contentKey: locale === "en" ? "content" : "content_ar",
    }),
    [locale]
  );

  return (
    <div>
      {/* Page Title */}
      <PageTitle
        title={localizedText.pageTitle}
        imgSrc="/imgs/page-head/banner-certificates.jpg"
      />

      {/* Accreditation Details Section */}
      <div className="cert-txt p-5">
        <div className="container">
          {accreditationsData?.sections?.length > 0 &&
            accreditationsData?.sections.map((accr, index) => (
              <AccreditationSection
                key={index}
                title={
                  (accr as { [key: string]: string })[
                    localizedText.highlightKey
                  ]
                }
                content={
                  (accr as { [key: string]: string })[localizedText.contentKey]
                }
              />
            ))}
        </div>
      </div>

      {/* Certificates Slider */}
      <div className="mt-5">
        {certData && certData.length > 0 && (
          <CertificatesSlider
            certData={certData}
            title={
              locale === "en"
                ? accreditationsData.title
                : accreditationsData.title_ar
            }
            additionClasses="accr-certs-title additional-text"
          />
        )}
      </div>
    </div>
  );
};

export default AccredintionPageContainer;
