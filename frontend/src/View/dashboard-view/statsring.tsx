import { Grid, Text, RingProgress } from "@mantine/core";

const StatsRing = () => {
  return (
    <Grid>
      <RingProgress
        size={400}
        thickness={20}
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
    </Grid>
  );
};
export default StatsRing;
