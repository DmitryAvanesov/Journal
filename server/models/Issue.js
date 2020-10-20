const mongoose = require("mongoose");

const { Schema } = mongoose;

const IssueSchema = new Schema({
  number: Number,
  year: Number,
  submissions: [mongoose.Schema.Types.ObjectId],
});

mongoose.model("Issue", IssueSchema);
