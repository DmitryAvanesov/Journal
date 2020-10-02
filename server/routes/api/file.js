const mongoose = require("mongoose");
const router = require("express").Router();
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({
  storage: storage,
});

router.post("/submission", upload.single("image"), (req, res, _next) => {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    console.log("File is available!");
    return res.send({
      success: true,
    });
  }
});

module.exports = router;
