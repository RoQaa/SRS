import { useLocale } from "next-intl";
import AddressItem from "./AddressItem";

interface ContactItem {
  link: string;
  icon: string;
  label: string;
  label_ar: string;
}

const ContactInfo = ({ contactItems }: { contactItems: ContactItem[] }) => {
  const locale = useLocale();
  return (
    <ul>
      {contactItems.map((info, index) => (
        <AddressItem
          key={index}
          link={info.link}
          icon={info.icon}
          text={locale === "en" ? info.label : info.label_ar}
        />
      ))}
    </ul>
  );
};
export default ContactInfo;
