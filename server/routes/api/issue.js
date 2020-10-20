const router = require("express").Router();
const { fn } = require("@angular/compiler/src/output/output_ast");
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../auth");

const Issue = mongoose.model("Issue");
const User = mongoose.model("User");
const Submission = mongoose.model("Submission");
const uploadPath = "./covers";

router.post("/publish", auth.required, (req, res, _next) => {
  const {
    payload: { id },
    body: { number, year, submissions },
  } = req;

  console.log(submissions);

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

module.exports = router;
