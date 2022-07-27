const route = require("express")();
const getFoodDetails = require("../controllers/getFoodDetails");
const getWeeklyFood = require("../get-weekly-food");
const userLogin = require("../user-login");
const userRegister = require("../user-register");

route.post(
	"/user/register",
	userRegister.validateRequest,
	userRegister.handleRequest
);

route.post(
	"/user/login",
	userLogin.validateRequest,
	userLogin.handleRequest
);

route.post(
	"/get/weeklyfood",
	getWeeklyFood.validateReq,
	getWeeklyFood.handler
);

route.get("/food-details/:foodId", getFoodDetails);

module.exports = route;
