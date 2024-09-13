import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <React.Fragment>
      <MantineProvider>{/* Your app here */}</MantineProvider>
    </React.Fragment>
  );
}

export default App;
