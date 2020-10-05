const mongoose = require("mongoose");
const router = require("express").Router();
const multer = require("multer");

const uploadPath = "./uploads/";

router.post("/submission", (req, res, _next) => {
  if (!req.files) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    req.files.fileKey.mv(`${uploadPath}/${req.files.fileKey.name}`);

    return res.send({
      success: true,
    });
  }
});

module.exports = router;
