const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const uploadPath = "./uploads/";
Grid.mongo = mongoose.mongo;
mongoose.set("useCreateIndex", true);

router.post("/submission", (req, res, _next) => {
  if (!req.files) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    saveFile(req.files.manuscript);
    saveFile(req.files.about);
    saveFile(req.files.agreement);
    saveFile(req.files.anonymous);

    return res.send({
      success: true,
    });
  }
});

const saveFile = (file) => {
  const writeStream = Grid(mongoose.connection.db).createWriteStream({
    filename: file.name,
  });
  fs.createReadStream(file.tempFilePath).pipe(writeStream);
};

module.exports = router;
