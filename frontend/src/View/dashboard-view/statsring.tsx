import { Grid, Text, RingProgress } from "@mantine/core";

const StatsRing = () => {
  return (
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
          <Text size="xs" ta="center" px="xs" style={{ pointerEvents: "none" }}>
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
  );
};
export default StatsRing;
