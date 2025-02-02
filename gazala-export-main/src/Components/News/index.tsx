"use client";

import React, { useEffect, useMemo } from "react";
import NewsCard from "./NewsCard";
import SectionTitle from "../titles/SectionTitle";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchNews } from "@/Redux/Reducers/NewsSlice";
import { stripHtmlTags } from "@/utils/stripHtmlTags";

interface NewsProps {
  all?: boolean;
}

const News: React.FC<NewsProps> = ({ all = false }) => {
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { newsData } = useAppSelector((state) => state.news);

  // Memoizing latest news based on published status and date
  const latestNews = useMemo(() => {
    if (!Array.isArray(newsData)) return [];
    const filteredNews = newsData?.filter((news) => news.published);
    return filteredNews
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, all ? undefined : 4).reverse();
  }, [newsData, all]);

  useEffect(() => {
    // Only fetch news if there's no data available
    if (newsData.length === 0) {
      dispatch(fetchNews())
        .unwrap()
        .catch((error) => console.error("Error fetching news:", error));
    }
  }, [dispatch, newsData.length]);
  

  // Localized strings for section titles
  const sectionTitle = useMemo(
    () =>
      locale === "en"
        ? { title: "Latest", highlight: "News" }
        : { title: "اخر", highlight: "الأخبار" },
    [locale]
  );

  return (
    <div className="news mt-3 pb-5">
      <div className="container">
        <SectionTitle
          title={sectionTitle.title}
          highlight={sectionTitle.highlight}
          extraClasses="py-3 mb-3"
        />

        {/* Render latest news cards */}
        <div className="news-container">
          {latestNews.length > 0 &&
            latestNews.map((newsItem, index) => {
              const title =
                locale === "en" ? newsItem.title : newsItem.title_ar;
              const description =
                stripHtmlTags(
                  locale === "en"
                    ? newsItem.description
                    : newsItem.description_ar
                ).slice(0, 46) + "...";
              const slug = locale === "en" ? newsItem.slug : newsItem.slug_ar;
              const id = newsItem._id;

              return (
                <NewsCard
                  key={index}
                  date={newsItem.date}
                  title={title}
                  description={description}
                  imgSrc={`${process.env.NEXT_PUBLIC_API_URL}/${newsItem.thumbnail}`}
                  slug={slug}
                  id={id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default News;
