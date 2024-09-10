import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { VscAdd } from "react-icons/vsc";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [project, setProject] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const experience = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/experience");
        const experience = await response.json();
        if (Array.isArray(experience.data)) {
          setExperience(experience.data);
          console.log("Experience: ", experience.data);
        }
      } catch (error) {
        console.error("Error fetching experience: ", error);
      }
    };
    experience();
  }, []);

  const openAddModal = () => {
    setSelectedExperience(null);
    setCompany("");
    setJobTitle("");
    setProject("");
    setDuration("");
    setDescription("");
    onOpen();
  };

  const openUpdateModal = (exp) => {
    setSelectedExperience(exp);
    setCompany(exp.company);
    setJobTitle(exp.jobTitle);
    setProject(exp.project);
    setDuration(exp.duration);
    setDescription(exp.description);
    onOpen();
  };

  const addOrUpdateExperience = async () => {
    if (selectedExperience) {
      try {
        await axios.put(
          `http://localhost:8080/api/experience/${selectedExperience._id}`,
          {
            company,
            jobTitle,
            project,
            duration,
            description,
          }
        );

        alert("Project Updated Successfully");
      } catch (error) {
        console.log(error);
        alert("Failed to update experience");
      }
    } else {
      try {
        await axios.post("http://localhost:8080/api/experience", {
          company,
          jobTitle,
          project,
          duration,
          description,
        });

        alert("New Experience Added successfully");
      } catch (error) {
        console.log(error);
        alert("Failed to add experience");
      }
    }
    onOpenChange();
  };

  const deleteExperience = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/experience/${id}`);
      setExperience(experience.filter((exp) => exp._id !== id));
      alert("Experience deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete experience");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
        Experience
      </h2>
      <Button color="primary" className="mb-3" onClick={openAddModal}>
        <VscAdd /> Add Experience
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experience.length > 0 ? (
          experience.map((exp) => (
            <Card
              key={exp._id}
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
            >
              <CardHeader>
                <h4 className="text-xl font-semibold text-white">
                  {exp.jobTitle}
                </h4>
              </CardHeader>
              <CardBody>
                <p className="text-gray-300">Company: {exp.company}</p>
                <p className="text-gray-300">Project: {exp.project}</p>
                <p className="text-gray-300">Duration: {exp.duration}</p>
                <p className="text-gray-300">Description: {exp.description}</p>
              </CardBody>
              <CardFooter className="flex gap-2">
                <Button
                  color="success"
                  className="text-white"
                  onClick={() => openUpdateModal(exp)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => deleteExperience(exp._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-400">No Experience Found</p>
        )}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedExperience ? "Update Experience" : "Add Experience"}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Company"
                  placeholder="Enter company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  variant="bordered"
                />
                <Input
                  label="Job Title"
                  placeholder="Enter job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  variant="bordered"
                />
                <Input
                  label="Project"
                  placeholder="Enter project name"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  variant="bordered"
                />
                <Input
                  label="Duration"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  variant="bordered"
                />
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="success"
                  className="text-white"
                  onClick={addOrUpdateExperience}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Experience;
