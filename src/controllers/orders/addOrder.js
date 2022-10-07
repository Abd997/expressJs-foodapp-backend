require("dotenv").config();
const e = require("express");
const FoodCollection = require("../../collections/FoodCollection");
const OrderCollection = require("../../collections/OrderCollection");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
/**
 *
 * @param {e.Request} req
 */
const validate = async (req) => {
  const { cardId } = req.body;
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
      orderItem,
      orderDetails,
      deliveryAddress,
      deliveryDate,
      deliveryMethod,
      status,
      cardId,
      loggedInUser,
    } = req.body;

    let totalCost = 0;
    for (let order of orderDetails) {
      const product = await FoodCollection.findById({
        _id: order["orderItem"],
      });
      if (orderItem != "custom") {
        if (!product) {
          return sendErrorResponse(
            res,
            500,
            `product not found.please give the correct order id:${order["orderItem"]} `
          );
        }
        // if (product.itemQuantity - order["quantity"] < 0) {
        //   return sendErrorResponse(res, 200, `${product.name} is out of stock`);
        // }
        await product.save();

        for (let custom of order.customs) {
          totalCost += custom.price;
        }
        totalCost += product.price * order.quantity;
      } else {
        let customPrice = 0;
        for (let order of orderDetails) {
          for (let custom of order.customs) {
            customPrice += custom.price;
          }
          totalCost += customPrice * order.quantity;
          customPrice = 0;
        }
      }
    }

    if (totalCost < 90) {
      deliveryCharges = 10;
      totalCost = totalCost + deliveryCharges;
    }
    const matches = deliveryDate.match(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/gm
    );

    if (!matches) {
      return sendErrorResponse(
        res,
        400,
        "Date format not Correct. yyyy-mm-ddThh:mm:ssZ"
      );
    }
    let deliverydate = new Date(deliveryDate);

    if (!loggedInUser.stripeCustomerId) {
      throw new BadRequestError(
        "Customer does not have a saved payment method"
      );
    }
    const customer = loggedInUser.stripeCustomerId;
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: cardId,
      customer: customer,
      amount: totalCost * 100,
      currency: "eur",
      confirm: "true",
      payment_method_types: ["card"],
    });

    if (paymentIntent.status === "succeeded") {
      const order = await OrderCollection.create({
        userId,
        orderDetails,
        deliveryAddress,
        deliveryDate: deliverydate,
        deliveryMethod,
        totalCost,
        deliveryCharges,
        status,
        paymentStatus: "completed",
      });
      if (orderItem != "custom") {
        for (let order of orderDetails) {
          const product = await FoodCollection.findById({
            _id: order["orderItem"],
          });
          product.itemQuantity = product.itemQuantity - order["quantity"];
          await product.save();
        }
      }

      return res.json({
        success: true,
        message: `Order #${order._id} created`,
        data: order,
      });
    } else {
      return res.json({ success: false, message: paymentIntent.status });
    }
  } catch (error) {
    return sendErrorResponse(res, 500, error.message);
  }
};
