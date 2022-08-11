const express = require("express");
const {
	addWeeklyFood,
	addWeeklyFoodImage,
	addExplorePost
} = require("../admin-controllers");
const addAmbassador = require("../admin-controllers/addAmbassador");
const multerUpload = require("../utils/multerUpload");
const verifyAdminToken = require("../utils/verifyAdminToken");
const route = express();

route.post("/weeklyfood", addWeeklyFood);

route.put(
	"/food-image",
	multerUpload.single("image"),
	addWeeklyFoodImage
);

route.post("/register/ambassador", addAmbassador);

route.post(
	"/explore-post",
	multerUpload.single("image"),
	addExplorePost
);

module.exports = route;
