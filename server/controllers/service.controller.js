const Service = require("../models/service.model");

// Create
const postService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const service = await Service.create({ title, description });
    res.status(200).json({
      message: "Service Created successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating service",
      error: error.message,
      data: [],
    });
  }
};

// Read
const getService = async (req, res) => {
  try {
    const service = await Service.find({});
    res.status(200).json({
      message: "Services fetched Successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot Fetch data",
      error: error.message,
      data: [],
    });
  }
};

// Update
const putService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body);
    if (!service) {
      res.status(404).json({
        message: "Service Not found",
        data: [],
      });
    }
    res.status(200).json({
      message: "Service Updated Successfully",
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot Update data",
      error: error.message,
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
      error: error.message,
      data: [],
    });
  }
};

module.exports = { postService, getService, putService, deleteService };
