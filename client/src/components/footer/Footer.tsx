import React from "react";
import { Container, Text } from "@mantine/core";
import classes from "./index.module.css";

const Footer = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Container className={`${classes.fbg} mt-4 p-5 rounded-md`}>
        <Text className="text-center">
          Copyright © 2024 Gstar. All Rights Reserved.
        </Text>
      </Container>
    </React.Fragment>
  );
};

export default Footer;
