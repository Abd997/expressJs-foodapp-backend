const e = require("express");
const sendErrorResponse = require("../../utils/sendErrorResponse");

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
		await validate(req);
		return res.json({ msg: "User has been flagged" });
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
