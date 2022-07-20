const { default: mongoose } = require("mongoose");
const testUserLogin = require("./test-user-login");
require("dotenv").config();
const testUserRegistration = require("./test-user-registration");

describe("test backend", () => {
	beforeAll(async () => {
		try {
			await mongoose.connect(process.env.DATABASE_TEST);
		} catch (err) {
			console.log("Could not connect to MongoDB");
		}
		try {
			await mongoose.connection.db.dropDatabase();
		} catch (err) {
			console.log("Could not drop previous database");
		}
	});

	const user = {
		email: "user100@gmail.com",
		firstName: "first",
		lastName: "last",
		password: "password"
	};

	testUserRegistration(user);
	testUserLogin(user);

	afterAll(async () => {
		try {
			await mongoose.connection.close();
		} catch (err) {
			console.log("Could not disconnect from MongoDB");
		}
	});
});
