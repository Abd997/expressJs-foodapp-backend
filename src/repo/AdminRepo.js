const AdminCollection = require("../collections/Admin");

module.exports = {
	authenticateUser: async function (email, password) {
		const doc = await AdminCollection.findOne({
			email: email,
			password: password
		});
		return doc;
	},

	findUser: async function (email) {
		const doc = await AdminCollection.findOne({
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
		const doc = await AdminCollection.create({
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password
		});
		return doc;
	}
};
