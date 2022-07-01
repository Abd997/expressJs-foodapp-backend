const fs = require("fs");
const multer = require("multer");

fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync("./temp-storage")) {
			fs.mkdirSync("./temp-storage");
		}
		cb(null, "./temp-storage");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "--" + file.originalname);
	}
});

module.exports = multer({ storage: fileStorageEngine });
