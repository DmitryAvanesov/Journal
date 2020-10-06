const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSubmissionSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  submission: [mongoose.Schema.Types.ObjectId],
});

mongoose.model("UserSubmission", UserSubmissionSchema);
