const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const session = require("express-session");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Constants and middlewares

const app = express();
const port = 3000;

app.use(cors());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("morgan")("dev"));
app.use(
  session({
    secret: "journal",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Database connection

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.n2gtl.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);

// Models and routes

require("./models/User");
require("./models/Submission");
require("./models/Image");
require("./config/password");
app.use(require("./routes"));

// Config

mongoose.promise = global.Promise;
const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  app.use(errorHandler());

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// Listening to the port

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

app.get("/", (_req, res) => {
  res.send("The server is working");
});
