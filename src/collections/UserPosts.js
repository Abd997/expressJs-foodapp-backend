const mongoose = require("mongoose");

Date.prototype.getWeekNumber = function () {
	var d = new Date(
		Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
	);
	var dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const UserPostSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		imageUrl: String,
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
