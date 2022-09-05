require("dotenv").config();
const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const OrderCollection = require("../../collections/OrderCollection");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
    const {  cardId } =
		req.body;
	if (!cardId) {
		throw new BadRequestError("cardId  not sent");
	}
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
	try {
        const userId = req.body.user._id;
        let deliveryCharges = 0;
        const {
            orderDetails,
            deliveryAddress,
            deliveryDate,
            deliveryMethod,
            status,
            cardId,
            loggedInUser
        } = req.body;
 
        let totalCost = 0;

        for(let order of orderDetails){
            const product = await FoodCollection.findById(order.orderItem);
            if(product.quantity - order.quantity < 0){
                return sendErrorResponse(res, 200, `${product.name} is out of stock`)
            }
            product.quantity = product.quantity - order.quantity;
            await product.save();
            totalCost += product.price * order.quantity;
        }

        if(totalCost < 90){
            deliveryCharges = 10;
            totalCost = totalCost + deliveryCharges
        }
        const matches = deliveryDate.match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/gm)
        if(matches ===null ){
            return sendErrorResponse(res, 400, 'Date format not Correct.')
        }
        let deliverydate = new Date(deliveryDate); 
        

        const order = await OrderCollection.create({
            userId,
            orderDetails,
            deliveryAddress,
            deliveryDate:deliverydate,
            deliveryMethod,
            totalCost,
            deliveryCharges,
            status
        })
        if (!loggedInUser.stripeCustomerId) {
			throw new BadRequestError(
				"Customer does not have a saved payment method"
			);
		}

		const customer = loggedInUser.stripeCustomerId
		
        const paymentIntent = await stripe.paymentIntents.create({
			payment_method: cardId,
			customer: customer,
			amount: `${order.totalCost}`,
			currency: "eur",
			confirm: "true",
			payment_method_types: ["card"],
			metadata: { order_id: order._id }
		})
		if (paymentIntent.status === "succeeded") {
			order.paymentStatus = "completed",
			await order.save();
		}

        res.json({
            success: true,
            message: `Order #${order._id} created`,
            data: order,
            })

	} catch (error) {
		
		return sendErrorResponse(res, 500, error.message);
	}
};
