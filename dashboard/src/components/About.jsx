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
  Textarea,
  Input,
} from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function About() {
  const [about, setAbout] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isSkillOpen,
    onOpen: onSkillOpen,
    onOpenChange: onSkillOpenChange,
  } = useDisclosure();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/about");
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setAbout(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/skills");
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setSkills(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbout();
    fetchSkills();
  }, []);

  const openUpdateModal = (aboutSection) => {
    setSelectedSection(aboutSection);
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSection((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSelectedSkill((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const updateAbout = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/about/${id}`,
        selectedSection,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("About section updated successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Cannot update about section");
    }
  };

  const updateSkill = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/skills/${id}`, selectedSkill, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Skill updated successfully");
      onSkillOpenChange();
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Cannot update skill");
    }
  };

  const deleteSkill = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await axios.delete(`http://localhost:8080/api/skills/${id}`);
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill._id !== id)
        );
        alert("Skill deleted successfully");
      } catch (error) {
        console.log(error);
        alert("Something went wrong. Cannot delete skill");
      }
    }
  };

  const addSkill = async () => {
    try {
      await axios.post("http://localhost:8080/api/skills", { skill: newSkill });
      setSkills((prevSkills) => [...prevSkills, { skill: newSkill }]);
      setNewSkill("");
      alert("Skill added successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Cannot add skill");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-white">About Me</h2>
      {about.map((section) => (
        <div
          key={section._id}
          className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <p className="text-gray-300 mb-4">{section.aboutMe}</p>
          <Button
            onClick={() => {
              openUpdateModal(section);
            }}
            color="gradient"
            className="text-white"
          >
            <FaEdit /> Edit
          </Button>
        </div>
      ))}

      <h2 className="text-3xl font-extrabold mt-12 mb-6 text-white">Skills</h2>
      <div className="mb-6 flex items-center gap-4">
        <Input
          label="New Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter new skill"
          className="flex-1"
        />
        <Button onClick={addSkill} color="gradient" className="text-white">
          Add Skill
        </Button>
      </div>

      <ul className="space-y-4">
        {skills.map((skill) => (
          <li
            key={skill._id}
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <span className="text-white">{skill.skill}</span>
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  setSelectedSkill(skill);
                  onSkillOpen();
                }}
                color="gradient"
                className="text-white"
              >
                <FaEdit /> Edit
              </Button>
              <Button
                onClick={() => deleteSkill(skill._id)}
                color="error"
                className="text-white"
              >
                <FaTrash /> Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Section Modal */}
      {selectedSection ? (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            <ModalHeader className="text-xl font-semibold">
              Edit About Section
            </ModalHeader>
            <ModalBody>
              <Textarea
                placeholder="Enter updated content"
                name="aboutMe"
                value={selectedSection.aboutMe}
                onChange={handleInputChange}
                className="resize-none"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="error"
                variant="flat"
                onPress={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button
                color="gradient"
                onPress={() => {
                  updateAbout(selectedSection._id);
                  onOpenChange(false);
                }}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <></>
      )}

      {/* Edit Skill Modal */}
      <Modal
        isOpen={isSkillOpen}
        onOpenChange={onSkillOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Edit Skill
          </ModalHeader>
          <ModalBody>
            <Input
              name="skill"
              value={selectedSkill?.skill || ""}
              onChange={handleSkillChange}
              placeholder="Enter updated skill"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="error"
              variant="flat"
              onPress={() => onSkillOpenChange(false)}
            >
              Close
            </Button>
            <Button
              color="gradient"
              onPress={() => {
                updateSkill(selectedSkill._id);
                onSkillOpenChange(false);
              }}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default About;
