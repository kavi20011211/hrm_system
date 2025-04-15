import { Grid, Paper, TextInput, Title, Text, Button } from "@mantine/core";
import { IconQuoteFilled } from "@tabler/icons-react";

const LoginPage = () => {
  return (
    <Grid w={"100%"} h={"100%"} top={0} pos={"absolute"}>
      <Grid.Col
        display={"flex"}
        span={6}
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          p={20}
          radius={20}
          withBorder
          style={{
            width: "60%",
            height: "50%",
            borderColor: "#67C6E3",
          }}
        >
          <Title align="center">Sign In</Title>
          <Grid.Col
            mt={50}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <Text> User Name</Text>{" "}
            <TextInput w={"60%"} placeholder="John Doe" />
          </Grid.Col>
          <Grid.Col
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Text> Password</Text>{" "}
            <TextInput w={"60%"} placeholder="**********" type="password" />
          </Grid.Col>
          <Button mt={20} fullWidth bg={"#67C6E3"}>
            <Text>Login</Text>
          </Button>
          <Grid.Col
            mt={10}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text>Didn't have an account ?</Text>{" "}
            <Text c={"#67C6E3"}>Sign Up here</Text>
          </Grid.Col>
        </Paper>
      </Grid.Col>
      <Grid.Col
        p={50}
        span={6}
        display={"flex"}
        style={{
          backgroundColor: "#67C6E3",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          bg="#ffffff30"
          p={20}
          radius={20}
          withBorder
          style={{
            borderColor: "#67C6E3",
          }}
        >
          <Text c={"white"} fz={24}>
            <IconQuoteFilled
              size={"50"}
              color="white"
              style={{ transform: "scaleX(-1)" }}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;Landed My Dream Job in Just a Week!" "I was
            struggling to find a job until I came across JobRooster.lk. The
            platform is super easy to use, and within a week, I landed an
            interview for my dream job! Highly recommended for anyone job
            hunting in Sri Lanka."
            <IconQuoteFilled
              size={"50"}
              color="white"
              style={{ justifySelf: "flex-end" }}
            />
            <Text> — Dilshan P </Text>
          </Text>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default LoginPage;
