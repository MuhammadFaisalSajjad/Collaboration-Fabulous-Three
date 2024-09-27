import React, { useEffect, useState } from "react";
import { About } from "../../models";
import { useFetch } from "../../hooks";
import { Text, Box, Container, Card } from "@mantine/core";
import {
  IconMusic,
  IconCode,
  IconDatabase,
  IconBook,
  IconDeviceGamepad2,
  IconBrandAmazon,
} from "@tabler/icons-react";
import "./index.css";
import DownloadButton from "../downloadButton/DownloadButton";

const AboutSection = (): React.JSX.Element => {
  const [about, setAbout] = useState<About[]>([]);
  const url = "http://localhost:8080/api/about";
  const { data } = useFetch({ url });

  useEffect(() => {
    try {
      if (data) {
        setAbout(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <React.Fragment>
      <div>
        <Box>
          <div className="flex items-center">
            <Text fz="h2" fw={700}>
              ABOUT ME
            </Text>
            <hr className="border-gray-600 w-[30vw] -z-10 relative right-20 " />
          </div>
          <Text className="mt-10 mb-8 text-5xl">
            Hello👋I'm <span className="text-[#A3CB38]">Faisal Sajjad</span>, a
            web developer specializing in solving complex development
            challenges.
          </Text>
          <DownloadButton/>
          {about.map((data) => (
            <Text className="text-gray-500">{data.aboutMe}</Text>
          ))}

          <Container
            fluid
            size="responsive"
            className="lg:flex lg:mt-10 lg:mx-auto sm:flex sm:mt-10 sm:justify-center sm:items-center"
          >
            <Box
              className="px-9 py-4 lg:border-r-2 border-gray-600 text-center sm:border-none"
              style={{ borderRightStyle: "dotted" }}
            >
              <Text className="text-4xl font-bold">10+</Text>
              <Text className="text-gray-500">Years Experiance</Text>
            </Box>
            <Box
              className="px-9 py-4 lg:border-r-2 border-gray-600 text-center sm:border-none"
              style={{ borderRightStyle: "dotted" }}
            >
              <Text className="text-4xl font-bold">85+</Text>
              <Text className="text-gray-500">Happy Clients</Text>
            </Box>
            <Box
              className="px-9 py-4 lg:border-r-2 border-gray-600 text-center sm:border-none"
              style={{ borderRightStyle: "dotted" }}
            >
              <Text className="text-4xl font-bold">650+</Text>
              <Text className="text-gray-500">Projects Done</Text>
            </Box>
            <Box className="px-9 py-4 text-center">
              <Text className="text-4xl font-bold text-center">45</Text>
              <Text className="text-gray-500">Get Awards</Text>
            </Box>
          </Container>

          <Container className="mt-10">
            <Text className="text-xl font-bold">Interest</Text>
            <div className="flex flex-wrap gap-5 mt-4 sm:!justify-center">
              <Card
                withBorder
                radius="md"
                className="flex flex-row gap-2 lg:w-52 sm:!w-full md:!w-52"
              >
                <IconMusic stroke={2} />
                <Text className="text-lg">Music</Text>
              </Card>
              <Card
                withBorder
                radius="md"
                className="flex flex-row gap-2 lg:w-52 sm:!w-full md:!w-52"
              >
                <IconCode stroke={2} />
                <Text className="text-lg">Development</Text>
              </Card>
              <Card
                withBorder
                radius="md"
                className="flex flex-row gap-2 lg:w-52 sm:!w-full md:!w-52"
              >
                <IconDatabase stroke={2} />
                <Text className="text-lg">Database</Text>
              </Card>
              <Card
                withBorder
                radius="md"
                className="flex flex-row gap-2 lg:w-52 sm:!w-full md:!w-52"
              >
                <IconBook stroke={2} />
                <Text className="text-lg">Poetry</Text>
              </Card>
              <Card
                withBorder
                radius="md"
                className="flex flex-row gap-2 lg:w-52 sm:!w-full md:!w-52"
              >
                <IconDeviceGamepad2 stroke={2} />
                <Text className="text-lg">Gaming</Text>
              </Card>
              <Card withBorder radius="md" className="flex flex-row gap-2 w-52">
                <IconBrandAmazon stroke={2} />
                <Text className="text-lg">Ecommerce</Text>
              </Card>
            </div>
          </Container>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default AboutSection;
