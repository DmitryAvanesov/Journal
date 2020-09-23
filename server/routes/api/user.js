const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const User = mongoose.model("User");

router.post("/sign-up", auth.optional, (req, res, _next) => {
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
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return status(400).info;
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

module.exports = router;
