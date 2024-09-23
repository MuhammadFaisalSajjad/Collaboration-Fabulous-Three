import Service from "../models/service.model";

// Create
const postService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const icon = {
      type: req.body.buffer,
      contentType: req.body.mimetype,
    };

    const service = await Service.create({ title, description, icon });
    res.status(200).json({
      message: "Service Created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating service",
      error: message.error,
      data: [],
    });
  }
};

// Read
const getService = async (req, res) => {
  try {
    const service = await Service.find({});
    const formattedService = service.map((data) => {
      const formattedImage = data.icon.data.toString("base64");
      return {
        ...data._doc,
        icon: `data:${data.icon.contentType};base64,${formattedImage}`,
      };
    });
    res.status(200).json({
      message: "Services fetched Successfully",
      data: formattedService,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot Fetch data",
      error: message.error,
      data: [],
    });
  }
};

// Update
const putService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedService = { title, description };
    if (req.file) {
      updatedService.icon = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    const service = await Service.findByIdAndUpdate(id, updatedService);
    if (!service) {
      res.status(404).json({
        message: "Service Not found",
        data: [],
      });
    }
    res.status.json({
      message: "Service Updated Successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot Update data",
      error: message.error,
      data: [],
    });
  }
};

// Delete
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    res.status(200).json({
      message: "Service Deleted Successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot Delete data",
      error: message.error,
      data: [],
    });
  }
};

module.exports = { postService, getService, putService, deleteService };
