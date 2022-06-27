const route = require("express").Router();
const multer = require("multer");
const {
	handleUploadStory,
	handleGetStory,
	handleUploadPost,
	handleGetPost,
	handleExtraDetailsRequest
} = require("../controllers");
const {
	getStoryValidation,
	extraDetailsValidation
} = require("../validation");
const { fileStorageEngine } = require("./utils");

const upload = multer({ storage: fileStorageEngine });

route.post(
	"/upload-story",
	upload.single("image"),
	handleUploadStory
);

route.post("/story", getStoryValidation, handleGetStory);

route.post("/upload-post", upload.single("image"), handleUploadPost);

route.post("/post", handleGetPost);

route.post(
	"/register-extra-details",
	extraDetailsValidation,
	handleExtraDetailsRequest
);

module.exports = route;
