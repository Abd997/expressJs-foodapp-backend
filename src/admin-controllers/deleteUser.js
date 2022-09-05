const e = require("express");
const UserCollection = require("../collections/User");
const { BadRequestError } = require("../custom-error");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => { 
    const { body } = req;
    const { userId } =req.body;
    const user = await UserCollection.findById({ _id: userId });
    if (!user) {
        return sendErrorResponse(res, 500, "user not found");
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
        const user = await UserCollection.deleteOne({_id: req.body.userId})

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};
