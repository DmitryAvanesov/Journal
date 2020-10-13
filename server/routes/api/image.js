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
    UserImage.findOne({ user: id }, async (_err, image) => {
      if (image) {
        await UserImage.deleteOne({ user: id }, (_err) => {
          fs.unlink(`${uploadPath}/${image.name}`, (_err) => {});
        });
      }

      fs.readdir(uploadPath, (_err, images) => {
        const numberOfImages =
          images.reduce(
            (previousValue, currentValue) =>
              parseInt(currentValue) > previousValue
                ? parseInt(currentValue)
                : previousValue,
            0
          ) + 1;
        const extension = `${req.files.image.name.split(".").pop()}`;

        req.files.image.mv(`${uploadPath}/${numberOfImages}.${extension}`);

        const userImage = {
          user: mongoose.Types.ObjectId(id),
          name: `${numberOfImages}.${extension}`,
        };

        const finalUserImage = new UserImage(userImage);
        finalUserImage.save();

        return res.json();
      });
    });
  }
});

router.get("/download", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  UserImage.findOne({ user: id }, (_err, image) => {
    if (_err || !image) {
      fs.readFile(`${uploadPath}/0.png`, (_err, data) => {
        return res.json(data);
      });
    } else {
      fs.readFile(`${uploadPath}/${image.name}`, (_err, data) => {
        return res.json(data);
      });
    }
  });
});

router.delete("/delete", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  UserImage.findOne({ user: id }, (_err, image) => {
    if (image) {
      UserImage.deleteOne({ user: id }, (_err) => {
        fs.unlink(`${uploadPath}/${image.name}`, (_err) => {
          return res.json();
        });
      });
    }
  });
});

module.exports = router;
