const mongoose = require("mongoose");
require("dotenv").config();
const insertWeeklyFoods = require("./insertWeeklyFoods");

(async () => {
	try {
		await mongoose.connect(process.env.DATABASE_PROD);
		console.log("Connected to database");
	} catch (error) {
		console.log("Could not connect to database");
		return;
	}
	try {
		console.log("Starting database migration...");
		await insertWeeklyFoods();
		console.log("Database migration completed");
		await mongoose.connection.close();
	} catch (error) {
		console.log("An error occurred while migrating the database");
		console.log(error);
	}
})();
