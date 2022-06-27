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

app.use(express.json());

app.post("/register", newUserValidation, handleRegisterRequest);

app.post("/login", loginUserValidation, handleLoginRequest);

// app.get("/blogs/:start/:end", handleGetBlogs);

app.get("/foods/:weekNumber", handleGetWeeklyFoods);

app.get("/food/:id", handleGetFood);

app.use("/auth", authRequestValidation, authorizedRoutes);

app.use("/admin", adminRoutes);

app.all("*", (req, res) => {
	res.status(404).send("Route not exists");
});

module.exports = app;
