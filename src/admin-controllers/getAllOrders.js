const e = require("express");
const OrderCollection = require("../collections/OrderCollection");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => { };

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        console.log("get all orders")
        const orders = await OrderCollection.find({})
            .sort({ createdAt: -1 })
            .limit(20)

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};
