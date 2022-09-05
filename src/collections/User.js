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
		weight: { value: { type: Number, default: null }, unit: { type: String, default: "kg", }, },
		weightGoal: String,
		currentActivityLevel: String,
		dateOfBirth: String,
		height: { value: { type: Number, default: null }, unit: { type: String, default: "cm", }, },
		bmi: { type: Number, default: 0 },
		nutritions: [
			{
				name: { type: String },
				required: { type: Number, default: 0 },
				taken: { type: Number, default: 0 },
				unit: { type: String, default: "g", },
			}
		],
		water: [{
			date: {type: Date},
			required: { type: Number, default: 7,},
			taken: { type: Number, default: null, maxLength:7, minLength:0 },
		}],
		steps: [{date: {type: Date, default: null}, steps: {type: Number, default: 0 }}],
		food: [
			{
				date: {
					type: Date
				},
				breakfast: [
					{
						name: { type: String },
						nutritions: [{ name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}],
					}
				],
				lunch: [
					{
						name: { type: String },
						nutritions: [{ name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}]
					}
				],
				dinner: [
					{
						name: { type: String },
						nutritions: [{ name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}]
					}
				],
				snacks: [
					{
						name: { type: String },
						nutritions: [{ name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}]
					}
				],
			},
		],

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
		bestStreak: { type: Number, default: 1 },
		lastLogin: {
			type: Date,
			default: new Date()
		},
		balance: { type: Number, default: 0 },
		socketId: { type: String }
	},
	{ collection: "UserCollection" }
);

const UserCollection = mongoose.model("UserCollection", UserSchema);

module.exports = UserCollection;
