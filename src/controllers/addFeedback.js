const e = require("express");
const sendErrorResponse = require("../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { rating, text } = req.body;
	if (!rating) {
		throw new Error("Rating not sent");
	} else if (!text) {
		throw new Error("Text not sent");
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
		const { rating, text } = req.body;
		res.send({
			msg: "Feeback recieved"
		});
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
