import React from "react";
import Layout from "../layout/Layout";
import { ServiceBox } from "../components";
import { Grid, GridCol } from "@mantine/core";

const Services = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Layout>
        <div>
        <h1>Most Recent Work</h1>
        <Grid align="stretch" >
          <GridCol span={{xs:12,sm:4,md:5,lg:5}}>
        <ServiceBox name="Talha Farooq Khan" description="A quick brown fox jumps over the lazy dog"/>
        </GridCol>
        <GridCol span={{xs:12,sm:4,md:5,lg:5}}>
        <ServiceBox name="Hassaan Bin Kaleem" description="A quick brown fox jumps over the lazy dog"/>
        </GridCol>
        <GridCol span={{xs:12,sm:4,md:5,lg:5}}>
        <ServiceBox name="Muhammad Faisal Sajjad" description="A quick brown fox jumps over the lazy dog"/>
        </GridCol>
        </Grid>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Services;
