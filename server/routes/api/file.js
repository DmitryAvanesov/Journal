const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { v4: uuidv4 } = require("uuid");
const auth = require("../auth");

const UserSubmission = mongoose.model("UserSubmission");
const uploadPath = "./uploads";
const numberOfSubmissionFiles = 4;
mongoose.set("useCreateIndex", true);
Grid.mongo = mongoose.mongo;

router.post("/submission", auth.required, async (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  if (!req.files) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    fs.readdir(uploadPath, (_err, folders) => {
      const numberOfFolders = folders.length;

      fs.mkdir(`${uploadPath}/${numberOfFolders}`, (_err) => {
        req.files.manuscript.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.manuscript.name}`
        );
        req.files.about.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.about.name}`
        );
        req.files.agreement.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.agreement.name}`
        );
        req.files.anonymous.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.anonymous.name}`
        );
      });

      const userSubmission = {
        user: mongoose.Types.ObjectId(id),
        number: numberOfFolders,
      };

      const finalUserSubmission = new UserSubmission(userSubmission);
      finalUserSubmission.save();

      return;
    });
  }
});

router.get("/user-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const buffers = [];

  UserSubmission.find({ user: id }, (_err, userSubmissions) => {
    for (const userSubmission of userSubmissions) {
      const curBuffers = [];

      fs.readdir(`${uploadPath}/${userSubmission.number}`, (_err, files) => {
        for (const file of files) {
          fs.readFile(
            `${uploadPath}/${userSubmission.number}/${file}`,
            (_err, data) => {
              curBuffers.push({
                name: file,
                content: data,
              });

              if (curBuffers.length === numberOfSubmissionFiles) {
                buffers.push(curBuffers);
              }

              if (buffers.length === userSubmissions.length) {
                return res.json(buffers);
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
