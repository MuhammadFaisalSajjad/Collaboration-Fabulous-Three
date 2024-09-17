import React from "react";
import Layout from "../layout/Layout";
import { ContactForm } from "../components";

const Contact = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Layout>
        <ContactForm/>
      </Layout>
    </React.Fragment>
  );
};

export default Contact;
