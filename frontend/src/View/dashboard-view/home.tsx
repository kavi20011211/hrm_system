import { Grid } from "@mantine/core";

import StatCard from "./statcards";
import ReviewsCard from "./reviewscard";

const Home = () => {
  return (
    <Grid p={20}>
      <Grid.Col span={6}>
        <StatCard />
      </Grid.Col>
      <Grid.Col span={6}>
        <ReviewsCard />
      </Grid.Col>
    </Grid>
  );
};
export default Home;
