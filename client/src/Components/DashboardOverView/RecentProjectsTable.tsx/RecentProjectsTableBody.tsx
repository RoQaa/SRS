import { useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import ReactApexChart from "react-apexcharts";
import { CommonDropdown } from "../common/CommonDropdown";
import { selectProjectsByLatest } from "@/Redux/Reducers/ProjectSlice";
import { useLocale } from "next-intl";

const RecentProjectsTableBody = () => {
  const latestProjects = useAppSelector(selectProjectsByLatest);
  const fourProjects = latestProjects.slice(0, 4);
  const locale = useLocale();

  return (
    <tbody>
      {fourProjects.map((data, index) => {
        const progressValue = data?.projectProgress ?? 0;

        let chartColor = "#D77748";
        if (progressValue > 75) {
          chartColor = "var(--theme-default)";
        } else if (progressValue > 50) {
          chartColor = "var(--theme-secondary)";
        } else if (progressValue > 25) {
          chartColor = "#C95E9E";
        }

        const chartOptions = {
          chart: {
            height: 90,
            type: "radialBar" as const,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "35%",
              },
              track: {
                background: "var(--theme-default)",
                opacity: 0.2,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  color: "var(--tag-text-color--edit)",
                  fontSize: "12px",
                  show: true,
                  offsetY: 5,
                },
              },
            },
          },
          colors: [chartColor], // Set dynamic color based on progress value
          stroke: {
            lineCap: "round",
          },
        };

        return (
          <tr key={index}>
            <td className="px2">
              <Link
                href={`${process.env.NEXT_PUBLIC_URI}/${locale}/dashboard/projects/edit?id=${data._id}`}
              >
                {data.title}
              </Link>
            </td>
            <td>{new Date(data.startDate).toLocaleDateString()}</td>
            <td>{new Date(data.endDate).toLocaleDateString()}</td>
            <td className="radial-chart-wrap p-0">
              <ReactApexChart
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                options={chartOptions}
                series={[progressValue]} // Use the project progress, defaulting to 0
                type="radialBar"
              />
            </td>
            <td>
              <CommonDropdown />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default RecentProjectsTableBody;
