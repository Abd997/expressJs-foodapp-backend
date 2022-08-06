const express = require("express");
const {
	addWeeklyFood,
	addWeeklyFoodImage
} = require("../admin-controllers");
const multerUpload = require("../utils/multerUpload");
const verifyAdminToken = require("../utils/verifyAdminToken");
const route = express();

route.post("/weeklyfood", verifyAdminToken, addWeeklyFood);

route.put(
	"/food-image",
	verifyAdminToken,
	multerUpload.single("image"),
	addWeeklyFoodImage
);

module.exports = route;
