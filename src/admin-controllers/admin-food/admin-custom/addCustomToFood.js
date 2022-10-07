const e = require("express");
const CustomMealsCollection = require("../../../collections/CustomMealsCollection");
const FoodCollection = require("../../../collections/FoodCollection");
const BadRequestError = require("../../../custom-error/BadRequestError");
const sendErrorResponse = require("../../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
  try {
    /* Checking if the custom is in the database. */
    for (let custom of req.body.customs) {
      const customs = await CustomMealsCollection.findById({
        _id: custom,
      });
      if (!customs) {
        throw new Error(`Custom ${custom} not found`);
      }
    }

   /* Finding the food by the id and then pushing the customs to the customItems array. */
    const food = await FoodCollection.findById({ _id: req.body.foodId });
    if (!food) {
      throw new Error("food not found");
    }
    for (let custom of req.body.customs) {
      food.customItems.push(custom);
    }
    await food.save();

    return res.json({
      msg: "custom has been added to fod",
      data: await FoodCollection.findById({ _id: req.body.foodId }),
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    return sendErrorResponse(res, 500, error.message);
  }
};
