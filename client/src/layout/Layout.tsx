import React from "react";
import { Grid, Container } from "@mantine/core";
import { Navbar, ProfileCard } from "../components";
import { LayoutProp } from "../types";

const Layout = ({ children }: LayoutProp): React.JSX.Element => {
  return (
    <React.Fragment>
      <Container my="md">
        <Grid>
          <Grid.Col span={{ base: 12, xs: 12 }}>
            <Navbar />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            {/* <Skeleton height={140} radius="md" animate={false} /> */}
            <ProfileCard/>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>{children}</Grid.Col>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
