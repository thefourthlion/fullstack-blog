const router = require("express").Router();

const { imageUpload } = require("../controllers/imageUpload");

router.route("/").post(imageUpload);

module.exports = router;
