const mongoose = require("mongoose");

const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  number: Number,
  manuscript: String,
  about: String,
  agreement: String,
  anonymous: String,
  reviewer: mongoose.Schema.Types.ObjectId,
  status: String,
});

mongoose.model("Submission", SubmissionSchema);
