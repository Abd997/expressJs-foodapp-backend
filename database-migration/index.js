const mongoose = require("mongoose");
require("dotenv").config();
const migrateDevDatabase = require("./migrateDevDatabase");

(async () => {
	try {
		await mongoose.connect(process.env.DATABASE_PROD);
		await mongoose.connection.db.dropDatabase();
		console.log("Connected to database");
	} catch (error) {
		console.log("Could not connect to database");
		console.error(error.message);
		await mongoose.connection.close();
		return;
	}
	try {
		console.log("Starting database migration...");
		await migrateDevDatabase();
		console.log("Database migration completed");
		await mongoose.connection.close();
	} catch (error) {
		console.log("An error occurred while migrating the database");
		console.log(error);
	}
})();
