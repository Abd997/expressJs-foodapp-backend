const route = require("express")();
const {
	addUser,
	getUserAuthentication,
	getWeeklyFoods,
	getFoodDetails
} = require("../controllers");

route.post("/user/register", addUser);
route.post("/user/login", getUserAuthentication);
route.get("/weeklyfood/:weekNumber", getWeeklyFoods);
route.get("/food-details/:foodId", getFoodDetails);

module.exports = route;
