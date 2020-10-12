const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../auth");

const UserImage = mongoose.model("UserImage");
const uploadPath = "./images";

router.post("/upload", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  if (!req.files) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    fs.readdir(uploadPath, (_err, images) => {
      const numberOfImages =
        images.reduce(
          (previousValue, currentValue) =>
            parseInt(currentValue) > previousValue
              ? parseInt(currentValue)
              : previousValue,
          0
        ) + 1;

      req.files.image.mv(
        `${uploadPath}/${numberOfImages}.${req.files.image.name
          .split(".")
          .pop()}`
      );

      const userImage = {
        user: mongoose.Types.ObjectId(id),
        number: numberOfImages,
      };

      const finalUserImage = new UserImage(userImage);
      finalUserImage.save();

      return res.json();
    });
  }
});

router.get("/download", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  UserImage.find({ user: id }, (_err, image) => {
    fs.readFile(`${uploadPath}/${image.number}.png`, (err, data) => {
      return res.json(data);
    });
  });
});

module.exports = router;
