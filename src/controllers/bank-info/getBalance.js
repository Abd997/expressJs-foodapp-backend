const e = require("express");
require("dotenv").config();
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
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
		let sources = []
		const { loggedInUser } = req.body;
		const cusId = loggedInUser.stripeCustomerId;
		const result = await stripe.customers.retrieve(cusId, {
			expand: ["cash_balance"]
		});
		const customer = await stripe.customers.retrieve(
			loggedInUser.stripeCustomerId,
			
		)
		.then(async function(customer) {
			
			await stripe.customers.listSources(
				customer.id, 
				{limit: 3}
			  ).autoPagingEach(async(source)=>{
				console.log(source)
				sources.push({id:source.id,brand:source.brand,name:source.name,last4:source.last4})
			
			  })
			return sources;
		})
		res.json({
			customerId: result.id,
			cards: sources,
			balance: result.cash_balance.available || 0
		});
	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
