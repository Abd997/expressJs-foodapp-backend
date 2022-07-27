require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

(async () => {
	try {
		await mongoose.connect(process.env.DATABASE_PROD, {});
		console.log("Connected to MongoDB database");
	} catch (error) {
		console.log("Could not connect to database");
		console.log(error);
	}

	try {
		const PORT = process.env.PORT || 8080;
		await app.listen(PORT);
		console.log(
			`Server started at PORT:${PORT}, MODE:${process.env.NODE_ENV}`
		);
	} catch (error) {
		console.log("Could not start server");
		console.log(error);
	}
})();
