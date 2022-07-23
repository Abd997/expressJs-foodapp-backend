const express = require("express");
const getWeeklyFood = require("./get-weekly-food");
const { authorizedRoute } = require("./routes");
const app = express();
const userLogin = require("./user-login");
const userRegister = require("./user-register");

const VERSION = "0.7.13";

app.use(express.json());

app.post(
	"/user/register",
	userRegister.validateRequest,
	userRegister.handleRequest
);

app.post(
	"/user/login",
	userLogin.validateRequest,
	userLogin.handleRequest
);

app.post("/admin/login");

app.use("/auth/user", authorizedRoute);

app.post(
	"/get/weeklyfood",
	getWeeklyFood.validateReq,
	getWeeklyFood.handler
);

// app.get("/blogs/:start/:end", handleGetBlogs);

// app.get("/foods/:weekNumber", handleGetWeeklyFoods);

// app.get("/food/:id", handleGetFood);

// app.use("/admin", adminRoutes);

app.get("/version", (req, res) => {
	res.send(`${VERSION}`);
});

app.all("*", (req, res) => {
	res.status(404).send("Route not exists");
});

module.exports = app;
