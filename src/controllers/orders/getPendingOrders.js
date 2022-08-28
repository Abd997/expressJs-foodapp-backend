const e = require("express");
const OrderCollection = require("../../collections/OrderCollection");

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
		const userId = req.body.user._id;
		const order = await OrderCollection.find({userId: userId}).where({"status":{$ne:"delivered"}})
		res.json({
			success: true,
			data:order
		})
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
