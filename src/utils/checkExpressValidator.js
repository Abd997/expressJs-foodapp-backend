const e = require("express");
const { validationResult } = require("express-validator");
const sendErrorResponse = require("./sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
module.exports = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return sendErrorResponse(res, 400, errors.array());
	}

	next();
};
