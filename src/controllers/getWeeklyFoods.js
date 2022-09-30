const e = require("express");
const FoodCollection = require("../collections/FoodCollection");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	const weekNumber = req.params.weekNumber;
	const docs = await FoodCollection.find(
		{ weekNumber: weekNumber },
		"id name price description foodType tags imageURL currency custom nutritions"
	).populate({ path: "ingredients", select: "name imageURL" })
	const userFavouriteFoodIds = req.body.user.favouriteFoodIds;

	let favouriteFood = [];
	for (let food of docs) {
		if (userFavouriteFoodIds.includes(food._id)) {
			favouriteFood.push({ food, isFavourite: true });
		} else {
			favouriteFood.push({ food, isFavourite: false });
		}
	}
	res.send(favouriteFood);
};
