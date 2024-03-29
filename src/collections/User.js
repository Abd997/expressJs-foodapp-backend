const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		stripeCustomerId: { type: String, default: null },

		isAmbassador: { type: Boolean, default: false },
		deviceToken: { type: String, default: "empty"},
		profileImageUrl: { type: String, default: "empty" },
		age: { type: Number, default:0},
		gender: String,
		weight: { value: { type: Number, default: 0 }, unit: { type: String, default: "kg", }, },
		weightGoal: {type: String, default: "maintenance" ,enum:["weightGain","weightLoss","maintenance"]},
		currentActivityLevel: String,
		dateOfBirth: String,
		height: { value: { type: Number, default: 0 }, unit: { type: String, default: "cm", }, },
		bmi: { type: Number, default: 0 },
		nutritions: [
			{
				name: { type: String },
				required: { type: Number, default: 0 },
				taken: { type: Number, default: 0 },
				unit: { type: String, default: "g", },
			}
		],
		taken_nutritions: [
			{
				date: {type: Date},
				nutrition: [
					{
						name: { type: String },
						required: { type: Number, default: 0 },
						taken: { type: Number, default: 0 },
						unit: { type: String, default: "g", },
					}
				]
			}],
		water: [{
			date: {type: Date},
			required: { type: Number, default: 7,},
			taken: { type: Number, default: 0, maxLength:7, minLength:0 },
		}],
		steps: [{date: {type: Date, default: 0}, steps: {type: Number, default: 0 }}],
		food: [
			{	
				_id: false,
				date: {
					type: Date
				},
				breakfast: [
					{
						_id: false,
						name: { type: String },
						quantity: { type: Number, default: 0 },
						nutritions: [{ _id: false,name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}],
					}
				],
				lunch: [
					{
						_id: false,
						name: { type: String },
						quantity: { type: Number, default: 0 },
						nutritions: [{ _id: false,name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}]
					}
				],
				dinner: [
					{
						_id: false,
						name: { type: String },
						quantity: { type: Number, default: 0 },
						nutritions: [{ _id: false,name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}]
					}
				],
				snacks: [
					{
						_id: false,
						name: { type: String },
						quantity: { type: Number, default: 0 },
						nutritions: [{ _id: false,name: { type: String },value: { type: Number, default: 0 },unit: { type: String, default: "g", },}]
					}
				],
			},
		],

		hasPostedStory: { type: Boolean, default: false },
		storyUrl: { type: String },
		storyLikes: [String],
		storyComments: [
			{
				_id: false,
				commentUserEmail: String,
				commentText: String
			}
		],
		stories: [{storyUrl:{type: String} , caption:{type: String}, date: {type:Date, default: Date.now()}}],
		channels: [{title:{type: String} ,coverUrl:{type: String} ,videoUrl:{type: String} , channelType:{type: String},date: {type:Date, default: Date.now()}}],
		postIds: [],
		favouriteFoodIds: [mongoose.Schema.Types.ObjectId],
		groceries: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "GroceryCollection"
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
