const mongoose = require("mongoose");

const UserPostSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		imageUrl: { type: String, default: "empty" },
		description: String,
		title: String,
		totalLikes: { type: Number, default: 0 },
		likedBy: [String],
		totalComments: { type: Number, default: 0 },
		comments: [
			{
				email: String,
				title: String,
				description: String,
				dateCreated: { type: Date, default: Date.now() },
				dateUpdated: { type: Date, default: Date.now() }
			}
		],
		dateCreated: { type: Date, default: Date.now() },
		dateUpdated: { type: Date, default: Date.now() }
	},
	{ collection: "UserPosts" }
);

const UserPosts = mongoose.model("UserPosts", UserPostSchema);

module.exports = UserPosts;
