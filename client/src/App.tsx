import React from "react";
import { MantineProvider } from "@mantine/core";
import Layout from "./layout/Layout";
import "@mantine/core/styles.css";

function App() {
  return (
    <React.Fragment>
      <MantineProvider>
        <Layout />
      </MantineProvider>
    </React.Fragment>
  );
}

export default App;
