import { Grid } from "@mantine/core";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StatsGraph = () => {
  const chartData = {
    options: {
      chart: {
        id: "sub-user-activity",
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      colors: ["#67C6E3"],
    },
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <Grid>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={400}
        width={800}
      />
    </Grid>
  );
};
export default StatsGraph;
