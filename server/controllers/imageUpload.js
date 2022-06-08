const multer = require("multer");

exports.imageUpload = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, res, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
};
