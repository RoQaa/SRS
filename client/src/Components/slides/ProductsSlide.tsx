import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductsSwiperProps {
  images: string[];
}

const ProductsSlide: React.FC<ProductsSwiperProps> = ({ images }) => {
  return (
    <div className="container my-5">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        className="mySwiper swiper prSteelSwiper"
        loop
      >
        {images?.length > 0 && images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${image}` || ""}
              alt={`Product image ${idx + 1}` || ""}
              layout="responsive"
              width={1920}
              height={1080}
              quality={80}
              priority={true}
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next" style={{ zIndex: "10" }}></div>
        <div className="swiper-button-prev" style={{ zIndex: "10" }}></div>
        <div className="swiper-pagination" style={{ zIndex: "10" }}></div>
      </Swiper>
    </div>
  );
};

export default ProductsSlide;
