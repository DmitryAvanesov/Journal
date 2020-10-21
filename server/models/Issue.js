const mongoose = require("mongoose");

const { Schema } = mongoose;

const IssueSchema = new Schema({
  number: Number,
  year: Number,
  cover: { type: String, required: false },
  submissions: [mongoose.Schema.Types.ObjectId],
});

mongoose.model("Issue", IssueSchema);
