import { useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import { stripHtmlTags } from "@/utils/stripHtmlTags";
import { useLocale } from "next-intl";

const RecentNewsTableBody = () => {
  const { newsData } = useAppSelector((state) => state.news);
  const fourNews =
    newsData.length > 0 &&
    [...newsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);

  const locale = useLocale();

  return (
    <tbody>
      {fourNews &&
        fourNews.map((data, index) => {
          return (
            <tr key={index}>
              <td>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${data.thumbnail}`}
                  alt="News Image"
                  width={50}
                />
              </td>
              <td className="px2">
                <Link
                  href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/news/${data.slug}`}
                >
                  {data.title}
                </Link>
              </td>
              <td>{stripHtmlTags(data.description).slice(0, 38) + "..."}</td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default RecentNewsTableBody;
