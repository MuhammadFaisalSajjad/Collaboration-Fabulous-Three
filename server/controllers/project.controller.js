const Project = require("../models/project.model");
var fs = require("fs");
var path = require("path");

//Create
const postProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    const project = await Project.create({
      title,
      description,
      image,
    });

    res
      .status(200)
      .json({ message: "Project created successfully", data: project });
  } catch (error) {
    res.status(500).json({
      message: "Project created successfully",
      error: error.message,
      data: [],
    });
  }
};

//Read
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});

    // Convert image data to base64
    const formattedProjects = projects.map((project) => {
      const imageBase64 = project.image.data.toString("base64");
      return {
        ...project._doc,
        image: `data:${project.image.contentType};base64,${imageBase64}`, // Construct the full data URL here
      };
    });

    res.status(200).json({
      message: "Data Fetched Successfully",
      data: formattedProjects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in Fetching Data",
      error: error.message,
      data: [],
    });
  }
};

//Update
const putProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedData = { title, description };
    if (req.file) {
      updatedData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const project = await Project.findByIdAndUpdate(id, updatedData);

    if (!project) {
      res.status(404).json({
        message: "No Project found",
        data: [],
      });
    }

    const updatedProject = await Project.find({});

    res.status(200).json({
      message: "Project Updated Successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't Update the Project",
      error: error.message,
      data: [],
    });
  }
};

//Delete
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
        data: [],
      });
    }
    const updatedProjectList = await Project.find({});
    res.status(200).json({
      message: "Project Deleted Successfully",
      data: updatedProjectList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't Delete Project",
      error: error.message,
      data: [],
    });
  }
};

module.exports = { postProject, getProjects, putProject, deleteProject };
