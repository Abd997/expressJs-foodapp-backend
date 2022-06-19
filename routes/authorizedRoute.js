const route = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const {
	handleUploadStory,
	handleGetStory
} = require("../controllers");
const { getStoryValidation } = require("../validation");

const fileStorageEngine = multer.diskStorage({
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

const upload = multer({ storage: fileStorageEngine });

route.post(
	"/upload-story",
	upload.single("image"),
	handleUploadStory
);

route.post("/story", getStoryValidation, handleGetStory);

module.exports = route;
