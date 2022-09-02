require("dotenv").config();
const e = require("express");
const EventCollection = require("../../collections/Event");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
    const { eventId,paymentId } =
        req.body;
    if (!eventId) {
        throw new BadRequestError("Event Id not sent");
    }
    if (!paymentId) {
        throw new BadRequestError("paymentId not sent");
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
            eventId,
            paymentId,
            loggedInUser,
        } = req.body;

        if (!loggedInUser.stripeCustomerId) {
            throw new BadRequestError(
                "Customer does not have a saved payment method"
            );
        }
        const customer = loggedInUser.stripeCustomerId;
        const event = await EventCollection.findById({ "_id": eventId })
        const paymentIntent = await stripe.paymentIntents.create({
			payment_method: paymentId,
			customer: customer,
			amount: `${event.fee}`,
			currency: "eur",
			confirm: "true",
			payment_method_types: ["card"],
			metadata: { event_id: event._id }
		})
		if (paymentIntent.status === "succeeded") {
			event.participants.push(loggedInUser._id);
            await event.save();
		}
		return res.json({ status: paymentIntent.status,event });
        // await stripe.charges.create({
        //     amount: `${event.fee}`,
        //     description: `${event.description}`,
        //     currency: "eur",
        //     customer: loggedInUser.stripeCustomerId
        // }).then(async (charges) => {
        //     event.participants.push(loggedInUser._id);
        //     await event.save()
        //     res.json({ status: "Payment Success!!!", event: event })
        // })
        //     .catch(async (err) => {
        //         return sendErrorResponse(res, 500, err.message);
        //     })

    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};
