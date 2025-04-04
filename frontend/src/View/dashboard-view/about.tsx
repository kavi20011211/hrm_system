import { Grid } from "@mantine/core";
import React from "react";

const About = () => {
  const containerStyle = {
    padding: "20px 80px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: 1.7,

    color: "#333",
  };

  const heading1Style = {
    fontSize: "2.5em",
    marginBottom: "20px",
  };

  const heading2Style = {
    marginTop: "30px",
    color: "#1e88e5",
  };

  const ulStyle = {
    paddingLeft: "20px",
  };

  const liStyle = {
    marginBottom: "10px",
  };

  const contactStyle = {
    marginTop: "40px",
    fontStyle: "italic",
  };

  return (
    <Grid style={containerStyle} justify="center">
      <Grid.Col span={6}>
        <h1 style={heading1Style}>About JobRooster.lk</h1>
        <p>
          Welcome to <strong>JobRooster.lk</strong> — Sri Lanka’s go-to platform
          for connecting talented individuals with the right opportunities.
          Whether you're on the hunt for your dream job or looking to hire the
          perfect candidate, we’re here to make it happen.
        </p>

        <h2 style={heading2Style}>Our Mission</h2>
        <p>
          To empower Sri Lanka’s workforce by providing a seamless,
          user-friendly platform where job seekers and employers can connect
          quickly, efficiently, and transparently.
        </p>

        <h2 style={heading2Style}>What We Offer</h2>
        <ul style={ulStyle}>
          <li style={liStyle}>
            🔍 Powerful job search tools tailored to your needs
          </li>
          <li style={liStyle}>
            📝 Easy job posting and applicant tracking for employers
          </li>
          <li style={liStyle}>
            📱 Mobile-friendly experience for job hunting on the go
          </li>
          <li style={liStyle}>
            ✅ Verified listings to ensure trust and quality
          </li>
        </ul>
      </Grid.Col>
      <Grid.Col span={6}>
        <h2 style={heading2Style}>Why Choose JobRooster.lk?</h2>
        <p>
          We're local. We're fast. And we care. At JobRooster.lk, we blend
          technology with a deep understanding of the Sri Lankan job market to
          help you find your next opportunity or hire, faster and smarter.
        </p>

        <h2 style={heading2Style}>Let’s Grow Together</h2>
        <p>
          Whether you’re an individual chasing your career goals or a company
          looking to grow your team, JobRooster.lk is here to support you every
          step of the way.
        </p>

        <p style={contactStyle}>
          Have questions? Reach out to us at{" "}
          <a href="mailto:support@jobrooster.lk">support@jobrooster.lk</a>
        </p>
      </Grid.Col>
    </Grid>
  );
};

export default About;
