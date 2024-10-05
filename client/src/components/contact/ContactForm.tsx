import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Text,
  Button,
  Box,
} from "@mantine/core";
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
    subject: {
      value: "",
      error: "",
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
      from_subject: formData.subject.value,
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
      <Box>
        <form onSubmit={handleSubmit}>
        <div className="flex items-center">
            <Text fz="h2" fw={700}>
              CONTACT
            </Text>
            <hr className="border-gray-600 w-[30vw] -z-10 relative right-20 " />
          </div>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
              size="lg"
              placeholder="Name*"
              required
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
              required
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
            required
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
            required
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
            <Button
              disabled={isSubmitting}
              type="submit"
              size="md"
              color="green"
            >
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
