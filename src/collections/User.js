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
		weight: {value: {type: Number}, unit: {type: String,default: "kg",},},
		weightGoal: String,
		currentActivityLevel: String,
		dateOfBirth: String,
		height: {value: {type: Number}, unit: {type: String,default: "cm",},},
		bmi: { type: Number, default: 0 },
		calories: [
			{
				name: {type: String},
				required: {type: Number, default:0},
				taken: {type: Number, default:0},
			}
		],
		water: {
			required: {type: Number, default:0},
			taken: {type: Number, default:0},
		},
		steps: { type: Number, default: 0 },
		food: {
			breakfast: [
				{
					name : {type: String},
					calories: {type: Number, default:0},
				}
			],
			lunch:[
				{
					name : {type: String},
					calories: {type: Number, default:0},
				}
			],
			dinner:[
				{
					name : {type: String},
					calories: {type: Number, default:0},
				}
			],
		},

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

		

		loginStreak: { type: Number, default: 1 },
		bestStreak : { type: Number, default: 1 },
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
