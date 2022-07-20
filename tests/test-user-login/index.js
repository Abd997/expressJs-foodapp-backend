const testHandler = require("./testHandler");
const testValidation = require("./testValidation");

module.exports = (user) => {
	describe("test user login", () => {
		testValidation();
		testHandler(user);
	});
};
