"use client";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchScopes } from "@/Redux/Reducers/ScopeSlice";
import PageTitle from "@/Components/titles/PageTitle";
import ScopeItem from "./ScopeItem";

const ScopesOfWork = () => {
  const locale = useLocale();
  const { scopesData, loading, error } = useAppSelector(
    (state) => state.scopes
  );
  const dispatch = useAppDispatch();

  // Fetch scopes only if data is not loaded
  useEffect(() => {
    if (!scopesData?.length) {
      dispatch(fetchScopes());
    }
  }, [dispatch, scopesData]);

  // Filter published scopes
  const publishedScopes = scopesData?.filter((scope) => scope.published)?.reverse() ?? [];

  // Handle loading and error states
  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center">Error loading scopes data</div>;

  return (
    <>
      <PageTitle
        title={locale === "en" ? "Our Scopes" : "نطاق عملنا"}
        imgSrc="/imgs/page-head/banner-Scope.jpg"
      />
      <div className="scope-sect">
        <div className="container">
          <div className="row">
            {publishedScopes.length > 0
              ? publishedScopes.map((scope, index) => (
                  <ScopeItem
                    key={`${scope.slug}-${index}`}
                    title={
                      locale === "en"
                        ? scope.service.toUpperCase()
                        : scope.service_ar
                    }
                    description={
                      locale === "en" ? scope.details.slice(0, 130)+"..." : scope.details_ar.slice(0, 130) + "..."
                    }
                    imgSrc={`${process.env.NEXT_PUBLIC_API_URL}/${scope.iconImg}`}
                    link={`${
                      process.env.NEXT_PUBLIC_URI
                    }/${locale}/our-scopes/${
                      locale === "en" ? scope.slug : scope.slug_ar
                    }?id=${scope._id}`}
                  />
                ))
              : !loading && ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScopesOfWork;
