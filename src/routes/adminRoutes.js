const express = require("express");
const {
	addWeeklyFood,
	addWeeklyFoodImage,
	addExplorePost
} = require("../admin-controllers");
const addAmbassador = require("../admin-controllers/addAmbassador");
const admin_grocery = require("../admin-controllers/admin-grocery");
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

route.get("/", async (req, res) => {
	res.render("pages/admin");
});

route.get("/add/grocery.html", async (req, res) => {
	res.render("pages/addGrocery");
});

route.post("/grocery", admin_grocery.addGrocery);

module.exports = route;
