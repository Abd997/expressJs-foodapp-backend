const getWeeklyFood = require("../get-weekly-food");
const groceries = require("../groceries");
const userExtraDetails = require("../user-extra-details");
const verifyToken = require("../utils/verifyToken");

const route = require("express").Router();

// route.post(
// 	"/upload-story",
// 	multerUpload.single("image"),
// 	handleUploadStory
// );

// route.post(
// 	"/story",
// 	getStoryValidation,
// 	checkValidationErrors,
// 	handleGetStory
// );

// route.post(
// 	"/upload-post",
// 	multerUpload.single("image"),
// 	handleUploadPost
// );

// route.post("/post", handleGetPost);

route.post("/", verifyToken, (req, res) => {
	res.json({ msg: "User is authorized" });
});

route.post(
	"/update/details",
	userExtraDetails.validateUpdateReq,
	verifyToken,
	userExtraDetails.updateDetails
);

route.post(
	"/get/details",
	userExtraDetails.validateGetReq,
	verifyToken,
	userExtraDetails.getDetails
);

route.post(
	"/update/groceries",
	groceries.validateReq,
	verifyToken,
	groceries.addGroceries
);

route.post(
	"/get/weeklyfood",
	getWeeklyFood.validateReq,
	verifyToken,
	getWeeklyFood.handler
);

module.exports = route;
