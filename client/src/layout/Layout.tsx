import React from "react";
import { Grid, Container } from "@mantine/core";
import { Navbar, ProfileCard } from "../components";
import { LayoutProp } from "../types";
import "./index.css";

const Layout = ({ children }: LayoutProp): React.JSX.Element => {
  return (
    <React.Fragment>
      <Container my="md" size="lg">
        <Grid grow>
          <Grid.Col
            span={{ base: 12, xs: 12, md: 12 }}
            style={{
              position: "sticky",
              top: "0",
              zIndex: "10",
              backdropFilter: "blur(16px) saturate(180%)",
            }}
          >
            <Navbar />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3, md: 3 }}>
            <ProfileCard />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 9, md: 9 }}>{children}</Grid.Col>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
