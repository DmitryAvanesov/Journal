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
    fs.readdir(uploadPath, (err, folders) => {
      if (err) {
        return res.status(404).json();
      }

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

      fs.mkdir(`${uploadPath}/${numberOfFolders}`, (err) => {
        if (err) {
          return res.status(404).json();
        }

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

      User.find({ role: "reviewer" }, (err, users) => {
        if (err) {
          return res.status(404).json();
        }

        const userSubmission = {
          user: mongoose.Types.ObjectId(id),
          number: numberOfFolders,
          manuscript: manuscriptName,
          about: aboutName,
          agreement: agreementName,
          anonymous: anonymousName,
          reviewer: mongoose.Types.ObjectId(
            users.filter((value) => value._id !== id)[
              Math.floor(Math.random(users.length - 1))
            ].id
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

router.get("/submission-by-number", (req, res, _next) => {
  const { number } = req.query;

  Submission.findOne({ number }, (err, submission) => {
    if (err) {
      return res.status(404).json();
    }

    User.findById(submission.user, (err, user) => {
      if (err) {
        return res.status(404).json();
      }

      return res.json({
        number: submission.number,
        manuscript: submission.manuscript,
        title: submission.title,
        author: {
          id: user._id,
          username: user.username,
        },
      });
    });
  });
});

router.get("/user-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const submissions = [];

  Submission.find({ user: id }, (err, userSubmissions) => {
    if (err) {
      return res.status(404).json();
    }

    for (const userSubmission of userSubmissions) {
      submissions.push({
        id: userSubmission._id,
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

  Submission.find({ reviewer: id }, (err, reviewerSubmissions) => {
    if (err) {
      return res.status(404).json();
    }

    for (const reviewerSubmission of reviewerSubmissions) {
      submissions.push({
        id: reviewerSubmission._id,
        number: reviewerSubmission.number,
        anonymous: reviewerSubmission.anonymous,
        status: reviewerSubmission.status,
      });

      if (submissions.length === reviewerSubmissions.length) {
        return res.json(submissions);
      }
    }
  });
});

router.get("/editor-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  User.findById(id, (err, user) => {
    if (err || user.role !== "editor") {
      return res.status(404).json();
    }

    const submissions = [];

    Submission.find(
      { $or: [{ status: "accepted" }, { status: "scheduled" }] },
      (err, editorSubmissions) => {
        if (err) {
          return res.status(404).json();
        }

        for (const editorSubmission of editorSubmissions) {
          submissions.push({
            id: editorSubmission._id,
            number: editorSubmission.number,
            manuscript: editorSubmission.manuscript,
            about: editorSubmission.about,
            agreement: editorSubmission.agreement,
            anonymous: editorSubmission.anonymous,
            status: editorSubmission.status,
          });

          if (submissions.length === editorSubmissions.length) {
            return res.json(submissions);
          }
        }
      }
    );
  });
});

router.get("/publisher-submissions", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  User.findById(id, (err, user) => {
    if (err || user.role !== "editor") {
      return res.status(404).json();
    }

    const submissions = [];

    Submission.find({ status: "scheduled" }, (err, publisherSubmissions) => {
      if (err || !publisherSubmissions) {
        return res.status(404).json();
      }

      if (!publisherSubmissions.length) {
        return res.json(submissions);
      }

      for (const publisherSubmission of publisherSubmissions) {
        submissions.push({
          id: publisherSubmission._id,
          user: publisherSubmission.user,
          number: publisherSubmission.number,
          manuscript: publisherSubmission.manuscript,
          about: publisherSubmission.about,
          agreement: publisherSubmission.agreement,
          anonymous: publisherSubmission.anonymous,
          status: publisherSubmission.status,
        });

        console.log(submissions.length, publisherSubmissions.length);

        if (submissions.length === publisherSubmissions.length) {
          return res.json(submissions);
        }
      }
    });
  });
});

router.get("/download", auth.required, (req, res, _next) => {
  const { submission, name } = req.query;
  const path = `${uploadPath}/${submission}/${name}`;
  return res.download(path, name);
});

router.patch("/review", auth.required, (req, res, _next) => {
  const {
    body: { id, status },
  } = req;

  Submission.findByIdAndUpdate(
    id,
    { status },
    { new: true },
    (err, submission) => {
      if (err) {
        return res.status(404).json();
      }

      return res.json({
        id: submission._id,
        number: submission.number,
        anonymous: submission.anonymous,
        status: submission.status,
      });
    }
  );
});

router.patch("/schedule", auth.required, (req, res, _next) => {
  const {
    body: { id, reverse },
  } = req;

  Submission.findByIdAndUpdate(
    id,
    { status: reverse ? "accepted" : "scheduled" },
    { new: true },
    (err, submission) => {
      if (err) {
        return res.status(404).json();
      }

      return res.json({
        id: submission._id,
        number: submission.number,
        manuscript: submission.manuscript,
        about: submission.about,
        agreement: submission.agreement,
        anonymous: submission.anonymous,
        status: submission.status,
      });
    }
  );
});

module.exports = router;
