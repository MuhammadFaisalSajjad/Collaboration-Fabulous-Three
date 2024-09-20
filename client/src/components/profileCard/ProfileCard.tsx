import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks";
import { ReactTyped } from "react-typed";
import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  // Badge,
  Button,
  ActionIcon,
} from "@mantine/core";
import { Profile } from "../../models";
import classes from "./index.module.css";

const ProfileCard = (): React.JSX.Element => {
  const [profile, setProfile] = useState<Profile[]>([]);
  const url: string = "http://localhost:8080/api/profile";
  const { data } = useFetch({ url });

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  return (
    <React.Fragment>
      {profile.map((response) => (
        <Card
          withBorder
          radius="md"
          p="md"
          className={classes.card}
          key={response._id}
        >
          <Card.Section className="p-[3vw] pb-1">
            <Image
              src={response.avatar}
              alt={response.name}
              height={100}
              radius={200}
              className={classes.imgBorder}
            />
          </Card.Section>

          <Card.Section className={classes.section} mt="md">
            <Group justify="apart">
              <Text fz="h2" fw={500} className="mx-auto">
                {response.name}
              </Text>
            </Group>
            <Text fz="md" mt="xs" className="text-center">
              <ReactTyped
                strings={
                  Array.isArray(response.description)
                    ? response.description
                    : [response.description || "Description not available"]
                }
                typeSpeed={40}
                backSpeed={50}
                loop
              ></ReactTyped>
            </Text>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text mt="md" className={classes.label} c="dimmed">
              Perfect for you, if you enjoy
            </Text>
          </Card.Section>

          <Group mt="xs">
            <Button radius="md" style={{ flex: 1 }}>
              Show details
            </Button>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart className={classes.like} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default ProfileCard;
