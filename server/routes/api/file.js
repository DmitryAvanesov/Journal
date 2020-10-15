const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../auth");

const Submission = mongoose.model("Submission");
const User = mongoose.model("User");
const uploadPath = "./uploads";
mongoose.set("useCreateIndex", true);

router.post("/submission", auth.required, (req, res, _next) => {
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
      const numberOfFolders =
        folders.reduce(
          (previousValue, currentValue) =>
            parseInt(currentValue) > previousValue
              ? parseInt(currentValue)
              : previousValue,
          0
        ) + 1;

      const manuscriptName = req.files.manuscript.name;
      const aboutName = req.files.about.name;
      const agreementName = req.files.agreement.name;
      const anonymousName = req.files.anonymous.name;

      fs.mkdir(`${uploadPath}/${numberOfFolders}`, (_err) => {
        req.files.manuscript.mv(
          `${uploadPath}/${numberOfFolders}/${manuscriptName}`
        );
        req.files.about.mv(`${uploadPath}/${numberOfFolders}/${aboutName}`);
        req.files.agreement.mv(
          `${uploadPath}/${numberOfFolders}/${agreementName}`
        );
        req.files.anonymous.mv(
          `${uploadPath}/${numberOfFolders}/${anonymousName}`
        );
      });

      User.find({ role: "reviewer" }, (_err, users) => {
        const userSubmission = {
          user: mongoose.Types.ObjectId(id),
          number: numberOfFolders,
          manuscript: manuscriptName,
          about: aboutName,
          agreement: agreementName,
          anonymous: anonymousName,
          reviewer: mongoose.Types.ObjectId(
            users[Math.floor(Math.random(users.length))].id
          ),
          status: "under consideration",
        };

        const finalUserSubmission = new Submission(userSubmission);
        finalUserSubmission.save();

        return res.json();
      });
    });
  }
});

router.get("/user-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const submissions = [];

  Submission.find({ user: id }, (_err, userSubmissions) => {
    for (const userSubmission of userSubmissions) {
      submissions.push({
        number: userSubmission.number,
        manuscript: userSubmission.manuscript,
        about: userSubmission.about,
        agreement: userSubmission.agreement,
        anonymous: userSubmission.anonymous,
        status: userSubmission.status,
      });

      if (submissions.length === userSubmissions.length) {
        return res.json(submissions);
      }
    }
  });
});

router.get("/reviewer-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const submissions = [];

  Submission.find({ reviewer: id }, (_err, reviewerSubmissions) => {
    for (const reviewerSubmission of reviewerSubmissions) {
      submissions.push({
        number: reviewerSubmission.number,
        manuscript: reviewerSubmission.manuscript,
        about: reviewerSubmission.about,
        agreement: reviewerSubmission.agreement,
        anonymous: reviewerSubmission.anonymous,
        status: reviewerSubmission.status,
      });

      if (submissions.length === reviewerSubmissions.length) {
        return res.json(submissions);
      }
    }
  });
});

router.get("/download", (req, res, _next) => {
  const { submission, name } = req.query;
  const path = `${uploadPath}/${submission}/${name}`;
  return res.download(path, name);
});

module.exports = router;
