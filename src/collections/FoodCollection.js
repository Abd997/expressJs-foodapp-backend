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
		imageURL: { type: String, default: "empty" },
		foodType: { type: String, default: "meal" },
		price: { type: Number, default: 10 },
		priceInCents: { type: Number, default: 1000 },
		currency: { type: String, default: "eur" },
		tags: [],
		dateCreated: { type: Date, default: Date.now() },
		weekNumber: {
			type: String,
			required: true,
			default: new Date().getWeekNumber()
		},
		nutritions: [
			{
				fact: String,
				value: Number,
				unit: { type: String, default: "g", }
			}
		],
		custom: [
			{
				name: { type: String},
				isMarked: { type: Boolean, default: false,},
				price: { type: Number, default: 0, },
				protein:{ type: Number, default: 0, },
				fat: { type: Number, default: 0, },
				calories: { type: Number, default: 0, },
				carbs: { type: Number, default: 0, },
			}
		],
		customItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "CustomMealsCollection"
			}
		],
		ingredients: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "FoodIngredients"
			}
		],
		likes: { type: Number, default: 0 },
		itemQuantity: { type: Number, default: 0 }
	},
	{ collection: "FoodCollection" }
);

module.exports = mongoose.model("FoodCollection", FoodSchema);
