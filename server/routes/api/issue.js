const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const auth = require("../auth");

const Issue = mongoose.model("Issue");
const User = mongoose.model("User");
const uploadPath = "./covers";

router.post("/publish", auth.required, (req, res, _next) => {
  const {
    payload: { id },
    body: { number, year, submissions },
  } = req;

  User.findById(id, (err, user) => {
    if (user.role !== "editor" && user.role !== "admin") {
      return res.status(403).json();
    }

    const issue = {
      number,
      year,
      submissions,
    };

    const finalIssue = new Issue(issue);
    finalIssue.save();

    return res.json(finalIssue);
  });
});

module.exports = router;
