const e = require("express");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	res.json({ msg: "Checkout has failed. Please try again later" });
};
