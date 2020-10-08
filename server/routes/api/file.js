const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const fileDownload = require("js-file-download");
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

      return res.json();
    });
  }
});

router.get("/user-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const submissions = [];

  UserSubmission.find({ user: id }, (_err, userSubmissions) => {
    for (const userSubmission of userSubmissions) {
      const curSubmission = {
        number: userSubmission.number,
        files: [],
      };

      fs.readdir(`${uploadPath}/${userSubmission.number}`, (_err, files) => {
        for (const file of files) {
          curSubmission.files.push(file);

          if (curSubmission.files.length === numberOfSubmissionFiles) {
            submissions.push(curSubmission);
          }

          if (submissions.length === userSubmissions.length) {
            return res.json(submissions);
          }
        }
      });
    }
  });
});

router.get("/download", (req, res, _next) => {
  const { submission, name } = req.query;
  const path = `${uploadPath}/${submission}/${name}`;

  fs.readFile(path, (err, data) => {
    fileDownload(data);
  });
  return res.json();
});

module.exports = router;
