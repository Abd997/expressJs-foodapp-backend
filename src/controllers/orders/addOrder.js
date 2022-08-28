const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const OrderCollection = require("../../collections/OrderCollection");
const sendErrorResponse = require("../../utils/sendErrorResponse");

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
        const userId = req.body.user._id;
        let deliveryCharges = 0;
        const {
            orderDetails,
            deliveryAddress,
            dileveryDate,
            deliveryMethod,
            status
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

        let dateParts = dileveryDate.split('-');
        let dileverydate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); 
        

        const order = await OrderCollection.create({
            userId,
            orderDetails,
            deliveryAddress,
            dileveryDate:dileverydate,
            deliveryMethod,
            totalCost,
            deliveryCharges,
            status
        })

        res.json({
            success: true,
            message: `Order #${order._id} created`,
            data: order,
            })

	} catch (error) {
		
		return sendErrorResponse(res, 500, error.message);
	}
};
