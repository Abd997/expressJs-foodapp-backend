const express = require("express");
const {
	addWeeklyFood,
	addWeeklyFoodImage
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

module.exports = route;
