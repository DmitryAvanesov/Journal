const router = require("express").Router();
const fs = require("fs");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { v4: uuidv4 } = require("uuid");
const auth = require("../auth");

const UserSubmission = mongoose.model("UserSubmission");
const File = mongoose.model("File");
mongoose.set("useCreateIndex", true);
Grid.mongo = mongoose.mongo;

const submissionIds = [];

router.post("/submission", auth.required, async (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  if (!req.files) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    saveFile(req.files.manuscript, id);
    saveFile(req.files.about, id);
    saveFile(req.files.agreement, id);
    saveFile(req.files.anonymous, id);

    return res.send({
      success: true,
    });
  }
});

const saveFile = (file, userId) => {
  const filename = `${file.name} ${uuidv4()}`;

  const writeStream = Grid(mongoose.connection.db).createWriteStream({
    filename,
  });

  fs.createReadStream(file.tempFilePath).pipe(writeStream);

  writeStream.on("finish", () => {
    File.findOne({ filename }, (_err, res) => {
      submissionIds.push(mongoose.Types.ObjectId(res.id));

      if (submissionIds.length === 4) {
        const userSubmission = {
          user: mongoose.Types.ObjectId(userId),
          submission: submissionIds,
        };

        const finalUserSubmission = new UserSubmission(userSubmission);
        finalUserSubmission.save();
      }
    });
  });
};

module.exports = router;
