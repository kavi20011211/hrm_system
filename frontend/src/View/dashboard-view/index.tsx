import TopBar from "./topbar";
import Home from "./home";
import { useState } from "react";
import StatsRing from "./statsring";
import StatsGraph from "./statsgraph";
import { Grid } from "@mantine/core";
import About from "./about";
import JobPost from "../job-post-view";

const Dashboard = () => {
  const [topBarSelection, setTopBarSelection] = useState<string>("home");

  return (
    <div className="w-15/16 h-7/8 bg-white rounded-2xl shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <TopBar setTopBarSelection={setTopBarSelection} />

      {topBarSelection === "home" && <Home />}

      {topBarSelection === "stats" && (
        <Grid align="center" justify="center" p={20}>
          <Grid.Col span={4}>
            <StatsRing />
          </Grid.Col>
          <Grid.Col span={6}>
            <StatsGraph />
          </Grid.Col>
        </Grid>
      )}

      {topBarSelection === "about" && <About />}
      {topBarSelection === "postjob" && <JobPost />}
    </div>
  );
};

export default Dashboard;
