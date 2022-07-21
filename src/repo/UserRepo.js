const UserCollection = require("../entities/User");
const sendErrorResponse = require("../utils/sendErrorResponse");

module.exports = UserRepo = {
	authenticateUser: async function (email, password) {
		const doc = await UserCollection.findOne({
			email: email,
			password: password
		});
		return doc;
	},

	findUser: async function (email) {
		const doc = await UserCollection.findOne({
			email: email
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
	},

	updateUser: async function (user) {
		const doc = await UserCollection.findOneAndUpdate(
			{ email: user.email },
			{
				gender: user.gender,
				weight: user.weight,
				weightGoal: user.weightGoal,
				currentActivityLevel: user.currentActivityLevel,
				dateOfBirth: user.dateOfBirth,
				height: user.height
			}
		);
		return doc;
	}
};
