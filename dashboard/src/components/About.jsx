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
//   Textarea,
//   Input,
// } from "@nextui-org/react";
// import { FaEdit, FaTrash } from "react-icons/fa";

// function About() {
//   const [about, setAbout] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [selectedSection, setSelectedSection] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [newSkill, setNewSkill] = useState("");
//   // For Modal
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const {
//     isOpen: isSkillOpen,
//     onOpen: onSkillOpen,
//     onOpenChange: onSkillOpenChange,
//   } = useDisclosure();

//   useEffect(() => {
//     const aboutSection = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/about");
//         const aboutMe = await response.json();
//         console.log("About Me: ", aboutMe);
//         if (Array.isArray(aboutMe.data)) {
//           setAbout(aboutMe.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const skillSection = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/skills");
//         const skills = await response.json();
//         if (Array.isArray(skills.data)) {
//           setSkills(skills.data);
//           console.log("Skills: ", skills.data);
//         }
//       } catch (error) {}
//     };

//     aboutSection();
//     skillSection();
//   }, []);

//   const openAboutModal = (section) => {
//     setSelectedSection(section);
//     onOpen();
//   };

//   const openEditSkillModal = (skill) => {
//     setSelectedSkill(skill);
//     onSkillOpen();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedSection((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const handleSkillChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedSkill((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const updateAbout = async (id) => {
//     try {
//       const updatedData = { ...selectedSection };

//       const about = await axios.put(
//         `http://localhost:8080/api/about/${id}`,
//         updatedData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Updated About: ", about);
//       alert("About section updated successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot update about section");
//     }
//   };

//   const updateSkill = async (id) => {
//     try {
//       const updatedSkill = { ...selectedSkill };

//       const skill = await axios.put(
//         `http://localhost:8080/api/skills/${id}`,
//         updatedSkill,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Updated Skill: ", skill);
//       alert("Skill updated successfully");
//       onSkillOpenChange(); // Close the modal after saving
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot update skill");
//     }
//   };

//   const deleteSkill = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this skill?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/skills/${id}`);
//       setSkills(skills.filter((skill) => skill._id !== id)); // Remove from UI
//       alert("Skill deleted successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot delete skill");
//     }
//   };

//   const addSkill = async () => {
//     if (!newSkill) return;

//     try {
//       const response = await axios.post("http://localhost:8080/api/skills", {
//         skill: newSkill,
//       });
//       setSkills([...skills, response.data]); // Add new skill to UI
//       setNewSkill(""); // Clear the input
//       alert("Skill added successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot add skill");
//     }
//   };

//   return (
//     <React.Fragment>
//       <div>
//         {/* About Me Section */}
//         <section className="mb-12 text-center">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
//             About Me
//           </h2>
//           {about.map((aboutme) => (
//             <div key={aboutme._id} className="mb-8">
//               <p className="text-lg text-gray-600 leading-7">
//                 {aboutme.aboutMe}
//               </p>
//               <Button
//                 color="success"
//                 className="text-white my-4"
//                 onClick={() => openAboutModal(aboutme)}
//               >
//                 Update
//               </Button>
//             </div>
//           ))}
//         </section>

//         {/* Skills Section */}
//         <section className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Skills</h2>

//           {/* Input for new skill */}
//           <div className="flex justify-center items-center gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Add a new skill"
//               className="border border-gray-300 p-2 rounded-lg shadow-sm w-64 focus:ring focus:ring-blue-300"
//               value={newSkill}
//               onChange={(e) => setNewSkill(e.target.value)}
//             />
//             <Button color="success" className="text-white" onClick={addSkill}>
//               Add Skill
//             </Button>
//           </div>

//           {/* Display skills */}
//           <ul className="flex flex-wrap justify-center gap-4 mb-6">
//             {skills.map((skill) => (
//               <li
//                 key={skill._id}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
//               >
//                 {skill.skill}
//                 <FaEdit
//                   className="cursor-pointer text-white"
//                   onClick={() => openEditSkillModal(skill)}
//                 />
//                 <FaTrash
//                   className="cursor-pointer text-white"
//                   onClick={() => deleteSkill(skill._id)}
//                 />
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>

//       {/* Modal for updating About Me */}
//       {selectedSection && (
//         <Modal
//           isOpen={isOpen}
//           onOpenChange={onOpenChange}
//           placement="top-center"
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   About Me Section
//                 </ModalHeader>
//                 <ModalBody>
//                   <Textarea
//                     autoFocus
//                     label="About Me"
//                     placeholder="Describe yourself"
//                     name="aboutMe"
//                     value={selectedSection.aboutMe}
//                     onChange={handleInputChange}
//                     variant="bordered"
//                   />
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="flat" onPress={onClose}>
//                     Close
//                   </Button>
//                   <Button
//                     color="success"
//                     className="text-white"
//                     onPress={() => {
//                       updateAbout(selectedSection._id);
//                       onClose();
//                     }}
//                   >
//                     Save
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       )}

//       {/* Modal for editing skill */}
//       {selectedSkill && (
//         <Modal
//           isOpen={isSkillOpen}
//           onOpenChange={onSkillOpenChange}
//           placement="top-center"
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   Edit Skill
//                 </ModalHeader>
//                 <ModalBody>
//                   <Input
//                     label="Skill"
//                     placeholder="Edit skill"
//                     name="skill"
//                     value={selectedSkill.skill}
//                     onChange={handleSkillChange}
//                     variant="bordered"
//                   />
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="flat" onPress={onClose}>
//                     Close
//                   </Button>
//                   <Button
//                     color="success"
//                     className="text-white"
//                     onPress={() => {
//                       updateSkill(selectedSkill._id);
//                       onClose();
//                     }}
//                   >
//                     Save
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       )}
//     </React.Fragment>
//   );
// }

// export default About;

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
  const { isOpen: isSkillOpen, onOpen: onSkillOpen, onOpenChange: onSkillOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/about");
        const data = await response.json();
        if(Array.isArray(data.data)) {
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
        setSkills(data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAbout();
    fetchSkills();
  }, []);

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSelectedSkill((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const updateAbout = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/about/${id}`, selectedSection, {
        headers: { "Content-Type": "application/json" },
      });
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
        setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
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
    <div className="p-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-white">About Me</h2>
      {about.map((section) => (
        <div key={section._id} className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <p className="text-gray-300 mb-4">{section.aboutMe}</p>
          <Button onClick={() => { setSelectedSection(section._id); onOpen(); }} color="gradient" className="text-white">
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
          <li key={skill._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-white">{skill.skill}</span>
            <div className="flex space-x-2">
              <Button onClick={() => { setSelectedSkill(skill); onSkillOpen(); }} color="gradient" className="text-white">
                <FaEdit /> Edit
              </Button>
              <Button onClick={() => deleteSkill(skill._id)} color="error" className="text-white">
                <FaTrash /> Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Section Modal */}
     {selectedSection ? (
       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
       <ModalContent>
         <ModalHeader className="text-xl font-semibold">Edit About Section</ModalHeader>
         <ModalBody>
           <Textarea
             placeholder="Enter updated content"
             value={selectedSection.aboutMe}
             onChange={(e) =>
               setSelectedSection((prev) => ({ ...prev, content: e.target.value }))
             }
             className="resize-none"
           />
         </ModalBody>
         <ModalFooter>
           <Button color="error" variant="flat" onPress={() => onOpenChange(false)}>
             Close
           </Button>
           <Button color="gradient" onPress={() => { updateAbout(selectedSection._id); onOpenChange(false); }}>
             Save Changes
           </Button>
         </ModalFooter>
       </ModalContent>
     </Modal>
     ):(<></>)}

      {/* Edit Skill Modal */}
      <Modal isOpen={isSkillOpen} onOpenChange={onSkillOpenChange} placement="top-center">
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">Edit Skill</ModalHeader>
          <ModalBody>
            <Input
              name="skill"
              value={selectedSkill?.skill || ""}
              onChange={handleSkillChange}
              placeholder="Enter updated skill"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="error" variant="flat" onPress={() => onSkillOpenChange(false)}>
              Close
            </Button>
            <Button color="gradient" onPress={() => { updateSkill(selectedSkill._id); onSkillOpenChange(false); }}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default About;

// ------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     Modal,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Button,
//     useDisclosure,
//     Input,
//     Card,
//     CardHeader,
//     CardBody,
//     Image,
//     Textarea,
//     CardFooter
//   } from "@nextui-org/react";
// import { FaEdit, FaTrash } from "react-icons/fa";

// function About() {
//   const [about, setAbout] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [newSkill, setNewSkill] = useState("");
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const { isOpen: isSkillOpen, onOpen: onSkillOpen, onOpenChange: onSkillOpenChange } = useDisclosure();

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/about");
//         const data = await response.json();
//         if (Array.isArray(data.data)) {
//           setAbout(data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const fetchSkills = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/skills");
//         const data = await response.json();
//         setSkills(data.data || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchAbout();
//     fetchSkills();
//   }, []);

//   const handleSkillChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedSkill((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   const updateAbout = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/api/about/${id}`, selectedSection, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("About section updated successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot update about section");
//     }
//   };

//   const updateSkill = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/api/skills/${id}`, selectedSkill, {
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("Skill updated successfully");
//       onSkillOpenChange();
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot update skill");
//     }
//   };

//   const deleteSkill = async (id) => {
//     if (window.confirm("Are you sure you want to delete this skill?")) {
//       try {
//         await axios.delete(`http://localhost:8080/api/skills/${id}`);
//         setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
//         alert("Skill deleted successfully");
//       } catch (error) {
//         console.log(error);
//         alert("Something went wrong. Cannot delete skill");
//       }
//     }
//   };

//   const addSkill = async () => {
//     try {
//       await axios.post("http://localhost:8080/api/skills", { skill: newSkill });
//       setSkills((prevSkills) => [...prevSkills, { skill: newSkill }]);
//       setNewSkill("");
//       alert("Skill added successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Cannot add skill");
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
//       {about.map((section) => (
//         <div key={section.id} className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
//           <h3 className="text-2xl font-semibold mb-2">{section.title}</h3>
//           <p className="text-gray-700 mb-4">{section.description}</p>
//           <Button
//             onClick={() => {
//               setSelectedSection(section);
//               onOpen();
//             }}
//             color="gradient"
//             className="bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             <FaEdit className="mr-2" />
//             Edit Section
//           </Button>
//         </div>
//       ))}

//       <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-900">Skills</h2>
//       <ul className="list-disc pl-6 mb-6">
//         {skills.map((skill) => (
//           <li key={skill._id} className="flex justify-between items-center mb-2 text-gray-800">
//             {skill.skill}
//             <div>
//               <Button
//                 onClick={() => {
//                   setSelectedSkill(skill);
//                   onSkillOpenChange();
//                 }}
//                 color="gradient"
//                 className="mr-2 bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 <FaEdit />
//               </Button>
//               <Button
//                 onClick={() => deleteSkill(skill._id)}
//                 color="error"
//                 className="bg-red-600 hover:bg-red-700 text-white"
//               >
//                 <FaTrash />
//               </Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4">
//         <Input
//           placeholder="Add new skill"
//           value={newSkill}
//           onChange={(e) => setNewSkill(e.target.value)}
//           className="mb-2"
//         />
//         <Button onClick={addSkill} color="gradient" className="bg-blue-600 hover:bg-blue-700 text-white">
//           Add Skill
//         </Button>
//       </div>

//       {/* Edit About Section Modal */}
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <Modal.Content>
//           <Modal.Header className="text-xl font-semibold">Edit About Section</Modal.Header>
//           <Modal.Body>
//             <Textarea
//               label="Description"
//               value={selectedSection?.description || ""}
//               onChange={(e) => setSelectedSection({ ...selectedSection, description: e.target.value })}
//               rows={4}
//               placeholder="Update description"
//               className="mb-4"
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button color="error" variant="flat" onPress={onOpenChange}>
//               Close
//             </Button>
//             <Button color="gradient" onPress={() => updateAbout(selectedSection.id)}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal.Content>
//       </Modal>

//       {/* Edit Skill Modal */}
//       <Modal isOpen={isSkillOpen} onOpenChange={onSkillOpenChange} placement="top-center">
//         <Modal.Content>
//           <Modal.Header className="text-xl font-semibold">Edit Skill</Modal.Header>
//           <Modal.Body>
//             <Input
//               name="skill"
//               label="Skill"
//               value={selectedSkill?.skill || ""}
//               onChange={handleSkillChange}
//               className="mb-4"
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button color="error" variant="flat" onPress={onSkillOpenChange}>
//               Close
//             </Button>
//             <Button color="gradient" onPress={() => updateSkill(selectedSkill._id)}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal.Content>
//       </Modal>
//     </div>
//   );
// }

// export default About;
