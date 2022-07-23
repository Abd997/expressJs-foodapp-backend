const { default: mongoose } = require("mongoose");
const testUserDetails = require("./test-user-details");
const testUserLogin = require("./test-user-login");
require("dotenv").config();
const testUserRegistration = require("./test-user-registration");
const testVerifyToken = require("./testVerifyToken");

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

	let user = {
		email: "user100@gmail.com",
		firstName: "first",
		lastName: "last",
		password: "password",
		gender: "male",
		weight: "45",
		weightGoal: "increase",
		currentActivityLevel: "low",
		dateOfBirth: "01-01-2000",
		height: "150cm",
		token:
			"eyJhbGciOiJIUzI1NiJ9.dXNlcjEwMEBnbWFpbC5jb20.Y7UuVMpJysuNlAR68bzxI_SqfIt-qduSThZyv1eHDi4"
	};

	testUserRegistration(user);
	testUserLogin(user);
	testVerifyToken();
	testUserDetails(user);

	afterAll(async () => {
		try {
			await mongoose.connection.close();
		} catch (err) {
			console.log("Could not disconnect from MongoDB");
		}
	});
});
