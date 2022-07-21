const testGetDetails = require("./testGetDetails");
const testUpdateDetails = require("./testUpdateDetails");
const testValidation = require("./testValidation");

module.exports = (user) => {
	describe("test user extra details", () => {
		testValidation(user);
		testUpdateDetails(user);
		testGetDetails(user);
	});
};
