"use client";
import ProductsSlide from "@/Components/slides/ProductsSlide";
import PageTitle from "@/Components/titles/PageTitle";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchNewsById } from "@/Redux/Reducers/NewsSlice";
import { useEffect } from "react";

interface SingleNewsContainerProps {
  locale: string;
  slug: string;
  id: string;
}

const SingleNewsContainer: React.FC<SingleNewsContainerProps> = ({
  locale,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  slug,
  id,
}) => {
  const { currentNews } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentNews) dispatch(fetchNewsById(id));
  }, [currentNews, dispatch, id]);

  return (
    <>
      <PageTitle
        imgSrc="/imgs/page-head/banner-news-1.jpg"
        title={locale === "en" ? "Latest News" : "اخر الأخبار"}
        locale={locale}
        slug={locale === "en" ? currentNews?.title : currentNews?.title_ar || "Unknown Title"}
        mainPage={false}
      />

      {currentNews && (
        <>
          <ProductsSlide images={(currentNews && currentNews.images) || []} />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pr-steel-txt p-3">
                  <h2>
                    {locale === "en"
                      ? currentNews?.title
                      : currentNews?.title_ar}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        locale === "en"
                          ? currentNews?.description || ""
                          : currentNews?.description_ar || "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleNewsContainer;
