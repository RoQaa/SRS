"use client";
import { useEffect, useState } from "react";
import SectionTitle from "./titles/SectionTitle";
import { IMiddleSection } from "@/interfaces/MiddleSection.interface";
import { useLocale } from "next-intl";

const MiddleSection = () => {
  const [data, setData] = useState<IMiddleSection[]>([]);
  const [error, setError] = useState("");
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/edit-website/middle-section`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
      }
    };

    fetchData();
  }, []);
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="middle-sec mt-5 p-5"
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/${data[0]?.backgroundImg ?? "/assets/imgs/mid-sec.jpg"})`,
      }}
    >
      <div className="m-s-data">
        {data.length > 0 && (
          <>
            <SectionTitle
              title={
                locale === "en"
                  ? data[0].titleOne
                  : data[0].titleOne_ar || "Gazala Steel Fabrication"
              }
              extraClasses="mt-5 mb-5 mid-sec"
            />
            <p>
              {locale === "en"
                ? data[0].titleTwo
                : data[0].titleTwo_ar || "Strive For Excellence"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MiddleSection;
