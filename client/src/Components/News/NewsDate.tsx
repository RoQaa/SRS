import { useLocale } from "next-intl";

interface NewsDateProps {
  date: Date;
}

const NewsDate: React.FC<NewsDateProps> = ({ date }) => {
  const locale = useLocale();
  const formattedDate = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(typeof date === 'string' ? new Date(date) : date);
  return (
    <>
      <i className="fa-regular fa-calendar"></i>
      <span className="mx-1">{formattedDate}</span>
    </>
  );
};

export default NewsDate;
