import SubTitleWithIcon from "@/Components/titles/SubTitleWithIcon";

interface Info {
  title_ar: string;
  icon: string;
  title: string;
  description: string;
  description_ar: string;
}

interface SubDetailsProps {
  info: Info;
  locale: string
}

const SubDetails: React.FC<SubDetailsProps> = ({ info, locale }) => {
  return (
    <>
      <SubTitleWithIcon locale={locale} imgSrc={info.icon} title={locale === "en" ? info.title : info.title_ar} />
      <p>{locale === "en" ? info.description : info.description_ar}</p>
    </>
  );
};

export default SubDetails;
