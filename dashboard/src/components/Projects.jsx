// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
//   Card,
//   CardHeader,
//   CardBody,
//   Image,
//   Textarea,
// } from "@nextui-org/react";

// function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [title, setTitle] = useState(null);
//   const [description, setDescription] = useState(null);
//   const [image, setImage] = useState(null);
//   //For Modal
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/projects");
//         const projects = await response.json();
//         console.log("Projects", projects);
//         if (Array.isArray(projects.data)) {
//           setProjects(projects.data);
//         }
//         setError(error);
//       } catch (error) {
//         setError(true);
//         console.log(error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const openUpdateModal = (project) => {
//     setSelectedProject(project);
//     onOpen();
//   };

//   const openAddModal = () => {
//     setSelectedProject(null);
//     setTitle(null);
//     setDescription(null);
//     setImage(null);
//     onOpen();
//   };

//   const addProject = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("image", image);

//       const newProject = await axios.post(
//         "http://localhost:8080/api/projects",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Project Added: ", newProject);
//       alert("Project Added Successfully");
//       setTitle(null);
//       setDescription(null);
//       setImage(null);
//     } catch (error) {
//       console.log(error);
//       alert("Someting went wrong. Cannot add project");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image" && files && files.length > 0) {
//       setImage(files[0]);
//     } else {
//       setSelectedProject((current) => ({
//         ...current,
//         [name]: value,
//       }));
//     }
//     // console.log("selectedProject: ", selectedProject);
//   };

//   const updateProject = async (id) => {
//     try {
//       const formData = new FormData();

//       for (let key in selectedProject) {
//         formData.append(key, selectedProject[key]);
//       }

//       if (image) {
//         formData.append("image", image);
//       }

//       const project = axios.put(
//         `http://localhost:8080/api/projects/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Updated Project: ", project);
//       alert("Project Updated Sucessfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot update project");
//     }
//   };

//   const deleteProject = async (id) => {
//     try {
//       const project = await axios.delete(
//         `http://localhost:8080/api/projects/${id}`
//       );
//       setProjects(
//         projects.filter((project) => {
//           return project._id != id;
//         })
//       );
//       console.log("Deleted Project: ", project);
//       alert("Project Deleted Sucessfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot delete project");
//     }
//   };

//   return (
//     <React.Fragment>
//       <div>
//         <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
//           Projects
//         </h2>
//         <Button color="primary" className="mb-3" onClick={() => openAddModal()}>
//           + Add Project
//         </Button>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {projects.length > 0 ? (
//             projects.map((project) => {
//               return (
//                 <div key={project._id}>
//                   <Card className="py-4">
//                     <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//                       <h4 className="font-bold text-large">{project.title}</h4>
//                       <small className="text-default-500">
//                         {project.description}
//                       </small>
//                     </CardHeader>
//                     <CardBody className="overflow-visible py-2">
//                       <Image
//                         alt={project.title}
//                         className="object-cover rounded-xl"
//                         src={project.image}
//                         width={270}
//                         height={200}
//                       />
//                     </CardBody>
//                     <div className="px-4 flex gap-1">
//                       <Button
//                         color="success"
//                         className="text-white"
//                         onClick={() => {
//                           openUpdateModal(project);
//                         }}
//                       >
//                         Update
//                       </Button>
//                       <Button
//                         color="danger"
//                         onClick={() => {
//                           deleteProject(project._id);
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </Card>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No Project Found</p>
//           )}
//         </div>
//       </div>

//       {selectedProject ? ( // Conditionally render the modal if a project is selected
//         <>
//           <Modal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             placement="top-center"
//           >
//             <ModalContent>
//               {(onClose) => (
//                 <>
//                   <ModalHeader className="flex flex-col gap-1">
//                     Update Project
//                   </ModalHeader>
//                   <ModalBody>
//                     <Input
//                       autoFocus
//                       label="Title"
//                       type="text"
//                       name="title"
//                       variant="bordered"
//                       value={selectedProject.title}
//                       onChange={handleInputChange}
//                     />
//                     <Textarea
//                       label="Description"
//                       type="text"
//                       name="description"
//                       variant="bordered"
//                       value={selectedProject.description}
//                       onChange={handleInputChange}
//                     />
//                     <Image
//                       alt={selectedProject.title}
//                       className="object-cover rounded-xl"
//                       src={selectedProject.image}
//                       width={270}
//                     />
//                     <input
//                       id="file-input"
//                       type="file"
//                       name="image"
//                       onChange={handleInputChange}
//                     />
//                   </ModalBody>
//                   <ModalFooter>
//                     <Button color="danger" variant="flat" onPress={onClose}>
//                       Cancel
//                     </Button>
//                     <Button
//                       className="bg-green-500 hover:bg-green-700 text-white"
//                       onPress={onClose}
//                       onClick={() => updateProject(selectedProject._id)}
//                     >
//                       Save
//                     </Button>
//                   </ModalFooter>
//                 </>
//               )}
//             </ModalContent>
//           </Modal>
//         </>
//       ) : (
//         <>
//           <Modal
//             isOpen={isOpen}
//             onOpenChange={onOpenChange}
//             placement="top-center"
//           >
//             <ModalContent>
//               {(onClose) => (
//                 <>
//                   <ModalHeader className="flex flex-col gap-1">
//                     Add Project
//                   </ModalHeader>
//                   <ModalBody>
//                     <Input
//                       autoFocus
//                       label="title"
//                       placeholder="Enter title for project"
//                       type="text"
//                       name="title"
//                       value={title}
//                       onChange={(e) => {
//                         setTitle(e.target.value);
//                       }}
//                       variant="bordered"
//                     />
//                     <Textarea
//                       label="description"
//                       placeholder="Enter description for project"
//                       type="text"
//                       name="description"
//                       value={description}
//                       onChange={(e) => {
//                         setDescription(e.target.value);
//                       }}
//                       variant="bordered"
//                     />
//                     <input
//                       id="file-input"
//                       type="file"
//                       name="image"
//                       onChange={(e) => {
//                         setImage(e.target.files[0]);
//                       }}
//                     />
//                   </ModalBody>
//                   <ModalFooter>
//                     <Button color="danger" variant="flat" onClick={onClose}>
//                       Close
//                     </Button>
//                     <Button
//                       color="success"
//                       className="text-white"
//                       onClick={() => {
//                         addProject();
//                         onClose();
//                       }}
//                     >
//                       Save
//                     </Button>
//                   </ModalFooter>
//                 </>
//               )}
//             </ModalContent>
//           </Modal>
//         </>
//       )}
//     </React.Fragment>
//   );
// }

// export default Projects;

// -----------------------------------------------------------------------------------------------------

// Web 3 type design

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
  CardFooter
} from "@nextui-org/react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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
    onOpen();
  };

  const addProject = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

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
      setProjects(projects.map((proj) => (proj._id === id ? project.data : proj)));
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
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Projects</h2>
        <Button color="primary" className="mb-3" onClick={openAddModal}>
          + Add Project
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project._id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                <CardHeader>
                  <h4 className="text-xl font-semibold text-white">{project.title}</h4>
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
                </CardBody>
                <CardFooter className="flex gap-2">
                  <Button
                    color="success"
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            {selectedProject ? "Update Project" : "Add Project"}
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Title"
              type="text"
              name="title"
              variant="bordered"
              value={selectedProject?.title || title}
              onChange={handleInputChange}
            />
            <Textarea
              label="Description"
              type="text"
              name="description"
              variant="bordered"
              value={selectedProject?.description || description}
              onChange={handleInputChange}
            />
            <div className="mt-4">
              <input
                id="file-input"
                type="file"
                name="image"
                onChange={handleInputChange}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onOpenChange}>
              Close
            </Button>
            <Button
              color={selectedProject ? "success" : "primary"}
              onClick={() => {
                if (selectedProject) {
                  updateProject(selectedProject._id);
                } else {
                  addProject();
                }
                onOpenChange();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default Projects;

// ------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
//   Card,
//   CardHeader,
//   CardBody,
//   Image,
//   Textarea,
//   CardFooter
// } from "@nextui-org/react";

// function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [newProject, setNewProject] = useState({ title: "", description: "", image: "" });
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/projects");
//         const data = await response.json();
//         setProjects(data.data || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const handleProjectChange = (e) => {
//     const { name, value } = e.target;
//     setNewProject((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const addProject = async () => {
//     try {
//       await axios.post("http://localhost:8080/api/projects", newProject);
//       setProjects((prevProjects) => [...prevProjects, newProject]);
//       setNewProject({ title: "", description: "", image: "" });
//       alert("Project added successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot add project");
//     }
//   };

//   const updateProject = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/api/projects/${id}`, selectedProject);
//       alert("Project updated successfully");
//       onOpenChange();
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot update project");
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md max-w-full lg:max-w-4xl mx-auto">
//       <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Projects</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {projects.map((project) => (
//           <div
//             key={project._id}
//             className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
//           >
//             <img
//               src={project.image}
//               alt={project.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4 flex-1 flex flex-col">
//               <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
//               <p className="text-gray-700 mb-4 flex-1">{project.description}</p>
//               <Button
//                 onClick={() => {
//                   setSelectedProject(project);
//                   onOpen();
//                 }}
//                 color="gradient"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 Edit Project
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6">
//         <Input
//           name="title"
//           placeholder="Project Title"
//           value={newProject.title}
//           onChange={handleProjectChange}
//           className="mb-2"
//         />
//         <Textarea
//           name="description"
//           placeholder="Project Description"
//           value={newProject.description}
//           onChange={handleProjectChange}
//           rows={4}
//           className="mb-2"
//         />
//         <Input
//           name="image"
//           placeholder="Image URL"
//           value={newProject.image}
//           onChange={handleProjectChange}
//           className="mb-2"
//         />
//         <Button onClick={addProject} color="gradient" className="bg-blue-600 hover:bg-blue-700 text-white">
//           Add Project
//         </Button>
//       </div>

//       {/* Edit Project Modal */}
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <Modal.Content>
//           <Modal.Header className="text-lg md:text-xl font-semibold">Edit Project</Modal.Header>
//           <Modal.Body>
//             <Input
//               name="title"
//               label="Title"
//               value={selectedProject?.title || ""}
//               onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
//               className="mb-4"
//             />
//             <Textarea
//               name="description"
//               label="Description"
//               value={selectedProject?.description || ""}
//               onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
//               rows={4}
//               className="mb-4"
//             />
//             <Input
//               name="image"
//               label="Image URL"
//               value={selectedProject?.image || ""}
//               onChange={(e) => setSelectedProject({ ...selectedProject, image: e.target.value })}
//               className="mb-4"
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button color="error" variant="flat" onClick={onOpenChange}>
//               Close
//             </Button>
//             <Button color="gradient" onClick={() => updateProject(selectedProject._id)}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal.Content>
//       </Modal>
//     </div>
//   );
// }

// export default Projects;
