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
  Textarea,
  Image,
  avatar,
} from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

function Home() {
  const [profile, setProfile] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/profile");
        const profile = await response.json();
        if (Array.isArray(profile.data)) {
          setProfile(profile.data);
          console.log("Profile Data: ", profile.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const openModal = (profile) => {
    setSelectedProfile(profile);
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files.length > 0) {
      setAvatar(files[0]);
    } else if (name === "description") {
      // Trim each entry to remove extra spaces
      const descriptionArray = value.split(",").map((item) => item.trim());
      setSelectedProfile((current) => ({
        ...current,
        description: descriptionArray,
      }));
    } else {
      setSelectedProfile((current) => ({
        ...current,
        [name]: value,
      }));
    }
  };

  const onUpdate = async (id) => {
    try {
      const formData = new FormData();

      for (let key in selectedProfile) {
        formData.append(key, selectedProfile[key]);
      }

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const updatedProfile = await axios.put(
        `http://localhost:8080/api/profile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (Array.isArray(updatedProfile.data)) {
        setProfile(updatedProfile.data);
      }

      alert("Profile Updated Successfully");
    } catch (error) {
      alert("Something went wrong. Couldn't update profile");
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
        <div className="text-center">
          {profile.map((data) => (
            <div key={data._id}>
              <img
                src={data.avatar}
                alt="Profile"
                className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-teal-500"
              />
              <h2 className="text-4xl font-extrabold mb-2 text-white">
                {data.name}
              </h2>
              <p className="text-lg mb-4 text-white">
                {Array.isArray(data.description)
                  ? data.description.join(", ")
                  : data.description
                      .split(",")
                      .map((item) => item.trim().join(", "))}
              </p>
              <Button
                onClick={() => openModal(data)}
                color="gradient"
                className="text-white"
              >
                <FaEdit /> Edit
              </Button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProfile ? (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-xl font-semibold">
                    Edit Profile
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Name"
                      name="name"
                      type="text"
                      variant="bordered"
                      value={selectedProfile.name}
                      onChange={handleInputChange}
                    />
                    <Textarea
                      label="Description"
                      name="description"
                      type="text"
                      variant="bordered"
                      value={
                        selectedProfile.description
                          ? selectedProfile.description.join(", ")
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                    <Image
                      alt={selectedProfile.name}
                      className="object-cover rounded-xl"
                      src={selectedProfile.avatar}
                      width={270}
                    />
                    <input
                      id="file-input"
                      type="file"
                      name="avatar"
                      onChange={handleInputChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="error" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="gradient"
                      onPress={onClose}
                      onClick={() => {
                        onUpdate(selectedProfile._id);
                      }}
                    >
                      Save Changes
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Home;
