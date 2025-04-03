import { Grid, Title, Text, Button } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import React, { Component } from "react";

const TopBar = () => {
  return (
    <div>
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
    </div>
  );
};
export default TopBar;
