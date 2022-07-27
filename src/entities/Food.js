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

const FoodSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, default: "empty" },
		imageURL: String,
		foodType: { type: String, default: "meal" },
		price: String,
		currency: { type: String, default: "usd" },
		tags: [],
		dateCreated: { type: Date, default: Date.now() },
		weekNumber: {
			type: String,
			required: true,
			default: new Date().getWeekNumber()
		},
		calories: { type: String, default: "400" },
		Protein: { type: String, default: "22g" },
		Fat: { type: String, default: "10g" },
		Carbs: { type: String, default: "23g" },
		customMeal: {
			type: Array,
			default: ["No carbs", "Halal", "Double veggies"]
		},
		ingredients: {
			type: Array,
			default: ["bun", "chicken", "fries", "ketchup"]
		},
		isFavourite: { type: Boolean, require: true, default: false }
	},
	{ collection: "FoodCollection" }
);

const FoodCollection = mongoose.model("FoodCollection", FoodSchema);

module.exports = FoodCollection;
