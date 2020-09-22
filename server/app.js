const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const user = require("./models/User");

const app = express();
const port = 3000;

app.use(cors());
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "mongodb+srv://admin:7CEWSY9f5y7xUQYR@cluster0.n2gtl.gcp.mongodb.net/Journal?retryWrites=true&w=majority"
);
mongoose.set("debug", true);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
