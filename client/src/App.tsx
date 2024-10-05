import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { About, Contact, Services, Work } from "./pages";
import "@mantine/core/styles.css";

function App() {
  return (
    <React.Fragment>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<About />} />
              <Route path="/services" element={<Services />} />
              {/* <Route path="/resume" element={<Resume />} /> */}
              <Route path="/work" element={<Work />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </React.Fragment>
  );
}

export default App;
