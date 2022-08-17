const e = require("express");
const { BadRequestError } = require("../custom-error");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { user } = req.body;
		const dietMeasurement = user.dietMeasurement;
		let dashboard = {
			balance: user.balance || 0,
			dietMeasurement: dietMeasurement,
			loginStreak: user.loginStreak
		};
		return res.json({
			dashboard: dashboard
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
