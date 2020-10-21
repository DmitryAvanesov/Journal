const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../auth");

const Issue = mongoose.model("Issue");
const User = mongoose.model("User");
const Submission = mongoose.model("Submission");
const Cover = mongoose.model("Cover");
const downloadPath = "./covers";

router.post("/publish", auth.required, (req, res, _next) => {
  const {
    payload: { id },
    body: { number, year, submissions },
  } = req;

  User.findById(id, (err, user) => {
    if (err) {
      return res.status(404).json();
    }

    if (user.role !== "editor" && user.role !== "admin") {
      return res.status(403).json();
    }

    for (const submission of submissions) {
      Submission.findByIdAndUpdate(
        submission.id,
        { status: "published", title: submission.title },
        { new: true },
        (err, _submission) => {
          if (err) {
            return res.status(404).json();
          }
        }
      );
    }

    const issue = {
      number,
      year,
      submissions: submissions.map((value) => value.id),
    };

    const finalIssue = new Issue(issue);
    finalIssue.save();

    return res.json(finalIssue);
  });
});

router.patch("/cover", auth.required, (req, res, _next) => {
  const { id } = req.query;

  console.log("COVER IS", req.files.cover);

  Issue.findByIdAndUpdate(id, {}, { new: true }, (err, issue) => {
    if (err || !issue) {
      return res.status(404).json();
    }
  });
});

router.get("/issues", (req, res, _next) => {
  const issuesWithSubmissions = [];

  Issue.find((err, issues) => {
    if (err) {
      return res.status(404).json();
    }

    for (const issue of issues) {
      const submissions = [];

      for (submissionId of issue.submissions) {
        Submission.findById(submissionId, (err, submission) => {
          if (err) {
            return res.status(404).json();
          }

          submissions.push({
            manuscript: submission.manuscript,
            about: submission.about,
            title: submission.title,
          });

          if (submissions.length === issue.submissions.length) {
            const issueWithSubmissions = {
              number: issue.number,
              year: issue.year,
              submissions: submissions,
            };

            Cover.find({ issue: issue.id }, (err, cover) => {
              if (err || !cover.length) {
                fs.readFile(`${downloadPath}/0.png`, (err, data) => {
                  if (err) {
                    return res.status(404).json();
                  }

                  issueWithSubmissions.cover = data;
                  issuesWithSubmissions.push(issueWithSubmissions);

                  if (issuesWithSubmissions.length === issues.length) {
                    return res.json(issuesWithSubmissions);
                  }
                });
              } else {
                fs.readFile(`${downloadPath}/${cover.name}`, (err, data) => {
                  if (err) {
                    return res.status(404).json();
                  }

                  issueWithSubmissions.cover = data;
                  issuesWithSubmissions.push(issueWithSubmissions);

                  if (issuesWithSubmissions.length === issues.length) {
                    return res.json(issuesWithSubmissions);
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

module.exports = router;
