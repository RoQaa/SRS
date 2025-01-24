import SectionTitle from "../titles/SectionTitle";
import MapInfo from "./MapInfo";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Image from "next/image";
import { useLocale } from "next-intl";
import { locations } from "@/staticData/contactData";
import { contactItems } from "@/staticData/contactData";


interface ContactProps {
  bgImg?: boolean;
}

const Contact: React.FC<ContactProps> = ({ bgImg = true }) => {
  const locale = useLocale();

  return (
    <div className={bgImg ? "contact mt-5 pb-4" : "contact-sec"}>
      {bgImg && (
        <div className="container">
          {locale === "en" ? (
            <SectionTitle
              title="Get"
              highlight="In Touch"
              extraClasses="py-3 mb-3"
            />
          ) : (
            <SectionTitle
              title="تواصل"
              highlight="معنا"
              extraClasses="py-3 mb-3 ar"
            />
          )}
          <div className="contact-form">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="find-us">
                  {locale === "en" ? (
                    <SectionTitle
                      title="Find"
                      highlight="Us"
                      extraClasses=" mb-3"
                    />
                  ) : (
                    <SectionTitle
                      title="ابحث"
                      highlight="عنا"
                      extraClasses=" mb-3 ar"
                    />
                  )}
                  <MapInfo locations={locations} />
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="find-us cont-data">
                  {locale === "en" ? (
                    <SectionTitle
                      title="Contact"
                      highlight="Us"
                      extraClasses="mb-5 cont-us"
                    />
                  ) : (
                    <SectionTitle
                      title="تواصل"
                      highlight="معنا"
                      extraClasses="mb-5 cont-us ar"
                    />
                  )}
                  <ContactInfo contactItems={contactItems} />
                </div>
              </div>
            </div>
            <hr
              className="m-4"
              style={{ backgroundColor: "#F7941D", height: "2px" }}
            />
            <div className="row mt-3">
              <ContactForm inner={true} />
            </div>
          </div>
        </div>
      )}
      {!bgImg && (
        <div className="contact-sec">
          <div className="container">
            {locale === "en" ? (
              <SectionTitle
                title="Get"
                highlight="In Touch"
                extraClasses="cont-pg py-3 mb-3"
              />
            ) : (
              <SectionTitle
                title="تواصل"
                highlight="معنا"
                extraClasses="cont-pg py-3 mb-3 ar"
              />
            )}

            <div className="contact-form">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="find-us">
                    {locale === "en" ? (
                      <SectionTitle
                        title="Find"
                        highlight="Us"
                        extraClasses="mb-3"
                      />
                    ) : (
                      <SectionTitle
                        title="ابحث"
                        highlight="عنا"
                        extraClasses="mb-3 ar"
                      />
                    )}
                    <MapInfo locations={locations} />
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="find-us cont-data">
                    {locale === "en" ? (
                      <SectionTitle
                        title="Contact"
                        highlight="Us"
                        extraClasses="mb-5 cont-us"
                      />
                    ) : (
                      <SectionTitle
                        title="تواصل"
                        highlight="معنا"
                        extraClasses="mb-5 cont-us ar"
                      />
                    )}
                    <ContactInfo contactItems={contactItems} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="fluid-container form-container"
            style={{
              backgroundColor: "#eee",
              position: "relative",
              padding: "50px",
            }}
          >
            <Image
              className="form-bg"
              fill
              src="/imgs/from-bg.jpg"
              alt="Contact-Form-Img"
              style={{ objectFit: "cover" }}
            />
            <ContactForm inner={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
