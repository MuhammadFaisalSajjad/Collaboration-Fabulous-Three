const mongoose = require("mongoose");

const dbConnection = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log("Error in Database Connection\n", error);
    });
};

module.exports = dbConnection;
