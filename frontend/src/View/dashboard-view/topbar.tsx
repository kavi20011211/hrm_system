import { Grid, Title, Text, Button } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";

interface Props {
  setTopBarSelection: (type: string) => void;
}

const TopBar: React.FC<Props> = ({ setTopBarSelection }) => {
  const handleTopBarSelection = (selection: string) => {
    setTopBarSelection(selection);
  };
  return (
    <Grid>
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
              onClick={() => handleTopBarSelection("home")}
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
              onClick={() => handleTopBarSelection("stats")}
            >
              Stats
            </Button>
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "transparent",
                color: "#67C6E3",
                border: "1px solid #67C6E3",
              }}
              onClick={() => handleTopBarSelection("about")}
            >
              About
            </Button>
          </div>

          <div>
            <Button
              style={{
                backgroundColor: "#67C6E3",
              }}
              onClick={() => handleTopBarSelection("findjob")}
            >
              Find A Job
            </Button>
          </div>
          <div>
            <Button
              style={{
                backgroundColor: "#67C6E3",
              }}
              onClick={() => handleTopBarSelection("postjob")}
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
              onClick={() => handleTopBarSelection("signout")}
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
    </Grid>
  );
};
export default TopBar;
