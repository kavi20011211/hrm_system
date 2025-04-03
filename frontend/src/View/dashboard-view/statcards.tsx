import { Grid, Title, Text, Paper } from "@mantine/core";
import React from "react";

const StatCard = () => {
  return (
    <Grid.Col style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
            Employee Visits
          </Title>
          <Text>1,200+</Text>
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
            Interviews Scheduled
          </Title>
          <Text>700+</Text>
        </Paper>{" "}
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
            Companies Hiring
          </Title>
          <Text>50+</Text>
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
          <Title style={{ fontSize: 20, fontWeight: 500 }}>Categories</Title>
          <Text>15+</Text>
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
            Successful Recruitings
          </Title>
          <Text>300+</Text>
        </Paper>{" "}
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
            Job Applications Processed
          </Title>
          <Text>4,800+</Text>
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
          <Title style={{ fontSize: 20, fontWeight: 500 }}>Active Users</Title>
          <Text>5,000+</Text>
        </Paper>
      </div>
    </Grid.Col>
  );
};

export default StatCard;
