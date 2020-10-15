const mongoose = require("mongoose");

const { Schema } = mongoose;

const ImageSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  name: String,
});

mongoose.model("Image", ImageSchema);
