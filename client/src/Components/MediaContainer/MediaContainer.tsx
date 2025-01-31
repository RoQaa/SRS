"use client";
import PageTitle from "@/Components/titles/PageTitle";
import Image from "next/image";
import baguetteBox from "baguettebox.js";
import "baguettebox.js/dist/baguetteBox.min.css";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchMediaItems } from "@/Redux/Reducers/MediaSlice";

const MediaContainer = () => {
  const { mediaItems } = useAppSelector((state) => state.media);
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const locale = useLocale();
  
  useEffect(() => {
    if (mediaItems?.length < 1) {
      dispatch(fetchMediaItems());
    }
  }, [dispatch, mediaItems?.length]);

  useEffect(() => {
    baguetteBox.run(".gallery");
  }, [locale, mediaItems]);

  useEffect(() => {
    const galleryElement = document.getElementById("baguetteBox-slider");
    if (galleryElement) {
      galleryElement.style.direction = locale === "ar" ? "ltr" : "";
    }
  }, [locale]);

  const imagesItems = mediaItems.length
    ? mediaItems
        .filter((image) => image.type === "Image" && image.published)
        .reverse()
    : [];

  return (
    <>
      <PageTitle
        title={t("media")}
        imgSrc={"/imgs/page-head/banner-media.jpg"}
      />
      <div className="image-gallery p-5">
        <div className="container">
          <div className="gallery text-center">
            {imagesItems.length > 0 &&
              imagesItems.map((image, index) => (
                <a
                  href={
                    `${process.env.NEXT_PUBLIC_API_URL}/${image?.fullImage}` ||
                    "#"
                  }
                  data-caption={
                    locale === "en"
                      ? image.title
                      : image.title_ar || image.title
                  }
                  key={index}
                >
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_API_URL}/${image?.thumbnail}` ||
                      ""
                    }
                    alt={`media image ${index + 1}`}
                    width={315}
                    height={215}
                    style={{ maxWidth: "100%", display: "inline-block" }}
                    loading="lazy"
                  />
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaContainer;
