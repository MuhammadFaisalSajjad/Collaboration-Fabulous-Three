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
        <Grid justify="flex-start" align="stretch" >
          <GridCol span={{xs:12,sm:4,md:5,lg:5}}>
        <ServiceBox name="TFK" description="BFK"/>
        </GridCol>
        <GridCol span={{xs:12,sm:4,md:5,lg:5}}>
        <ServiceBox name="BFT" description="NFT"/>
        </GridCol>
        </Grid>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Services;
