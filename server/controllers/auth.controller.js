const Auth = require("../models/auth.model");

//Create
const postAuth = async (req, res) => {
  try {
    const authentication = await Auth.create(req.body);
    res.status(200).json({
      message: "Authentication created successfully",
      data: authentication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in Authentication creation",
      data: error,
    });
  }
};

//Read
const getAuths = async (req, res) => {
  try {
    const authentication = await Auth.find({});
    res.status(200).json({
      message: "Data fetched successfully",
      data: authentication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching data",
      data: error,
    });
  }
};

//Update
const putAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const authentication = await Auth.findByIdAndUpdate(id, req.body);
    if (!authentication) {
      res.status(500).json({
        message: "Auth with this ID not found",
        data: [],
      });
    }
    const updatedAuthentication = await Auth.find({});
    res.status(200).json({
      message: "Authentication updated successfully",
      data: updatedAuthentication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in Updating data",
      data: error,
    });
  }
};

//Delete
const deleteAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const authentication = await Auth.findByIdAndDelete(id);
    if (!authentication) {
      res.status(500).json({
        message: "Auth with this ID not found",
        data: [],
      });
    }
    const updatedAuthentication = await Auth.find({});
    res.status(200).json({
      message: "Authentication Deleted successfully",
      data: updatedAuthentication,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in Deleting data",
      data: error,
    });
  }
};

module.exports = { postAuth, getAuths, putAuth, deleteAuth };
