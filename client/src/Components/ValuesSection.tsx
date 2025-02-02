"use client";
import Image from "next/image";
import SectionTitle from "./titles/SectionTitle";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { IValue } from "@/interfaces/Value.interface";

const ValuesSection: React.FC = () => {
  const [valuesData, setValuesData] = useState<IValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const t = useTranslations("values");
  const locale = useLocale();

  useEffect(() => {
    const fetchValuesData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/edit-website/values`
        );
        if (!res.ok) throw new Error("Failed to fetch values data");
        const data = await res.json();
        setValuesData(data.data || []);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching values data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValuesData();
  }, []);

  // Use useMemo to filter published values
  const publishedValues = useMemo(
    () => valuesData.filter((value) => value.published),
    [valuesData]
  );

  return (
    <div className="values py-5">
      <div className="container">
        <SectionTitle
          title={t("title")}
          highlight={t("highlight")}
          extraClasses="mt-5 mb-5"
        />
        <div className="sperator"></div>
        <div className="row">
          {isLoading ? (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          ) : isError ? (
            <div className="text-center text-danger">
              <p>{t("error_message") || "Failed to load values data."}</p>
            </div>
          ) : publishedValues.length > 0 ? (
            publishedValues.map((value, index) => (
              <div className="col-12 col-lg-4 mb-4" key={index}>
                <div className="val-box">
                  <div className="ico-box">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${value.images.main}`}
                      alt={value.title}
                      width={150}
                      height={150}
                      className="img-m"
                    />
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${value.images.rotate}`}
                      alt={`${value.title} rotating icon`}
                      width={150}
                      height={150}
                      className="img-c"
                      style={{
                        animation: "rotate 10s linear infinite",
                      }}
                    />
                  </div>
                  <div className="data-box">
                    <h3>{locale === "en" ? value.title : value.title_ar}</h3>
                    <p>
                      {locale === "en"
                        ? value.description
                        : value.description_ar}
                    </p>
                    <Link href={value.link} className="btn">
                      {locale === "en" ? "Learn More" : "اعرف المزيد"}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>{t("no_values_message") || "No values available."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;
