"use client";
import React, { ReactNode, memo } from "react";
import Image from "next/image";
import ButtonComponent from "@/Components/ButtonComponent";
import NewsDate from "./NewsDate";
import { useLocale, useTranslations } from "next-intl";

interface NewsCardProps {
  title: string;
  description: ReactNode;
  date: Date;
  imgSrc: string;
  slug: string;
  id: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  date,
  imgSrc,
  slug,
  id,
}) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="news-card">
      <div className="news-img">
        <Image fill src={imgSrc} alt={title} />
      </div>
      <div className="news-data">
        <div className="news-date">
          <NewsDate date={date} />
        </div>
        <p>{description}</p>
        <ButtonComponent
          btnText={t("learn_more")}
          href={`${process.env.NEXT_PUBLIC_URI}/${locale}/news/${slug}?id=${id}`}
          extraClasses=""
          target=""
          rel=""
        />
      </div>
    </div>
  );
};

export default memo(NewsCard);
