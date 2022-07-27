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
	},
	addFavourite: async function (email, foodId) {
		let user = await UserCollection.findOne({ email: email });
		/** @type {Array} */
		let favouriteFoodIds = [];
		if (!user.favouriteFoodIds || user.favouriteFoodIds.length == 0) {
			favouriteFoodIds.push(foodId);
		} else if (user.favouriteFoodIds.length > 0) {
			favouriteFoodIds = user.favouriteFoodIds;
			const duplicate = favouriteFoodIds.find((v) => v == foodId);
			if (duplicate) {
				const ind = favouriteFoodIds.indexOf(foodId);
				if (ind > -1) {
					favouriteFoodIds.splice(ind, 1);
				}
			} else {
				favouriteFoodIds.push(foodId);
			}
		}
		await UserCollection.findOneAndUpdate(
			{ email: email },
			{
				favouriteFoodIds: favouriteFoodIds
			}
		);
		user = await UserCollection.findOne({ email: email });
		console.log(user);
	},

	getFavFoods: async function (email) {
		const doc = await UserCollection.findOne({ email: email });
		if (!doc) {
			throw new Error("User not found");
		}
		return doc.favouriteFoodIds;
	}
};
