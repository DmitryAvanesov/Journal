const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../auth");

const Image = mongoose.model("Image");
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
    Image.findOne({ user: id }, async (_err, image) => {
      if (image) {
        await Image.deleteOne({ user: id }, (_err) => {
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

        const image = {
          user: mongoose.Types.ObjectId(id),
          name: `${numberOfImages}.${extension}`,
        };

        const finalImage = new Image(image);
        finalImage.save();

        return res.json();
      });
    });
  }
});

router.get("/download", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  Image.findOne({ user: id }, (err, image) => {
    if (err || !image) {
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

  Image.findOne({ user: id }, (_err, image) => {
    if (image) {
      Image.deleteOne({ user: id }, (_err) => {
        fs.unlink(`${uploadPath}/${image.name}`, (_err) => {
          return res.json();
        });
      });
    }
  });
});

module.exports = router;
