const express = require("express");
const {
	authorizedRoute,
	normalRoutes,
	adminRoutes
} = require("./routes");
const app = express();

const VERSION = "0.9.1";

app.use(express.json());

app.use("/auth/user", authorizedRoute);

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
