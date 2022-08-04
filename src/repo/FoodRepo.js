const FoodCollection = require("../collections/FoodCollection");
const mongoose = require("mongoose");

module.exports = FoodRepo = {
	getWeeklyFoods: async function (weekNumber) {
		const doc = await FoodCollection.find(
			{ weekNumber: weekNumber },
			"name price foodType tags imageURL currency"
		);
		return doc;
	},

	addFood: async function (data) {
		const doc = await FoodCollection.create(data);
		return doc;
	},

	findFood: async function (foodId) {
		const doc = await FoodCollection.findById(foodId);
		if (!doc) {
			throw new Error("Food not found");
		}
		return doc;
	}
};
