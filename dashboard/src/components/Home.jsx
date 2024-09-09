// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
// } from "@nextui-org/react";

// function Home() {
//   const [profile, setProfile] = useState([]);
//   // For Modal
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="text-center">
//         <img
//           src={profile.avatar}
//           alt="Profile"
//           className="rounded-full w-32 h-32 mx-auto mb-4"
//         />
//         <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
//         <p className="mb-4">{profile.description}</p>
//         <Button onClick={onOpen} color="success" className="text-white">
//           Edit
//         </Button>
//       </div>
//       {/* Modal */}
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
//               <ModalBody>
//                 <Input
//                   autoFocus
//                   label="Email"
//                   placeholder="Enter your email"
//                   variant="bordered"
//                 />
//                 <Input
//                   label="Password"
//                   placeholder="Enter your password"
//                   type="password"
//                   variant="bordered"
//                 />
//                 <div className="flex py-2 px-1 justify-between"></div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="flat" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Sign in
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </React.Fragment>
//   );
// }

// export default Home;

// -----------------------------------------------------------------------------------------------------

// Web 3 type design

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

function Home() {
  const [profile, setProfile] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch profile data from API
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="text-center">
        <img
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-teal-500"
        />
        <h2 className="text-4xl font-extrabold mb-2">{profile.name || "Your Name"}</h2>
        <p className="text-lg mb-4 text-gray-600">{profile.description || "Profile description goes here."}</p>
        <Button onClick={onOpen} color="gradient" className="text-white">
          Edit Profile
        </Button>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-semibold">Edit Profile</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="error" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="gradient" onPress={onClose}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Home;

// ------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
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

// function Home() {
//   const [profile, setProfile] = useState({});
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Fetch profile data from API
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
//       <div className="text-center">
//         <img
//           src={profile.avatar || "https://via.placeholder.com/150"}
//           alt="Profile"
//           className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-blue-500"
//         />
//         <h2 className="text-3xl font-bold mb-2">{profile.name || "Your Name"}</h2>
//         <p className="text-lg mb-4 text-gray-700">{profile.description || "Profile description goes here."}</p>
//         <Button onClick={onOpen} color="gradient" className="text-white">
//           Edit Profile
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <Modal.Content>
//           <Modal.Header className="text-xl font-semibold">Edit Profile</Modal.Header>
//           <Modal.Body>
//             <Input
//               autoFocus
//               label="Email"
//               placeholder="Enter your email"
//               variant="bordered"
//               className="mb-4"
//             />
//             <Input
//               label="Password"
//               placeholder="Enter your password"
//               type="password"
//               variant="bordered"
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button color="error" variant="flat" onPress={onOpenChange}>
//               Close
//             </Button>
//             <Button color="gradient" onPress={onOpenChange}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal.Content>
//       </Modal>
//     </div>
//   );
// }

// export default Home;
