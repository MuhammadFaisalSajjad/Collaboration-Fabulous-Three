import React from "react";
import Layout from "../layout/Layout";
import { AboutSection } from "../components";

const About = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Layout>
        <AboutSection />
      </Layout>
    </React.Fragment>
  );
};

export default About;
