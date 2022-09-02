const e = require("express");
const UserCollection = require("../../collections/User");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
	const { cardNumber, cardExpMonth, cardExpYear, cardCvc } = req.body;
	if (!cardNumber || typeof cardNumber !== "number") {
		throw new BadRequestError("Card number is not in valid format");
	} else if (!cardExpMonth) {
		throw new BadRequestError("Card expiry month not sent");
	} else if (!cardExpYear) {
		throw new BadRequestError("Card expiry year not sent");
	} else if (!cardCvc) {
		throw new BadRequestError("Card cvc not sent");
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
			loggedInUser,
			cardNumber,
			cardExpMonth,
			cardExpYear,
			cardCvc
		} = req.body;

		const customer = loggedInUser.stripeCustomerId

		if(!customer){
			 customer = await stripe.customers.create({
				email: loggedInUser.email,
				address: req.body.address,
				name: req.body.name,
				phone: req.body.phone
			});
			await UserCollection.updateOne(
				{ email: loggedInUser.email },
				{
					stripeCustomerId: customer.id
				}
			);
			customer = await customer.id;
	
		}

		// const paymentMethod = await stripe.paymentMethods.create({
		// 	type: "card",
		// 	card: {
		// 		number: cardNumber,
		// 		exp_month: cardExpMonth,
		// 		exp_year: cardExpYear,
		// 		cvc: cardCvc
		// 	}
		// });

		// await stripe.paymentMethods.attach(paymentMethod.id, {
		// 	customer: customer.id
		// });

		// await stripe.customers.update(customer.id, {
		// 	invoice_settings: { default_payment_method: paymentMethod.id }
		// });
		await stripe.tokens.create({
			card: {
				number: cardNumber,
				exp_month: cardExpMonth,
				exp_year: cardExpYear,
				cvc: cardCvc
			}
		}, async function (err, token) {
			if (err) {
				return sendErrorResponse(res, 500, err.message);
			} else {
				await stripe.customers.createSource(
					customer,
					{
						source: token.id
					}
				)

			}
		});


		
		res.json({
			msg: "Card has been added",
			
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
