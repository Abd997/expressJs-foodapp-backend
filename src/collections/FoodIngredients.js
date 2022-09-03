const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		imageURL: { type: String, default: "empty" }
	},
	{ collection: "FoodIngredients" }
);

module.exports = mongoose.model("FoodIngredients", FoodSchema);
