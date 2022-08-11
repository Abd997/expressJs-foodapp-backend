const mongoose = require("mongoose");

const ExplorePostSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		imageUrl: { type: String, default: "empty" },
		postType: { type: String },
		description: { type: String, default: "description" }
	},
	{ collection: "ExplorePostCollection" }
);

const ExplorePostCollection = mongoose.model(
	"ExplorePostCollection",
	ExplorePostSchema
);

module.exports = ExplorePostCollection;
