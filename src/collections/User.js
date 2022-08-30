const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		stripeCustomerId: { type: String, default: null },

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
		storyLikes: [String],
		storyComments: [
			{
				commentUserEmail: String,
				commentText: String
			}
		],

		postIds: [],
		favouriteFoodIds: [mongoose.Schema.Types.ObjectId],
		groceries: [
			{
				groceryId: mongoose.Schema.Types.ObjectId,
				quantity: Number
			}
		],

		savedExplorePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExplorePostCollection" }],
		likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserPosts" }],
		totalReportsByOtherUsers: { type: Number, default: 0 },
		otherBlockedUsers: [String],

		dietMeasurement: [
			{
				caloriesRequired: {
					type: Number,
					required: true,
					default: 0
				},
				caloriesTaken: { type: Number, required: true, default: 0 },
				carbsRequired: { type: Number, default: 0 },
				carbsTaken: { type: Number, default: 0 },
				fatsRequired: { type: Number, default: 0 },
				fatsTaken: { type: Number, default: 0 },
				proteinRequired: { type: Number, default: 0 },
				proteinTaken: { type: Number, default: 0 },
				waterRequired: { type: Number, default: 0 },
				waterTaken: { type: Number, default: 0 },
				movementSteps: { type: Number, default: 0 },
				bmi: { type: Number, default: 0 }
			}
		],

		loginStreak: { type: Number, default: 1 },
		lastLogin: {
			type: Date,
			default: new Date().toISOString().slice(0, 10)
		},
		balance: { type: Number, default: 0 },
		socketId: {type: String}
	},
	{ collection: "UserCollection" }
);

const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection;
