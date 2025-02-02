import Image from "next/image";
import SectionTitle from "../titles/SectionTitle";
import { useLocale } from "next-intl";

const AboutValues = ({
  valuesData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valuesData: any[] | null | undefined;
}) => {
  const locale = useLocale();

  // Ensure valuesData is always an array
  const safeValuesData = valuesData || [];

  return (
    <div className="values">
      <div className="container">
        <SectionTitle
          title={locale === "en" ? "Our" : "مبادئنا"}
          highlight={locale === "en" ? "Values" : ""}
          extraClasses="mt-5 mb-5"
        />
        <div className="valus-sec">
          {safeValuesData.length > 0 ? (
            safeValuesData.map((value, index) => (
              <div
                className={locale === "ar" ? `valu-box ar` : `valu-box en`}
                key={index}
              >
                <Image
                  src={value.icon}
                  alt={value.label}
                  width={512}
                  height={512}
                  layout="responsive"
                  objectFit="cover"
                  style={{ maxWidth: "40%" }}
                />
                <p>{locale === "en" ? value.label : value.label_ar}</p>
              </div>
            ))
          ) : (
            <p>
              {locale === "en" ? "No values available." : "لا توجد قيم متاحة."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutValues;
