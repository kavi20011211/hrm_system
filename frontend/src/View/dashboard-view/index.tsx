import { Grid, Title, Text, Button, Paper, RingProgress } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import React, { Component } from "react";

import dynamic from "next/dynamic";
import TopBar from "./topbar";
import StatCard from "./statcards";
import ReviewsCard from "./reviewscard";
import StatsRing from "./statsring";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
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
      <div className="w-15/16 h-7/8 bg-white rounded-2xl shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TopBar />

        <Grid style={{ justifyContent: "center" }}>
          <Grid.Col span={6}>
            <StatCard />
          </Grid.Col>
          <Grid.Col span={5}>
            <ReviewsCard />
          </Grid.Col>
        </Grid>

        <Grid.Col span={3}>
          <StatsRing />
        </Grid.Col>
      </div>
    </Grid>
  );
};

export default Dashboard;
