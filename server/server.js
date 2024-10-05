
require("dotenv").config();
const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnection = require("./database/database");

const app = express();
const port = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGO_URI;

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//DB Connection
dbConnection(MONGODB_URI);

//API Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to Backend");
});

app.use("/api", routes);

//Initializing Server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
