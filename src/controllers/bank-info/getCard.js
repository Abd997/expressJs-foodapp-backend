const e = require("express");
const UserCollection = require("../../collections/User");
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
		const { loggedInUser } = req.body;

		if (!loggedInUser.stripeCustomerId) {
			throw new BadRequestError("User has not added a card");
		}

		const customer = await stripe.customers.retrieve(
			loggedInUser.stripeCustomerId,
			
		)
		.then(async function(customer) {
			let sources = []
			await stripe.customers.listSources(
				customer.id, 
				{limit: 3}
			  ).autoPagingEach(async(source)=>{
				console.log(source)
				sources.push({id:source.id,brand:source.brand,name:source.name,last4:source.last4})
			
			  })
			return res.json({
				sources
			});
		})

	} catch (error) {
		if (error instanceof BadRequestError) {
			return sendErrorResponse(res, error.statusCode, error.message);
		}
		return sendErrorResponse(res, 500, error.message);
	}
};
