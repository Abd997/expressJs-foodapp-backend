const e = require("express");
const UserCollection = require("../../collections/User");
const UserRepo = require("../../repo/UserRepo");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
		const { loggedInUser } = req.body;
		/** @type {Array} */
		const favFoodsId = loggedInUser.favouriteFoodIds;
		let favFoods = [];

		for (let index = 0; index < favFoodsId.length; index++) {
			const element = favFoodsId[index];
		}
		res.send({ data: doc });
	} catch (error) {
		return sendErrorResponse(res, 400, error.message);
	}
};
