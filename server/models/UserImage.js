const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserImageSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  name: String,
});

mongoose.model("UserImage", UserImageSchema);
