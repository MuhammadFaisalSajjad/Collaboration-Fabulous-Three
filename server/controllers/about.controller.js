const About = require("../models/about.model");

//Create
const postAbout = async (req, res) => {
  try {
    const about = await About.create(req.body);
    res
      .status(200)
      .json({ message: "About section created successfully", data: about });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create about section",
      error: error.message,
      data: [],
    });
  }
};

//Read
const getAbout = async (req, res) => {
  try {
    const about = await About.find({});
    res.status(200).json({ message: "Data fetched successfully", data: about });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch data",
      error: error.message,
      data: [],
    });
  }
};

//Update
const putAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndUpdate(id, req.body);
    if (!about) {
      return res
        .status(404)
        .json({ message: "About section not found", data: [] });
    }
    const updatedData = await About.find({});
    res.status(200).json({
      message: "About section updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update data",
      error: error.message,
      data: [],
    });
  }
};

//Delete
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndDelete(id);
    if (!about) {
      return res.status(404).json({ message: "No data found", data: [] });
    }
    const updatedData = await About.find({});
    res.status(200).json({
      message: "Data deleted successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete data",
      error: error.message,
      data: [],
    });
  }
};

module.exports = { postAbout, getAbout, putAbout, deleteAbout };
