const UserCollection = require("../entities/User");
const sendErrorResponse = require("../utils/sendErrorResponse");

module.exports = UserRepo = {
	findUser: async function (email, password) {
		const doc = await UserCollection.findOne({
			email: email,
			password: password
		});
		return doc;
	},

	registerUser: async function (
		email,
		firstName,
		lastName,
		password
	) {
		const doc = await UserCollection.create({
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password
		});
		return doc;
	}
};
