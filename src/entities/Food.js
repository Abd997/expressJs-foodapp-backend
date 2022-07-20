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
		calories: String,
		Protein: String,
		Fat: String,
		Carbs: String,
		isFavourite: { type: Boolean, require: true, default: false }
	},
	{ collection: "FoodCollection" }
);

const FoodCollection = mongoose.model("FoodCollection", FoodSchema);

module.exports = FoodCollection;
