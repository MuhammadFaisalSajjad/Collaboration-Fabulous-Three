import React from "react";
import { Grid, Skeleton, Container } from "@mantine/core";
import { Navbar } from "../components";

const child = <Skeleton height={140} radius="md" animate={false} />;

const Layout = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Container my="md">
        <Grid>
          <Grid.Col span={{ base: 12, xs: 12 }}>
            <Navbar />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
