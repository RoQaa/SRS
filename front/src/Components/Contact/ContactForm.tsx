import { useTranslations } from "next-intl";
import InputField from "./InputField";

const ContactForm = ({ inner = false, title = "" }) => {
  const t = useTranslations("form");
  return (
    <div className={inner ? "inner-form-box pt-3" : "form-box pt-3"}>
      {title && <h2>{title}</h2>}
      <form className="row g-3">
        <InputField
          id="inputName"
          name="name"
          label={t("name")}
          type="text"
          placeholder={t("name_placeholder")}
        />
        <InputField
          id="inputEmail"
          name="email"
          label={t("email")}
          type="email"
          placeholder={t("email_placeholder")}
        />
        <InputField
          id="inputPhone"
          name="phone"
          label={t("phone")}
          type="text"
          placeholder={t("phone_placeholder")}
        />
        <InputField
          id="inputComp"
          name="company"
          label={t("company")}
          type="text"
          placeholder={t("company_placeholder")}
        />
        <InputField
          id="inputPos"
          name="position"
          label={t("position")}
          type="text"
          placeholder={t("position_placeholder")}
        />
        <label htmlFor="floatingTextarea2">{t("message")}</label>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder={t("message_placeholder")}
            id="floatingTextarea2"
            style={{ height: "100px" }}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {t("send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
