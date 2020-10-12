const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserImageSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  number: Number,
});

mongoose.model("UserImage", UserImageSchema);
