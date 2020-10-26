const express = require("express");

const router = express.Router();
router.use("/user", require("./user"));
router.use("/file", require("./file"));
router.use("/image", require("./image"));
router.use("/issue", require("./issue"));

module.exports = router;
