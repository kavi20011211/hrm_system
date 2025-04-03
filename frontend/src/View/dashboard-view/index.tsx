import { Grid, Title, Text, Button, Paper, RingProgress } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import React, { Component } from "react";

import dynamic from "next/dynamic";
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
        <Grid.Col
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "end", gap: 5 }}>
            <Title fw={700}>Job </Title>
            <IconBriefcase size={50} />
            <Text style={{ fontSize: 30, fontWeight: 400 }}>Rooster.lk</Text>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 12,
              gap: 50,
              alignItems: "end",
              flexWrap: "wrap",
            }}
          >
            <div>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#67C6E3",
                  border: "1px solid #67C6E3",
                }}
              >
                Home
              </Button>
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#67C6E3",
                  border: "1px solid #67C6E3",
                }}
              >
                About
              </Button>
            </div>

            <div>
              <Button
                style={{
                  backgroundColor: "#67C6E3",
                }}
              >
                Find A Job
              </Button>
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "#67C6E3",
                }}
              >
                Post A Job
              </Button>
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#AF1740",
                  border: "1px solid #AF1740",
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col>
          <div
            style={{
              width: "90%",
              backgroundColor: "#67C6E3",
              height: 2,
              borderRadius: 10,
              justifySelf: "center",
            }}
          ></div>
        </Grid.Col>

        <Grid
          mt={30}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Grid.Col
            span={4}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: 20,
                  backgroundColor: "#67C6E3",
                  borderRadius: 20,
                }}
              >
                <Title style={{ fontSize: 20, fontWeight: 500 }}>
                  Available Jobs
                </Title>
                <Text>498+</Text>
              </Paper>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: 20,
                  backgroundColor: "#67C6E3",
                  borderRadius: 20,
                }}
              >
                <Title style={{ fontSize: 20, fontWeight: 500 }}>
                  Employees Vists
                </Title>
                <Text>498+</Text>
              </Paper>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: 20,
                  backgroundColor: "#67C6E3",
                  borderRadius: 20,
                }}
              >
                <Title style={{ fontSize: 20, fontWeight: 500 }}>
                  Categories
                </Title>
                <Text>498+</Text>
              </Paper>
              <Paper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,

                  padding: 20,
                  backgroundColor: "#67C6E3",
                  borderRadius: 20,
                }}
              >
                <Title style={{ fontSize: 20, fontWeight: 500 }}>
                  Successful Recrutings{" "}
                </Title>
                <Text>498+</Text>
              </Paper>
            </div>
          </Grid.Col>{" "}
          <Grid.Col
            span={6}
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: 10,
              width: "50%",
            }}
          >
            <Paper
              style={{
                padding: 20,

                borderRadius: 20,
                border: "1px solid #67C6E3",
              }}
            >
              <Title style={{ fontSize: 20, fontWeight: 500 }}>
                What our clients saying ...
              </Title>
              <Text style={{ marginTop: 20 }}>
                "Landed My Dream Job in Just a Week!" "I was struggling to find
                a job until I came across JobRooster.lk. The platform is super
                easy to use, and within a week, I landed an interview for my
                dream job! Highly recommended for anyone job hunting in Sri
                Lanka." — Dilshan P., Colombo
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
        <Grid
          mt={30}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Grid.Col
            span={3}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              padding: 20,
            }}
          >
            <RingProgress
              size={400}
              thickness={26}
              label={
                <Text
                  size="xs"
                  ta="center"
                  px="xs"
                  style={{ pointerEvents: "none" }}
                >
                  Hover sections to see tooltips
                </Text>
              }
              sections={[
                { value: 40, color: "cyan", tooltip: "Documents – 40 Gb" },
                { value: 25, color: "orange", tooltip: "Apps – 25 Gb" },
                { value: 15, color: "grape", tooltip: "Other – 15 Gb" },
              ]}
            />
          </Grid.Col>
          <Grid.Col
            span={8}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              padding: 20,
            }}
          >
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={400}
              width={1200}
            />
          </Grid.Col>
        </Grid>
      </div>
    </Grid>
  );
};

export default Dashboard;
