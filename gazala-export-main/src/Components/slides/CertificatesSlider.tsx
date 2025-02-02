"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import SectionTitle from "../titles/SectionTitle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { IAccreditation } from "@/interfaces/Accreditation.interface";

interface CertificatesSliderProps {
  certData: IAccreditation[];
  title: string;
  additionClasses: string ;
}

const CertificatesSlider: React.FC<CertificatesSliderProps> = ({
  certData,
  title,
  additionClasses=""
}) => {
  return (
    <div className="certificates p-3 mt-5">
      <SectionTitle highlight={title} extraClasses={`mt-5 mb-5 ${additionClasses}`} />
      <div className="row">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination]}
          className="swiper cert-Swiper"
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          <div className="swiper-wrapper">
            {certData.length > 0 &&
              certData.map((cert, index) => (
                <SwiperSlide
                  key={index}
                  className={`swiper-slide ${cert.name}`}
                >
                  <Image
                    src={cert?.certificateImage || ""}
                    alt={cert?.name || ""}
                    width={300}
                    height={400}
                    style={{
                      objectFit: "fill",
                    }}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
          </div>

          <div className="swiper-button-next" style={{ zIndex: 10 }}></div>
          <div className="swiper-button-prev" style={{ zIndex: 10 }}></div>
          <div className="swiper-pagination" style={{ zIndex: 10 }}></div>
        </Swiper>
      </div>
    </div>
  );
};

export default CertificatesSlider;
