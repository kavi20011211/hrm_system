import { login, signup } from "@/api";
import {
  Grid,
  Paper,
  TextInput,
  Title,
  Text,
  Button,
  Alert,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandX,
  IconBriefcase,
  IconBriefcaseFilled,
  IconCalendarUser,
  IconClockHour4,
  IconFileCv,
  IconFileDescriptionFilled,
  IconGenderMale,
  IconQuoteFilled,
  IconSquareRounded,
  IconSquareRoundedMinus,
  IconSquareRoundedX,
  IconSquares,
  IconUserCheck,
} from "@tabler/icons-react";
import { FC, useState } from "react";

interface Props {
  setToken: (type: string) => void;
  setUser: (type: any) => void;
}

const LoginPage: FC<Props> = ({ setToken, setUser }) => {
  const [signUpShow, setSignUpShow] = useState(false);

  const [loginEmail, setLoginEmail] = useState<string | undefined>();
  const [loginPassword, setLoginPassword] = useState<string | undefined>();

  async function handleLogin() {
    if (loginEmail && loginPassword) {
      const userLoginData = await login(loginEmail, loginPassword);

      if (!userLoginData.data || userLoginData.error) {
        alert("Inavlid credentials");
      } else {
        alert("Login successful");
        setToken(userLoginData.token);
        setUser(userLoginData.data);
      }
    } else {
      alert("Enter email and password");
    }
  }

  const [signUpName, setSignUpName] = useState<string | undefined>();
  const [signUpEmail, setSignUpEmail] = useState<string | undefined>();
  const [signUpPassword, setSignUpPassword] = useState<string | undefined>();

  async function handleSignUp() {
    if (signUpName && signUpEmail && signUpPassword) {
      const userSignUpData = await signup(
        signUpEmail,
        signUpPassword,
        signUpName
      );

      if (userSignUpData.error) {
        alert(userSignUpData.error);
      } else {
        alert("Sign up successful");
        setSignUpShow(false);
      }
    } else {
      alert("Fill the all fields");
    }
  }

  return (
    <>
      {signUpShow === false && (
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
                <TextInput
                  w={"70%"}
                  placeholder="John Doe"
                  onChange={(event) => setLoginEmail(event.target.value)}
                />
              </Grid.Col>
              <Grid.Col
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Text> Password</Text>{" "}
                <TextInput
                  w={"70%"}
                  placeholder="**********"
                  type="password"
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </Grid.Col>
              <Button
                mt={20}
                fullWidth
                bg={"#67C6E3"}
                onClick={() => handleLogin()}
              >
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
                <Text c={"#67C6E3"} onClick={() => setSignUpShow(true)}>
                  Sign Up here
                </Text>
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
                Landed My Dream Job in Just a Week!" "I was struggling to find a
                job until I came across JobRooster.lk. The platform is super
                easy to use, and within a week, I landed an interview for my
                dream job! Highly recommended for anyone job hunting in Sri
                Lanka."
                <IconQuoteFilled
                  size={"50"}
                  color="white"
                  style={{ justifySelf: "flex-end" }}
                />
                <Text align="end" mt={10}>
                  {" "}
                  — Dilshan P{" "}
                </Text>
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      )}

      {signUpShow === true && (
        <Grid w={"100%"} h={"100%"} top={0} pos={"absolute"}>
          <Grid.Col
            p={10}
            span={6}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#67C6E3",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
            }}
          >
            <div style={{ display: "flex", alignItems: "end", gap: 5 }}>
              <Title fw={700} color="white">
                Job{" "}
              </Title>
              <IconBriefcase size={50} color="white" />
              <Text color="white" style={{ fontSize: 30, fontWeight: 400 }}>
                Rooster.lk
              </Text>
            </div>
            <Paper
              bg="#ffffff30"
              p={20}
              w={"90%"}
              radius={20}
              withBorder
              style={{
                borderColor: "#67C6E3",
              }}
            >
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <Paper bg="#ffffff60" p={10} radius={20}></Paper>
                  <Paper bg="#ffffff60" p={10} radius={20}></Paper>
                  <Paper bg="#ffffff60" p={10} radius={20}></Paper>
                </div>
                <Paper w={"70%"} bg="#ffffff60" p={10} radius={20}></Paper>
              </div>
              <div style={{ marginTop: 50, display: "flex", gap: 10 }}>
                <Paper w={"40%"} bg="#ffffff60" p={10} radius={20}>
                  {" "}
                </Paper>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    width: "70%",
                  }}
                >
                  {" "}
                  <Paper bg="#ffffff60" p={10} radius={20}>
                    <IconFileDescriptionFilled color="white" />
                  </Paper>
                  <Paper bg="#ffffff60" p={10} radius={20}>
                    <IconClockHour4 color="white" />
                  </Paper>
                  <Paper bg="#ffffff60" p={10} radius={20}>
                    {" "}
                    <IconCalendarUser color="white" size={20} />
                  </Paper>
                  <Paper bg="#ffffff60" p={10} radius={20}>
                    <IconGenderMale color="white" />
                  </Paper>
                  <Paper bg="#ffffff60" p={10} radius={20}>
                    <IconBriefcaseFilled color="white" />
                  </Paper>
                </div>
              </div>
              <div style={{ marginTop: 30 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginTop: 10,
                    color: "white",
                  }}
                >
                  <Paper w={"25%"} bg="#ffffff60" p={20} radius={20}>
                    <IconBrandFacebook color="white" size={30} />
                  </Paper>
                  <Paper w={"25%"} bg="#ffffff60" p={20} radius={20}>
                    <IconBrandMeta color="white" size={30} />
                  </Paper>
                  <Paper w={"25%"} bg="#ffffff60" p={20} radius={20}>
                    <IconBrandX color="white" size={30} />
                  </Paper>
                  <Paper w={"25%"} bg="#ffffff60" p={20} radius={20}>
                    <IconBrandInstagram color="white" size={30} />
                  </Paper>
                </div>
              </div>
            </Paper>
          </Grid.Col>
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
                borderColor: "#67C6E3",
              }}
            >
              <Title align="center">Sign Up</Title>
              <Grid.Col
                mt={50}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <Text> User Name</Text>{" "}
                <TextInput
                  w={"70%"}
                  placeholder="John Doe"
                  onChange={(event) => setSignUpName(event.target.value)}
                />
              </Grid.Col>
              <Grid.Col
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text> Email Address</Text>{" "}
                <TextInput
                  w={"70%"}
                  placeholder="you@example.com"
                  onChange={(event) => setSignUpEmail(event.target.value)}
                />
              </Grid.Col>
              <Grid.Col
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Text> Password</Text>{" "}
                <TextInput
                  w={"70%"}
                  placeholder="**********"
                  type="password"
                  onChange={(event) => setSignUpPassword(event.target.value)}
                />
              </Grid.Col>
              <Grid.Col
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Text> Confirm Password</Text>{" "}
                <TextInput w={"70%"} placeholder="**********" type="password" />
              </Grid.Col>
              <Button
                mt={20}
                fullWidth
                bg={"#67C6E3"}
                onClick={() => handleSignUp()}
              >
                <Text c={"white"}>Register</Text>
              </Button>
              <Grid.Col
                mt={10}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text>Didn't have an account ?</Text>{" "}
                <Text c={"#67C6E3"} onClick={() => setSignUpShow(false)}>
                  Sign In here
                </Text>
              </Grid.Col>
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default LoginPage;
