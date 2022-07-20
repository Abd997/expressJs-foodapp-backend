require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

if (process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.DATABASE_PROD, {}).then(
		() => {
			console.log("connected to MongoDB production");
		},
		(err) =>
			console.log("could not connect to database Error: " + err)
	);
} else {
	mongoose.connect(process.env.DATABASE_TEST, {}).then(
		() => {
			console.log("connected to MongoDB test");
		},
		(err) =>
			console.log("could not connect to database Error: " + err)
	);
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
	console.log(
		`server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
	)
);
