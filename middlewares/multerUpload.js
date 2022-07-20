const fs = require("fs");
const multer = require("multer");

fileStorageEngine = multer.diskStorage({
	destination: "./tmp/",
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	}
});

module.exports = multer({ storage: fileStorageEngine });
