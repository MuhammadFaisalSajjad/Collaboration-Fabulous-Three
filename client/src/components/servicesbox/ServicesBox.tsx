import React, { useEffect, useState } from "react";
import { Box, Container, Text } from "@mantine/core";
import { IconBraces } from "@tabler/icons-react";
import { Service } from "../../models";
import { useFetch } from "../../hooks";

const ServiceBox = (): React.JSX.Element => {
  const [service, setService] = useState<Service[]>([]);
  const url: string = "http://localhost:8080/api/services";
  const { data } = useFetch({ url });

  useEffect(() => {
    try {
      setService(data);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <React.Fragment>
      <div className="flex items-center mb-4">
        <Text fz="h2" fw={700}>
          SERVICES
        </Text>
        <hr className="border-gray-600 w-[30vw] -z-10 relative right-20 " />
      </div>
      <Container size="responsive" className="flex flex-wrap gap-6 mx-auto">
        {service.map((data) => (
          <Box
            bg="light-dark"
            key={data._id}
            style={{
              border: "2px solid #424242",
              borderRadius: "10px",
            }}
            className="w-72"
          >
            <Box pb="lg" mt="lg" ml="lg">
              <IconBraces size={60} stroke={2} />
              <h1
                style={{
                  marginTop: "2vh",
                  marginBottom: "2vh",
                  fontSize: "1.4em",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                {data.title}
              </h1>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#746F84",
                }}
              >
                {data.description}
              </p>
            </Box>
          </Box>
        ))}
      </Container>
    </React.Fragment>
  );
};

export default ServiceBox;
