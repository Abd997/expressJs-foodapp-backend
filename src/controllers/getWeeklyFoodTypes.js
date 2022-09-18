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
    "id name description price foodType tags imageURL currency custom"
  ).populate({ path: "ingredients", select: "name imageURL" })
    .where("foodType")
    .equals(req.params.foodType);

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
