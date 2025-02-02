"use client";
import ContactForm from "@/Components/Contact/ContactForm";
import SideMenu from "@/Components/SingleItem/SideMenu";
import SingleItemDetails from "@/Components/SingleItem/SingleItemDetails";
import PageTitle from "@/Components/titles/PageTitle";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchScopeById } from "@/Redux/Reducers/ScopeSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SingleScopeContainerProps {
  locale: string;
  slug: string;
}

const SingleScopeContainer: React.FC<SingleScopeContainerProps> = ({
  slug,
  locale
}) => {
  // const { mainScope, otherScopes } = SingleScopeData;
  const { currentScope } = useAppSelector((state) => state.scopes);
  const dispatch = useAppDispatch();
  const t = useTranslations("scopes");
  const searchParams = useSearchParams()
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(fetchScopeById(id as string));
  }, [dispatch, id]);

  return (
    <>
      <PageTitle
        mainPage={false}
        title={t("our_scope")}
        slug={
          currentScope && locale === "en"
            ? currentScope.service
            : currentScope?.service_ar
        }
        imgSrc={"/imgs/page-head/banner-design.jpg"}
        locale={locale}
      />
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-lg-9">
            <div className="proj-img mb-3">
              {currentScope && (
                <Image
                  src={
                    currentScope?.mainImg &&
                    `${process.env.NEXT_PUBLIC_API_URL}/${currentScope?.mainImg}`
                  }
                  alt={
                    locale === "en"
                      ? currentScope?.service
                      : currentScope?.service_ar
                  }
                  layout="responsive"
                  width={1920}
                  height={1080}
                  priority
                />
              )}
            </div>
            <SingleItemDetails
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              item={currentScope && {scope: currentScope}}
              locale={locale}
            />
          </div>

          <div className="col-12 col-lg-3">
            <div className="pro-side-menu">
              <h2>{t("other_scopes")}</h2>
              <SideMenu locale={locale} slug={slug} />
            </div>
          </div>
        </div>
      </div>
      {/* Form */}
      <div
        className="fluid-container form-container"
        style={{
          backgroundColor: "#eee",
          position: "relative",
          padding: "50px",
        }}
      >
        <Image
          src="/imgs/from-bg.jpg"
          alt=""
          className="form-bg"
          layout="fill"
          objectFit="cover"
        />
        <ContactForm inner={true} title={t("quick_enquiries")} />
      </div>
    </>
  );
};

export default SingleScopeContainer;
