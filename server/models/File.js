const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema({
  name: {
    type: String,
  },
});

mongoose.model("File", FileSchema, "fs.files");
