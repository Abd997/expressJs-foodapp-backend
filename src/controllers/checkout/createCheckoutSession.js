require("dotenv").config();
const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { itemId, itemQuantity } = req.body;
	if (!itemId) {
		throw new Error("Item Id not sent");
	} else if (!itemQuantity) {
		throw new Error("Item quantity not sent");
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
		const { itemId, itemQuantity, email } = req.body;
		const itemToBuy = await FoodCollection.findById(itemId);
		if (!itemToBuy) {
			throw new Error("Item does not exists");
		}
		// const session = await stripe.checkout.sessions.create({
		// 	payment_method_types: ["card"],
		// 	mode: "payment",
		// 	line_items: [
		// 		{
		// 			price_data: {
		// 				name: itemToBuy.name,
		// 				currency: "eur",
		// 				price: itemToBuy._id,
		// 				quantity: itemQuantity
		// 			}
		// 		}
		// 	],
		// 	success_url: `${process.env.SERVER_URL}/auth/user/checkout/success`,
		// 	cancel_url: `${process.env.SERVER_URL}/auth/user/checkout/cancel`
		// });
		const paymentIntent = await stripe.paymentIntents.create({
			amount: itemToBuy.priceInCents,
			currency: "eur",
			payment_method_types: ["card"],
			metadata: { uid: "some_userID" }
		});
		return res.send(paymentIntent);
	} catch (error) {
		console.log(error);
		return sendErrorResponse(res, 500, error.message);
	}
};
