const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        const { user, meal, name, calories, fat, carbs, protien, quantity } = req.body;
        const nutritions = [
            {
                name: "calories",
                value: calories,
                unit: "g",
            },
            {
                name: "fat",
                value: fat,
                unit: "g",
            },
            {
                name: "carbs",
                value: carbs,
                unit: "g",
            },
            {
                name: "protien",
                value: protien,
                unit: "g",
            }
        ]
        const user_details = await UserCollection.findOne({ email: user.email });
        const nowDate = new Date();
        let foodFound = false;
        for (let food of user_details.food) {
            if (food.date.getFullYear() == nowDate.getFullYear() && food.date.getMonth() == nowDate.getMonth() && food.date.getDate() == nowDate.getDate()) {
                foodFound = true;
                food[meal].push({
                    name: name, nutritions: nutritions, quantity: quantity
                });
            }
        }
            if (foodFound) {
                await user_details.save();
            } else {
                if (meal.trim() == "breakfast") {
                    user_details.food.push({
                        date: new Date(), breakfast: [{
                            name: name, quantity: quantity,nutritions: nutritions.map(nutrition => {
                                return {
                                    name: nutrition.name,
                                    value: nutrition.value,
                                    unit: nutrition.unit,
                                }
                            })
                        }]
                    })
                }
                if (meal.trim() == "lunch") {
                    user_details.food.push({
                        date: new Date(), lunch: [{
                            name: name,quantity: quantity, nutritions: nutritions.map(nutrition => {
                                return {
                                    name: nutrition.name,
                                    value: nutrition.value,
                                    unit: nutrition.unit,
                                }
                            })
                        }]
                    })
                }
                if (meal.trim() == "dinner") {
                    user_details.food.push({
                        date: new Date(), dinner: [{
                            name: name,quantity: quantity, nutritions: nutritions.map(nutrition => {
                                return {
                                    name: nutrition.name,
                                    value: nutrition.value,
                                    unit: nutrition.unit,
                                }
                            })
                        }]
                    })
                }
                if (meal.trim() == "snacks") {
                    user_details.food.push({
                        date: new Date(), snacks: [{
                            name: name,quantity: quantity, nutritions: nutritions.map(nutrition => {
                                return {
                                    name: nutrition.name,
                                    value: nutrition.value,
                                    unit: nutrition.unit,
                                }
                            })
                        }]
                    })
                }
                await user_details.save();

            }

            for (let x of nutritions) {
                for (let y of user_details.nutritions) {
                    if (x.name.toLowerCase() == y.name.toLowerCase()) {
                        y.taken += x.value*quantity;
                    }
                }
            }
            await user_details.save();
            res.json({ success: true, food: user_details.food })
        } catch (error) {
            if (error instanceof BadRequestError) {
                return sendErrorResponse(res, error.statusCode, error.message);
            }
            return sendErrorResponse(res, 500, error.message);
        }
    };
