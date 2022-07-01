const express = require("express");
const app = express();
const {
	newUserValidation,
	loginUserValidation,
	extraDetailsValidation,
	authRequestValidation
} = require("./validation");
const {
	handleRegisterRequest,
	handleLoginRequest,
	handleExtraDetailsRequest,
	handleGetWeeklyFoods,
	handleGetFood
} = require("./controllers");
const { authorizedRoutes, adminRoutes } = require("./routes");
const { checkValidationErrors } = require("./middlewares");

app.use(express.json());

app.post(
	"/register",
	newUserValidation,
	checkValidationErrors,
	handleRegisterRequest
);

app.post(
	"/login",
	loginUserValidation,
	checkValidationErrors,
	handleLoginRequest
);

// app.get("/blogs/:start/:end", handleGetBlogs);

app.get("/foods/:weekNumber", handleGetWeeklyFoods);

app.get("/food/:id", handleGetFood);

app.use("/auth", authorizedRoutes);

app.use("/admin", adminRoutes);

app.all("*", (req, res) => {
	res.status(404).send("Route not exists");
});

module.exports = app;

/*
  VERSION => 0.73
*/
