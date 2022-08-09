const route = require("express")();
const { authenticateAdmin } = require("../admin-controllers");
const {
	addUser,
	getUserAuthentication,
	getWeeklyFoods,
	getFoodDetails
} = require("../controllers");

route.post("/user/register", addUser);
route.post("/user/login", getUserAuthentication);
route.post("/admin/login", authenticateAdmin);
route.get("/weeklyfood/:weekNumber", getWeeklyFoods);
route.get("/food-details/:foodId", getFoodDetails);

module.exports = route;
