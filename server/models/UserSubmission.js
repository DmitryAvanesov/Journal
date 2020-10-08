const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSubmissionSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  number: Number,
});

mongoose.model("UserSubmission", UserSubmissionSchema);
