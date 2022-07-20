const route = require("express").Router();
const {
	multerUpload,
	checkValidationErrors
} = require("../middlewares");
const {
	getStoryValidation,
	extraDetailsValidation
} = require("../validation");

route.post(
	"/upload-story",
	multerUpload.single("image"),
	handleUploadStory
);

route.post(
	"/story",
	getStoryValidation,
	checkValidationErrors,
	handleGetStory
);

route.post(
	"/upload-post",
	multerUpload.single("image"),
	handleUploadPost
);

route.post("/post", handleGetPost);

route.post(
	"/register-extra-details",
	extraDetailsValidation,
	handleExtraDetailsRequest
);

module.exports = route;
