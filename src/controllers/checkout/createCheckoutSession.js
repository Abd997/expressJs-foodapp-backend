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

		let price = itemToBuy.priceInCents * itemQuantity;
		const deliveryChargeInCents = 1000;

		if (price < 9 * 10_000) {
			price += deliveryChargeInCents;
		}

		const payment = await stripe.paymentMethods.create({
			type: "card",
			card: {
				number: "4242424242424242",
				exp_month: 9,
				exp_year: 2023,
				cvc: "343"
			}
		});

		const paymentIntent = await stripe.paymentIntents.create({
			payment_method: payment.id,
			amount: price,
			currency: "eur",
			confirm: "true",
			payment_method_types: ["card"],
			metadata: { uid: "some_userID" }
		});
		return res.json({ status: paymentIntent.status });
	} catch (error) {
		// console.log(error);
		return sendErrorResponse(res, 500, error.message);
	}
};
