import { stringToTitleCase } from "@/utils/stringToTitleCase";

const SectionTitle = ({ title = "", highlight = "", extraClasses = "" }) => {
  return (
    <div className={`sec-title ${extraClasses}`}>
      <h1>
        {stringToTitleCase(title)}
        {highlight && <span> {stringToTitleCase(highlight)}</span>}
      </h1>
    </div>
  );
};

export default SectionTitle;
