const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: String,
		imageURl: String,
		foodType: String,
		price: String,
		tags: [],
		dateCreated: { type: Date, default: Date.now() },
		weekNumber: { type: String, required: true },
		calories: String,
		Protein: String,
		Fat: String,
		Carbs: String
	},
	{ collection: "FoodCollection" }
);

const FoodCollection = mongoose.model("FoodCollection", FoodSchema);

module.exports = FoodCollection;
