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
    const { eventId } =
        req.body;
    if (!eventId) {
        throw new BadRequestError("Event Id not sent");
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
            loggedInUser,
        } = req.body;

        if (!loggedInUser.stripeCustomerId) {
            throw new BadRequestError(
                "Customer does not have a saved payment method"
            );
        }
        const event = await EventCollection.findById({ "_id": eventId })
        await stripe.charges.create({
            amount: `${event.fee}`,
            description: `${event.description}`,
            currency: "eur",
            customer: loggedInUser.stripeCustomerId
        }).then(async (charges) => {
            event.participants.push(loggedInUser._id);
            await event.save()
            res.json({ status: "Payment Success!!!", event: event })
        })
            .catch(async (err) => {
                return sendErrorResponse(res, 500, err.message);
            })

    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};
