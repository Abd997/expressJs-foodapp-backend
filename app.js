const express = require("express");
const app = express();
const {
	newUserValidation,
	loginUserValidation,
	extraDetailsValidation,
	getStoryValidation
} = require("./validation");
const {
	handleRegisterRequest,
	handleLoginRequest,
	handleExtraDetailsRequest,
	handleGetStory,
	handleUploadStory
} = require("./controllers");
const { verifyToken } = require("./middlewares");
const { authorizedRoutes } = require("./routes");

app.use(express.json());

app.post("/register", newUserValidation, handleRegisterRequest);

app.post("/login", loginUserValidation, handleLoginRequest);

app.use("/auth", verifyToken, authorizedRoutes);

app.post(
	"/register-extra-details",
	extraDetailsValidation,
	handleExtraDetailsRequest
);

// app.get("/discover-deals", handle);

app.all("*", (req, res) => {
	res.status(404).send("Route not exists");
});

module.exports = app;
