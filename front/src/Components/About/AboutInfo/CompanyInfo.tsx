import React from "react";
import Image from "next/image";
import AboutSubDetails from "./AboutSubDetails";
import { ICompanyInfo, SubDetail } from "@/interfaces/About.interface";
import { useLocale } from "next-intl";

interface CompanyInfoProps {
  companyInfo: ICompanyInfo;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ companyInfo }) => {
  const locale = useLocale();

  return (
    <div className="about-content p-4">
      <div className="container">
        <div className="row about-row">
          <div className="col-12 col-lg-6">
            <div className="text-cont">
              <p>
                {locale === "en"
                  ? companyInfo?.description
                  : companyInfo?.description_ar}
              </p>
              {companyInfo?.subDetails &&
                companyInfo.subDetails.length > 0 &&
                companyInfo.subDetails.map(
                  (info: SubDetail, index: React.Key | null | undefined) => (
                    <AboutSubDetails key={index} info={info} locale={locale} />
                  )
                )}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {companyInfo?.mainImg && (
              <Image
                src={companyInfo.mainImg}
                alt="main-about-img"
                layout="responsive"
                height={1000}
                width={1502}
                style={{
                  objectFit: "fill",
                  borderRadius: "8px",
                  minHeight: "100%",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
