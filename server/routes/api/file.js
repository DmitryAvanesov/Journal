const router = require("express").Router();
const fs = require("fs");

const uploadPath = "./uploads/";

router.post("/submission", (req, res, _next) => {
  if (!req.files) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    fs.readdir(uploadPath, (_err, folders) => {
      const numberOfFolders = folders.length;
      console.log(req);

      fs.mkdir(`${uploadPath}/${numberOfFolders}`, (_err) => {
        req.files.manuscript.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.manuscript.name}`
        );
        req.files.about.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.about.name}`
        );
        req.files.agreement.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.agreement.name}`
        );
        req.files.anonymous.mv(
          `${uploadPath}/${numberOfFolders}/${req.files.anonymous.name}`
        );
      });
    });

    return res.send({
      success: true,
    });
  }
});

module.exports = router;
