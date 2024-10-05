// const mongoose = require("mongoose");

// const dbConnection = (uri) => {
//   mongoose
//     .connect(uri)
//     .then(() => {
//       console.log("Database Connected Successfully");
//     })
//     .catch((error) => {
//       console.log("Error in Database Connection\n", error);
//     });
// };

// module.exports = dbConnection;

// 2nd Code from CHAT-GPT

// const mongoose = require("mongoose");

// const dbConnection = (uri) => {
//   mongoose
//     .connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Database Connected Successfully");
//     })
//     .catch((error) => {
//       console.log("Error in Database Connection\n", error);
//     });
// };

// module.exports = dbConnection;


// Code from ChatGpt

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
