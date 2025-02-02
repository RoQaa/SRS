/* eslint-disable @typescript-eslint/no-explicit-any */
// components/VisitorTransactionChart.tsx
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// Define the chart options and data
const VisitorTransactionChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Fetch visitor transaction data
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URI}/a/api/visitor-transactions?visitorId=12345&timestamp=2024-11-07T12:00:00Z`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // This will send cookies with the request
          }
        );
        const data = await response.json();

        // Prepare the chart data based on the fetched data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pageVisits = data.map((transaction: any) => ({
          name: transaction.pageUrl,
          data: [transaction.visitDuration],
        }));

        const transactionTypes = data.reduce(
          (acc: any, transaction: any) => {
            if (transaction.transactionType === "visit") {
              acc.visits.push(transaction.visitDuration);
            } else {
              acc.formSubmissions.push(transaction.visitDuration);
            }
            return acc;
          },
          { visits: [], formSubmissions: [] }
        );

        setChartData({
          series: [
            {
              name: "Page Visits",
              data: transactionTypes.visits,
            },
            {
              name: "Form Submissions",
              data: transactionTypes.formSubmissions,
            },
          ],
          options: {
            chart: {
              height: 350,
              type: "line",
              stacked: false,
            },
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            xaxis: {
              categories: data.map((transaction: any) => transaction.pageUrl),
            },
            yaxis: {
              title: {
                text: "Duration (seconds)",
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
            },
            title: {
              text: "Visitor Transaction Data",
              align: "center",
            },
          },
        });
      } catch (error) {
        console.error("Error fetching visitor transactions:", error);
      }
    };

    fetchData();
  }, []);

  // Render the chart when chartData is available
  return chartData ? (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  ) : (
    <div>Loading chart...</div>
  );
};

export default VisitorTransactionChart;
