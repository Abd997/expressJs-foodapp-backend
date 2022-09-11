const e = require("express");
const mongoose = require("mongoose");
const GroceryCollection = require("../../collections/GroceryCollection");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
    const {
        name,
        marked,
        unit,
        quantity
    } = req.body;
    if (!name || typeof name !== "string") {
        throw new BadRequestError("Grocery name is not valid");
    } else if (!marked || typeof marked !== "boolean") {
        throw new BadRequestError("Grocery marked is not valid");
    } else if (!unit || typeof unit !== "string") {
        throw new BadRequestError("Grocery unit is not valid");
    } else if (
        !quantity || typeof quantity !== "number"
    ) {
        throw new BadRequestError("Quantity in inventory is not valid");
    }

};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        await validate(req)
        const groceryId = req.params.id;
        const { name,
            marked,
            unit,
            quantity, user } = req.body;
        if (user.groceries.includes(groceryId)) {
            const grocery = await GroceryCollection.findById({ _id: groceryId });
            grocery.name = name;
            grocery.unit = unit;
            grocery.quantity = quantity;
            grocery.marked = marked;
            await grocery.save();
            if (!grocery) {
                throw new Error("Grocery does not exist");
            }
            return res.json({
                msg: "Grocery has been updated",
                data: grocery
            });
        } else {
            return res.json({
                msg: "This grocery does not belong to you.",
            });
        }
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, 500, error.message);
    }
};
