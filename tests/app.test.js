const { default: mongoose } = require("mongoose");
require("dotenv").config();
const testUserRegistration = require("./test-user-registration");

describe("test backend", () => {
	beforeAll(async () => {
		try {
			await mongoose.connect(process.env.DATABASE_TEST);
		} catch (err) {
			console.log("Could not connect to MongoDB");
		}
	});

	testUserRegistration();

	afterAll(async () => {
		try {
			await mongoose.connection.close();
		} catch (err) {
			console.log("Could not disconnect from MongoDB");
		}
	});
});
