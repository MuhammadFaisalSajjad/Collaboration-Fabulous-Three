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
  Card,
  CardHeader,
  CardBody,
  Image,
  Textarea,
  CardFooter,
} from "@nextui-org/react";
import { VscAdd } from "react-icons/vsc";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  // For Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects");
        const projects = await response.json();
        if (Array.isArray(projects.data)) {
          setProjects(projects.data);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const openUpdateModal = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const openAddModal = () => {
    setSelectedProject(null);
    setTitle("");
    setDescription("");
    setImage(null);
    setUrl(null);
    onOpen();
  };

  const addProject = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("url", url);

      const newProject = await axios.post(
        "http://localhost:8080/api/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Project Added: ", newProject);
      alert("Project Added Successfully");
      setTitle(null);
      setDescription(null);
      setImage(null);
      setUrl(null);
    } catch (error) {
      console.log(error);
      alert("Someting went wrong. Cannot add project");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      setImage(files[0]);
    } else {
      setSelectedProject((current) => ({
        ...current,
        [name]: value,
      }));
    }
  };

  const updateProject = async (id) => {
    try {
      const formData = new FormData();

      for (let key in selectedProject) {
        formData.append(key, selectedProject[key]);
      }

      if (image) {
        formData.append("image", image);
      }

      const project = await axios.put(
        `http://localhost:8080/api/projects/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProjects(
        projects.map((proj) => (proj._id === id ? project.data : proj))
      );
      alert("Project Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Cannot update project");
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      alert("Project Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Cannot delete project");
    }
  };

  return (
    <React.Fragment>
      <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Projects
        </h2>
        <Button color="primary" className="mb-3" onClick={openAddModal}>
          <VscAdd /> Add Project
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card
                key={project._id}
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
              >
                <CardHeader>
                  <h4 className="text-xl font-semibold text-white">
                    {project.title}
                  </h4>
                </CardHeader>
                <CardBody>
                  <Image
                    alt={project.title}
                    className="object-cover rounded-lg"
                    src={project.image}
                    width={270}
                    height={200}
                  />
                  <p className="text-gray-300 mt-2">{project.description}</p>
                  <a
                    href={project.url}
                    className="text-blue-300 mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Preview
                  </a>
                </CardBody>
                <CardFooter className="flex gap-2">
                  <Button
                    color="success"
                    className="text-white"
                    onClick={() => openUpdateModal(project)}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => deleteProject(project._id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-400">No Projects Found</p>
          )}
        </div>
      </div>

      {selectedProject ? ( // Conditionally render the modal if a project is selected
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Update Project
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Title"
                      type="text"
                      name="title"
                      variant="bordered"
                      value={selectedProject.title}
                      onChange={handleInputChange}
                    />
                    <Textarea
                      label="Description"
                      type="text"
                      name="description"
                      variant="bordered"
                      value={selectedProject.description}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Url"
                      type="text"
                      name="url"
                      variant="bordered"
                      value={selectedProject.url}
                      onChange={handleInputChange}
                    />
                    <Image
                      alt={selectedProject.title}
                      className="object-cover rounded-xl"
                      src={selectedProject.image}
                      width={270}
                    />
                    <input
                      id="file-input"
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-700 text-white"
                      onPress={onClose}
                      onClick={() => updateProject(selectedProject._id)}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Project
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="title"
                      placeholder="Enter title for project"
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      variant="bordered"
                    />
                    <Input
                      label="url"
                      placeholder="Enter url for project"
                      type="text"
                      name="url"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                      variant="bordered"
                    />
                    <Textarea
                      label="description"
                      placeholder="Enter description for project"
                      type="text"
                      name="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      variant="bordered"
                    />
                    <input
                      id="file-input"
                      type="file"
                      name="image"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
                      Close
                    </Button>
                    <Button
                      color="success"
                      className="text-white"
                      onClick={() => {
                        addProject();
                        onClose();
                      }}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </React.Fragment>
  );
}

export default Projects;
