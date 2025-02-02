"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../titles/SectionTitle";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchClientsCarousels } from "@/Redux/Reducers/ClientsCarouselsSlice";

const OurClientsSlider: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { clientsCarousels } = useAppSelector((state) => state.clientsCarousel);
  const locale = useLocale();

  // Slider settings
  const sliderSettings = useMemo(
    () => ({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      dots: true,
      arrows: true,
    }),
    []
  );

  // Fetch clients carousels data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (clientsCarousels.length === 0) {
          await dispatch(fetchClientsCarousels());
        }
        setIsError(false);
      } catch (error) {
        console.error("Error fetching clients carousels:", error);
        setIsError(true);
      }
    };
    fetchData();
  }, [clientsCarousels, dispatch]);

  // Memoize filtered carousels to improve performance
  const filteredClientsCarousels = useMemo(
    () => clientsCarousels.filter((carousel) => carousel.publish),
    [clientsCarousels]
  );

  // Handle empty state or error
  if (isError) {
    return (
      <div className="clients" style={{ overflow: "hidden" }}>
        <div className="container text-center">
          <p className="text-danger">
            {locale === "en"
              ? "Failed to load clients data."
              : "فشل تحميل بيانات العملاء."}
          </p>
        </div>
      </div>
    );
  }

  if (filteredClientsCarousels.length === 0) {
    return (
      <div className="clients" style={{ overflow: "hidden" }}>
        <div className="container text-center">
          <p>{locale === "en" ? "No clients available." : "لا يوجد عملاء."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="clients" style={{ overflow: "hidden" }}>
      <div className="container">
        <SectionTitle
          title={locale === "en" ? "Our" : "عملائنا"}
          highlight={locale === "en" ? "Clients" : undefined}
          extraClasses="py-3 mb-3"
        />

        <div className="clients-sl">
          <Slider {...sliderSettings}>
            {filteredClientsCarousels.map((client, index) => (
              <div key={index}>
                <Image
                  layout="responsive"
                  width={324}
                  height={117.2}
                  src={process.env.NEXT_PUBLIC_API_URL + "/" + client.image}
                  alt={`Client ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurClientsSlider;
