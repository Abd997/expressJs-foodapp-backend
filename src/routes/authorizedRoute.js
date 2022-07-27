const addAddress = require("../controllers/addAddress");
const editAddress = require("../controllers/editAddress");
const getAddresses = require("../controllers/getAddresses");
const getFavouriteFoods = require("../controllers/getFavouriteFoods");
const removeAddress = require("../controllers/removeAddress");
const sendFeedback = require("../controllers/sendFeedback");
const updateFavouriteFood = require("../controllers/updateFavouriteFood");
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
	"/update/favourite-food",
	verifyToken,
	updateFavouriteFood
);

route.get("/favourite-food/:email", verifyToken, getFavouriteFoods);

//--------ADDRESSES--------
route.get("/address/:email", getAddresses);
route.post("/add/address", verifyToken, addAddress);
route.post("/remove/address", verifyToken, removeAddress);
route.post("/edit/address", verifyToken, editAddress);

//--------FEEDBACK--------
route.post("/feedback", verifyToken, sendFeedback);

module.exports = route;
