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
		ingredients: [{ name: String, quantity: Number, unit:String, marked: Boolean, visible: {type: Boolean, default: true}}]
	},
	{ collection: "ExplorePostCollection" }
);

const ExplorePostCollection = mongoose.model(
	"ExplorePostCollection",
	ExplorePostSchema
);

module.exports = ExplorePostCollection;
