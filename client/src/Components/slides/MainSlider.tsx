"use client";
import React, { useEffect, useMemo } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchMainCarousels } from "@/Redux/Reducers/MainCarouselsSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Slider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mainCarousels } = useAppSelector((state) => state.mainCarousels);
  const locale = useLocale();

  useEffect(() => {
    if (mainCarousels.length < 1) {
      dispatch(fetchMainCarousels());
    }
  }, [dispatch, mainCarousels]);

  // Memoize the filtering logic to prevent unnecessary recomputation
  const publishedCarousels =
    useMemo(
      () => mainCarousels.filter((carousel) => carousel.publish),
      [mainCarousels]
    ) || [];

  // Render Slide Content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSlideContent = (slide: any) => (
    <div
      className="data-slider"
      style={{
        zIndex: 10,
        [locale === "en" ? "left" : "right"]: "20%",
      }}
    >
      <h1 className="mb-2">{locale === "en" ? slide.title : slide.title_ar}</h1>
      <p>{locale === "en" ? slide.description : slide.description_ar}</p>
      <button>
        <a
          href={slide.link}
          style={{
            textDecoration: "none",
            color: "#fff",
          }}
        >
          {locale === "en" ? "Learn More" : "اعرف المزيد"}
        </a>
      </button>
    </div>
  );

  return (
    <div className="slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        className="mySwiper swiper"
      >
        {publishedCarousels.map((slide, index) => (
          <SwiperSlide key={index}>
            {renderSlideContent(slide)}
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${slide.image}`}
              alt={
                locale === "en"
                  ? (slide.title as string)
                  : (slide.title_ar as string)
              }
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </SwiperSlide>
        ))}

        {/* Navigation and Pagination */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Slider;
