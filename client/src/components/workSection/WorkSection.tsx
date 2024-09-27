import React, { useEffect, useState } from "react";
import { Card, Container, Text } from "@mantine/core";
import { useFetch } from "../../hooks";
import { Project } from "../../models";

const WorkSection = (): React.JSX.Element => {
  const [project, setProject] = useState<Project[]>([]);
  const url: string = "http://localhost:8080/api/projects";
  const { data } = useFetch({ url });

  useEffect(() => {
    try {
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="flex items-center mb-4">
        <Text fz="h2" fw={700}>
          WORK
        </Text>
        <hr className="border-gray-600 w-[30vw] -z-10 relative right-20 " />
      </div>
      <Container size="responsive">
        <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
          {project.map((data) => (
            <div
              key={data._id}
              className="w-[95vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw]"
            >
              <Card withBorder className="flex flex-col gap-2">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full object-cover"
                />
                <Text fz="h4" fw="bold">
                  {data.title}
                </Text>
                <Text>{data.description}</Text>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3CB38]"
                >
                  Live Preview
                </a>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default WorkSection;
