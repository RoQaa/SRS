import ContactInfo from "../Contact/ContactInfo";
import SectionTitle from "../titles/SectionTitle";
// import ContactForm from "./ContactForm";
// import ContactInfo from "./ContactInfo";
import { contactInfo } from "@/staticData/preNavbar";
const ContactDynamic = () => {
  return (
    <div className="contact mt-5 pb-4">
      <div className="container">
        <SectionTitle
          title={"Get"}
          highlight={"In Touch"}
          extraClasses="py-3 mb-3"
        />
        <div className="contact-form">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="find-us">
                <div className="sec-title mb-3">
                  <h1>
                    Find <span>Us</span>
                  </h1>
                </div>
                <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="ex1-tab-1"
                      data-bs-toggle="tab"
                      href="#ex1-tabs-1"
                      role="tab"
                      aria-controls="ex1-tabs-1"
                      aria-selected="true"
                    >
                      Cairo Branch
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="ex1-tab-2"
                      data-bs-toggle="tab"
                      href="#ex1-tabs-2"
                      role="tab"
                      aria-controls="ex1-tabs-2"
                      aria-selected="false"
                    >
                      Damietta Branch
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="ex1-content">
                  <div
                    className="tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d55279.93390599163!2d31.44282!3d30.008275!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583ded474210c9%3A0x5601cb2a6598412a!2sGazala%20Steel%20Fabrication%20-%20Head%20office!5e0!3m2!1sen!2seg!4v1706049751901!5m2!1sen!2seg"
                      width="100%"
                      height="350"
                      style={{ border: "0" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="ex1-tabs-2"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-2"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13618.961857313363!2d31.696963999999998!3d31.421276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9e3958a479cf1%3A0xccc67a05ec643b87!2sGazala%20steel%20fabrication%20(GSF)!5e0!3m2!1sen!2seg!4v1706049710408!5m2!1sen!2seg"
                      width="100%"
                      height="350"
                      style={{ border: "0" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <ContactInfo contactInfo={contactInfo || []} />
            </div>
          </div>
          <hr
            className="m-4"
            style={{ backgroundColor: "#F7941D", height: "1px" }}
          />
          <div className="row mt-3">
            <ContactInfo contactItems={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDynamic;
