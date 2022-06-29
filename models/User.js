const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		gender: String,
		weight: String,
		weightGoal: String,
		currentActivityLevel: String,
		dateOfBirth: String,
		height: String,

		hasPostedStory: { type: Boolean, default: false },
		storyFileName: { type: String },

		postIds: []
	},
	{ collection: "UserCollection" }
);

const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection;
