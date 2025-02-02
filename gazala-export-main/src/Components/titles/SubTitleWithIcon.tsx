import { stringToTitleCase } from "@/utils/stringToTitleCase";
import Image from "next/image";

interface SubTitleWithIconProps {
  imgSrc: string;
  title: string;
  locale: string;
}

const SubTitleWithIcon: React.FC<SubTitleWithIconProps> = ({
  imgSrc,
  title,
  locale,
}) => {
  return (
    <div className="about-sub-ttl">
      <Image src={imgSrc} width={45} height={45} alt={title} />
      <h4
        style={{
          marginRight: locale === "ar" ? "5px" : "",
        }}
      >
        {stringToTitleCase(title)}
      </h4>
    </div>
  );
};

export default SubTitleWithIcon;
