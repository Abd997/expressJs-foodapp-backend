const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
  try {
    const { user } = req.body;
    const user_details = await UserCollection.findOne({
      email: user.email,
    });

    let sources = [];
    if (user_details.stripeCustomerId) {
      const customer = await stripe.customers.retrieve(
        user_details.stripeCustomerId
      );

      await stripe.customers
        .listSources(customer.id, { object: "card", limit: 3 })
        .autoPagingEach(async (source) => {
          console.log(source);
          sources.push({
            id: source.id,
            brand: source.brand,
            name: source.name,
            last4: source.last4,
          });
        });
    }
    let nowDate = new Date();
    let user_water = [];
    let user_food = [];
    let user_steps = [];
    for (let water of user_details.water) {
      if (
        nowDate.toISOString().split("T")[0] ==
        water.date.toISOString().split("T")[0]
      ) {
        user_water.push(water);
      }
    }
    for (let food of user_details.food) {
      if (
        nowDate.toISOString().split("T")[0] ==
        food.date.toISOString().split("T")[0]
      ) {
        user_food.push(food);
      }
    }
    for (let step of user_details.steps) {
      if (
        nowDate.toISOString().split("T")[0] ==
        step.date.toISOString().split("T")[0]
      ) {
        user_steps.push(step);
      }
    }
    
    if(user_details.nutritions.length==0) {
      user_details.nutritions = [
        {
          name: "calories",
          required: 0,
          taken: 0,
          unit: "g",
        },
        {
          name: "carbs",
          required: 0,
          taken: 0,
          unit: "g",
        },
        {
          name: "fat",
          required: 0,
          taken: 0,
          unit: "g",
        },
        {
          name: "protien",
          required: 0,
          taken: 0,
          unit: "g",
        },
      ];
    }
    /* Returning the response to the client. */
    return res.json({
      msg: "User successfully authenticated",
      data: {
        id: user_details._id,
        firstName: user_details.firstName,
        lastName: user_details.lastName,
        email: user_details.email,
        isAmbassador: user_details.isAmbassador,
        profileImageUrl: user_details.profileImageUrl,
        gender: user_details.gender,
        weight: user_details.weight,
        weightGoal: user_details.weightGoal,
        height: user_details.height,
        bmi: user_details.bmi,
        calories: user_details.calories,
        water: user_water,
        steps: user_steps,
        food: user_food,
        loginStreak: user_details.loginStreak,
        bestStreak: user_details.bestStreak,
        balance: user_details.balance,
        nutritions: user_details.nutritions,
        taken_nutritions: user_details.taken_nutritions,
        cards: sources,
      },
    });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    return sendErrorResponse(res, 500, error.message);
  }
};
