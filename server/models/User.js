const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = hashPassword(password);
};

UserSchema.methods.passwordIsValid = function (password) {
  const hash = hashPassword(password);
  return this.hash === hash;
};

function hashPassword(password) {
  return crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
}

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this.id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "secret"
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this.id,
    username: this.username,
    token: this.generateJWT(),
  };
};

mongoose.model("User", UserSchema);
