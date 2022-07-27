const express = require("express");
const { authorizedRoute, normalRoutes } = require("./routes");
const app = express();

const VERSION = "0.8.1";

app.use(express.json());

app.use("/auth/user", authorizedRoute);

app.use("/", normalRoutes);

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
