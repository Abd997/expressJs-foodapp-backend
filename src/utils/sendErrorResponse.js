const e = require("express");

/**
 *
 * @param {e.Response} res
 */
module.exports = (
	res,
	statuscode = 400,
	message = "Bad response"
) => {
	if (message.constructor === Array) {
		return res.status(statuscode).json({status: false, message: message});
	}
	return res.status(statuscode).json({status: false, message: message});
};
