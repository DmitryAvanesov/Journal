const fs = require("fs");
const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const User = mongoose.model("User");
const Submission = mongoose.model("Submission");
const Image = mongoose.model("Image");

router.post("/sign-up", auth.optional, async (req, res, _next) => {
  const {
    body: { user },
  } = req;

  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  if (!user.confirmPassword) {
    return res.status(422).json({
      errors: {
        confirmPassword: "is required",
      },
    });
  }

  if (user.password !== user.confirmPassword) {
    return res.status(422).json({
      errors: {
        confirmPassword: "is not equal to password",
      },
    });
  }

  const existingUser = await User.findOne({ username: user.username });

  if (existingUser) {
    return res.status(422).json({
      errors: {
        username: "is already used",
      },
    });
  }

  const finalUser = new User(user);
  finalUser.setPassword(user.password, user.confirmPassword);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post("/log-in", auth.optional, (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, _info) => {
      if (err || !passportUser) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(400).info;
    }
  )(req, res, next);
});

router.get("/current", auth.required, async (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const user = await User.findById(id);
  if (!user) {
    return res.sendStatus(400);
  }
  return res.json({ user: user.toAuthJSON() });
});

router.get("/by-id", (req, res, _next) => {
  const { id } = req.query;

  User.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(404).json();
    }

    return res.json({ id: user._id, username: user.username });
  });
});

router.delete("/delete", auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  const submissionPath = "./uploads";
  const imagePath = "./images";

  User.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(404).json();
    }

    Image.findOneAndDelete({ user: id }, (err, image) => {
      if (err) {
        return res.status(404).json();
      }

      if (image) {
        fs.unlink(`${imagePath}/${image.name}`, (err) => {
          if (err) {
            return res.status(404).json();
          }
        });
      }

      Submission.find({ user: id }, (err, submissions) => {
        if (err) {
          return res.status(404).json();
        }

        if (submissions.length) {
          for (const [index, value] of submissions.entries()) {
            Submission.findOneAndDelete({ user: value.user }, (err) => {
              if (err) {
                return res.status(404).json();
              }

              fs.rmdir(
                `${submissionPath}/${value.number}`,
                { recursive: true },
                (err) => {
                  if (err) {
                    return res.status(404).json();
                  }

                  if (index === submissions.length - 1) {
                    return res.json();
                  }
                }
              );
            });
          }
        } else {
          return res.json();
        }
      });
    });
  });
});

module.exports = router;
