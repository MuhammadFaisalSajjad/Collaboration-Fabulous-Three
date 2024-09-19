import React from "react";
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY!;





const ContactForm = (): React.JSX.Element => {
  
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  
  
  return (
    <React.Fragment>
      <Box>

      <form onSubmit={form.onSubmit(() => {})}>
      <Title
        order={2}
        size="h3"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={650}
        ta="left"
      >
        Let's get in touch
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
          size="lg"
          placeholder="Name*"
          name="name"
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          size="lg"
          placeholder="Email*"
          name="email"
          variant="filled"
          {...form.getInputProps('email')}
        />
      </SimpleGrid>

      <TextInput
        size="lg"
        placeholder="Subject*"
        mt="md"
        name="subject"
        variant="filled"
        {...form.getInputProps('subject')}
      />
      <Textarea
        size="lg"
        mt="md"
        placeholder="Tell me more about your needs .........."
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="filled"
        {...form.getInputProps('message')}
      />

      <Group justify="center" mt="xl">
        <Button type="submit" size="md" color="green">
          Send message
        </Button>
      </Group>
    </form>
        
      </Box>
    </React.Fragment>
  );
};

export default ContactForm;
