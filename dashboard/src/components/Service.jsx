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
  Textarea,
  CardFooter,
} from "@nextui-org/react";
import { VscAdd } from "react-icons/vsc";

const Service = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Modal state control
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch all services from backend
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/services");
      setServices(response.data.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  // Open update modal
  const openUpdateModal = (service) => {
    setSelectedService(service);
    setTitle(service.title);
    setDescription(service.description);
    onOpen();
  };

  // Open add modal
  const openAddModal = () => {
    setSelectedService(null);
    setTitle("");
    setDescription("");
    onOpen();
  };

  // Add new service
  const addService = async () => {
    try {
      const newService = { title, description };
      await axios.post("http://localhost:8080/api/services", newService);
      alert("Service Added Successfully");
      onOpenChange(); // Close modal
      fetchServices(); // Refresh services
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to add service");
    }
  };

  // Update service
  const updateService = async (id) => {
    try {
      const updatedService = { title, description };
      await axios.put(
        `http://localhost:8080/api/services/${id}`,
        updatedService
      );
      alert("Service Updated Successfully");
      onOpenChange(); // Close modal
      fetchServices(); // Refresh services
    } catch (error) {
      console.error(error);
      alert("Failed to update service");
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/services/${id}`);
      alert("Service Deleted Successfully");
      fetchServices(); // Refresh services
    } catch (error) {
      console.error(error);
      alert("Failed to delete service");
    }
  };

  return (
    <React.Fragment>
      <div className="p-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Services
        </h2>
        <Button color="primary" className="mb-3" onClick={openAddModal}>
          <VscAdd /> Add Service
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <Card
                key={service._id}
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
              >
                <CardHeader>
                  <h4 className="text-xl font-semibold text-white">
                    {service.title}
                  </h4>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-300 mt-2">{service.description}</p>
                </CardBody>
                <CardFooter className="flex gap-2">
                  <Button
                    color="success"
                    className="text-white"
                    onClick={() => openUpdateModal(service)}
                  >
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-400">No Service Found</p>
          )}
        </div>
      </div>

      {/* Add/Update Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedService ? "Update Service" : "Add Service"}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="bordered"
                />
                <Textarea
                  label="Description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-700 text-white"
                  onClick={
                    selectedService
                      ? () => updateService(selectedService._id)
                      : addService
                  }
                >
                  {selectedService ? "Save Changes" : "Add Service"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default Service;
