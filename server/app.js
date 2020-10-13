const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const session = require("express-session");

// Constants and middlewares

const app = express();
const port = 3000;

app.use(cors());
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// Database connection

const username = "Work";
const password = "hns4kwy58is89LK";
const dbname = "journal";

const connectionString = `mongodb+srv://${username}:${password}@cluster0.n2gtl.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);

// Models and routes

require("./models/User");
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
