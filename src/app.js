const express = require("express");
const {
	authorizedRoute,
	normalRoutes,
	adminRoutes
} = require("./routes");
const verifyToken = require("./utils/verifyToken");
const app = express();

const VERSION = "1.0.7";

app.use(express.json());

app.use("/auth/user/", verifyToken, authorizedRoute);

app.use("/admin", adminRoutes);

app.use("/", normalRoutes);

// app.get("/blogs/:start/:end", handleGetBlogs);

// app.get("/foods/:weekNumber", handleGetWeeklyFoods);

// app.get("/food/:id", handleGetFood);

app.get("/version", (req, res) => {
	res.send(`${VERSION}`);
});

app.all("*", (req, res) => {
	res.status(404).send("Route not exists");
});

module.exports = app;
