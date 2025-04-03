import { Grid, Title, Text, Paper } from "@mantine/core";

const ReviewsCard = () => {
  return (
    <Grid.Col
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: 10,
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
          "Landed My Dream Job in Just a Week!" "I was struggling to find a job
          until I came across JobRooster.lk. The platform is super easy to use,
          and within a week, I landed an interview for my dream job! Highly
          recommended for anyone job hunting in Sri Lanka." — Dilshan P.,
          Colombo
        </Text>
        <Text style={{ marginTop: 20 }}>
          "Landed My Dream Job in Just a Week!" "I was struggling to find a job
          until I came across JobRooster.lk. The platform is super easy to use,
          and within a week, I landed an interview for my dream job! Highly
          recommended for anyone job hunting in Sri Lanka." — Dilshan P.,
          Colombo
        </Text>
        <Text style={{ marginTop: 20 }}>
          "Landed My Dream Job in Just a Week!" "I was struggling to find a job
          until I came across JobRooster.lk. The platform is super easy to use,
          and within a week, I landed an interview for my dream job! Highly
          recommended for anyone job hunting in Sri Lanka." — Dilshan P.,
          Colombo
        </Text>
      </Paper>
    </Grid.Col>
  );
};
export default ReviewsCard;
