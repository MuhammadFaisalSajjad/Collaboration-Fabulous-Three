import React from "react";
import Layout from "../layout/Layout";
import { ServiceBox } from "../components";

const Services = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Layout>
        <ServiceBox/>
      </Layout>
    </React.Fragment>
  );
};

export default Services;
