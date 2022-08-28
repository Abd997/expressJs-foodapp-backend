const express = require("express");
const {
	addWeeklyFood,
	addWeeklyFoodImage,
	addExplorePost,
	getAllOrders,

} = require("../admin-controllers");
const addAmbassador = require("../admin-controllers/addAmbassador");
const admin_food = require("../admin-controllers/admin-food");
const admin_grocery = require("../admin-controllers/admin-grocery");
const multerUpload = require("../utils/multerUpload");
const verifyAdminToken = require("../utils/verifyAdminToken");
const route = express();

// ============ ADMIN CHAT ============

// ============ FOOD REST APIS ============
route.post("/food", admin_food.addFood);

route.post(
	"/weeklyfood",
	multerUpload.single("image"),
	addWeeklyFood
);

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
	res.render("pages/addGrocery");
});

route.get("/add/grocery.html", async (req, res) => {
	res.render("pages/addGrocery");
});

route.get("/add/food.html", async (req, res) => {
	res.render("pages/addFood");
});

route.get("/list/food.html", async (req, res) => {
	res.render("pages/listFood");
});

route.get("/list/grocery.html", admin_grocery.listGrocery);

route.post("/grocery", admin_grocery.addGrocery);

// =========== ORDERS ===========

route.get("/orders",getAllOrders )



module.exports = route;
