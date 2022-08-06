const e = require("express");
const sendErrorResponse = require("../../utils/sendErrorResponse");

const validate = async (req) => {
	const { groceryId } = req.body;
	if (!groceryId) {
		throw new Error("Grocery id not sent");
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { email, groceryId } = req.body;

		return res.json({ msg: "Grocery has been added" });
	} catch (error) {
		sendErrorResponse(res, 500, error.message);
	}
};
