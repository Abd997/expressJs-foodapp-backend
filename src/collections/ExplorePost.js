const mongoose = require("mongoose");

const ExplorePostSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		postType: { type: String, required: true },
		imageUrl: { type: String, default: "empty" },
		tags: [{ type: String }],
		article: { type: String,},
		description: { type: String, default: "description" },
		nutritions: [
			{
				name: String,
				value: String
			}
		],
		recipeSteps: [{ type: String}],
		ingredients: [{ name: String, quantity: String}]
	},
	{ collection: "ExplorePostCollection" }
);

const ExplorePostCollection = mongoose.model(
	"ExplorePostCollection",
	ExplorePostSchema
);

module.exports = ExplorePostCollection;
