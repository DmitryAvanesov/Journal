const mongoose = require("mongoose");

const { Schema } = mongoose;

const CoverSchema = new Schema({
  issue: mongoose.Schema.Types.ObjectId,
  name: String,
});

mongoose.model("Cover", CoverSchema);
