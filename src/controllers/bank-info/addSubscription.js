const e = require("express");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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
		const { loggedInUser } = req.body;
		if (!loggedInUser.stripeCustomerId) {
			throw new BadRequestError(
				"User does not have a payment method"
			);
		}
		const subscription = await stripe.subscriptions.create({
			customer: loggedInUser.stripeCustomerId,
			items: [{ price: "price_1LXrHwK81X3eXZtxununxvqy" }]
		});
		res.json({ msg: "Subscription has been added" });
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
