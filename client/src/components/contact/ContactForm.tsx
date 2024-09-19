import React, {useState} from "react";
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Box } from '@mantine/core';
// import { useForm } from '@mantine/form';
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID!;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID!;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY!;

const ContactForm = (): React.JSX.Element => {
  
  const defaultFormState = {
    name: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    subject:{
      value:"",
      error:"",
    },
    message: {
      value: "",
      error: "",
    },
  };


  const [formData, setFormData] = useState(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    // Prepare form data for EmailJS
    const templateParams = {
      from_name: formData.name.value,
      from_email: formData.email.value,
      from_subject:formData.subject.value,
      message: formData.message.value,
      to_name: "Faisal Sajjad",
    };

    // Initialize EmailJS with public key
    emailjs.init(PUBLIC_KEY);

    // Send the email using EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatusMessage("Message sent successfully!");
        setIsSubmitting(false);
        setFormData(defaultFormState); // Reset form after submission
      },
      (err) => {
        console.error("FAILED...", err);
        setStatusMessage("Error Sending Message");
        setIsSubmitting(false);
      }
    );
  };


  
  return (
    <React.Fragment>
      <Box mt="lg" >

      <form onSubmit={handleSubmit}>
      <Title
        mt='lg'
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
          value={formData.name.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
        <TextInput
          size="lg"
          placeholder="Email*"
          name="email"
          variant="filled"
          value={formData.email.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: {
                value: e.target.value,
                error: "",
              },
            });
          }}
        />
      </SimpleGrid>

      <TextInput
        size="lg"
        placeholder="Subject*"
        mt="md"
        name="subject"
        variant="filled"
        value={formData.subject.value}
          onChange={(e) => {
            setFormData({
              ...formData,
              subject: {
                value: e.target.value,
                error: "",
              },
            });
          }}
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
        value={formData.message.value}
                  onChange={(e) => {
            setFormData({
              ...formData,
              message: {
                value: e.target.value,
                error: "",
              },
            });
          }}
      />

      <Group justify="center" mt="xl">
        <Button disabled={isSubmitting} type="submit" size="md" color="green">
        {isSubmitting ? "Sending..." : "Send message"}
        </Button>
        {statusMessage && (
        <p className="mt-4 text-sm text-neutral-600">{statusMessage}</p>
      )}
      </Group>
    </form>
        
      </Box>
    </React.Fragment>
  );
};

export default ContactForm;
