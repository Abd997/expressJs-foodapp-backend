const FoodCollection = require("../entities/Food");

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
	}
};
