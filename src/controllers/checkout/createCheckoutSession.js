require("dotenv").config();
const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const OrderCollection = require("../../collections/OrderCollection");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { orderId, paymentId } =
		req.body;
	if (!orderId) {
		throw new BadRequestError("orderId not sent");
	}
	if (!paymentId) {
		throw new BadRequestError("paymentId  not sent");
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
		const {
			orderId,
			loggedInUser,
			paymentId
		} = req.body;

		if (!loggedInUser.stripeCustomerId) {
			throw new BadRequestError(
				"Customer does not have a saved payment method"
			);
		}
		const customer = loggedInUser.stripeCustomerId
		// const itemToBuy = await FoodCollection.findById(itemId);
		// if (!itemToBuy) {
		// 	throw new BadRequestError("Item does not exists");
		// }
		// if (itemToBuy.itemQuantity === 0) {
		// 	throw new BadRequestError("Item is not in stock");
		// }

		// let price = itemToBuy.priceInCents * itemQuantity;
		// const deliveryChargeInCents = 1000;

		// if (price < 9 * 10_000) {
		// 	price += deliveryChargeInCents;
		// }

		// const payment = await stripe.paymentMethods.create({
		// 	type: "card",
		// 	card: {
		// 		number: "4242424242424242",
		// 		exp_month: 9,
		// 		exp_year: 2023,
		// 		cvc: "343"
		// 	}
		// });
		const order = await OrderCollection.findById({ "_id": orderId })
		const paymentIntent = await stripe.paymentIntents.create({
			payment_method: paymentId,
			customer: customer,
			amount: `${order.totalCost}`,
			currency: "eur",
			confirm: "true",
			payment_method_types: ["card"],
			metadata: { order: orderId._id }
		})
		if (paymentIntent.status === "succeeded") {
			order.paymentStatus = "completed",
			await order.save();
		}
		return res.json({ status: paymentIntent.status,order });
		// const order = await OrderCollection.findById({ "_id": orderId })
		// console.log(order.totalCost)
		// await stripe.charges.create({
		// 	amount: `${order.totalCost}`,
		// 	description: "description",
		// 	currency: "eur",
		// 	source: req.body.cardId,
		// }).then(async (charges) => {
		// 	order.paymentStatus = "completed",
		// 		await order.save();
		// 	res.json({ status: "Payment Success!!!", charges: charges })
		// })
		// 	.catch(async (err) => {
		// 		order.paymentStatus = "failed",
		// 			await order.save();
		// 		return sendErrorResponse(res, 500, err.message);
		// 	})

		// return res.json({ status: paymentIntent.status });
	} catch (error) {
		// console.log(error);
		return sendErrorResponse(res, 500, error.message);
	}
};
