const e = require("express");
const GroceryCollection = require("../../collections/GroceryCollection");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const  ObjectId = require('mongoose').Types.ObjectId;
const validate = async (req) => {
    const { id } = req.params;
    if (!id || !ObjectId.isValid(id)) {
        throw new BadRequestError("Grocery id is not valid");
    }
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        await validate(req);
        const groceryId = req.params.id;
        const { user } =
            req.body;

        if (user.groceries.includes(groceryId)) {
            const data = await GroceryCollection.deleteOne({ _id: groceryId });
            let user_details = await UserCollection.findOne({ email: user.email });
            let groceries = [];
            for(let grocery of user_details.groceries)
            {
                if(grocery== groceryId){
                    continue;
                }
                else{
                    groceries.push(grocery)
                }
            }
            user_details.groceries = groceries;
            await user_details.save();
            res.json({
                msg: "Groceries have been deleted",
                data: data
            });
        }else{
            res.json({
                msg: "You did not added the groceries",
            });
        }
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};
