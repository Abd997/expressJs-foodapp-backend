const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		isAmbassador: { type: Boolean, default: false },

		profileImageUrl: { type: String, default: "empty" },

		gender: String,
		weight: String,
		weightGoal: String,
		currentActivityLevel: String,
		dateOfBirth: String,
		height: String,

		hasPostedStory: { type: Boolean, default: false },
		storyUrl: { type: String },

		postIds: [],
		favouriteFoodIds: [],
		groceries: [
			{
				groceryId: mongoose.Schema.Types.ObjectId,
				quantity: Number
			}
		],

		savedExplorePosts: [mongoose.Schema.Types.ObjectId],

		totalReportsByOtherUsers: { type: Number, default: 0 },
		otherBlockedUsers: [String],

		dietMeasurement: [
			{
				calories: {
					caloriesRequired: { type: Number, default: 0 },
					caloriesTaken: { type: Number, default: 0 }
				},
				carbs: {
					carbsRequired: { type: Number, default: 0 },
					carbsTaken: { type: Number, default: 0 }
				},
				fats: {
					fatsRequired: { type: Number, default: 0 },
					fatsTaken: { type: Number, default: 0 }
				},
				protein: {
					proteinRequired: { type: Number, default: 0 },
					proteinTaken: { type: Number, default: 0 }
				}
			}
		]
	},
	{ collection: "UserCollection" }
);

const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection;
