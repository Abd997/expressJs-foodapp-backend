const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        const { user } = req.body;
        const { steps } = req.body;
        const user_details = await UserCollection.findOne({ email: user.email });
        const nowDate = new Date();
        let dateFound = false;
        for(let step of user_details.steps) {
            if (step.date.getFullYear() == nowDate.getFullYear() && step.date.getMonth() == nowDate.getMonth()  && step.date.getDate() == nowDate.getDate() ) {
                dateFound = true;
                step.steps += parseInt(steps);
            }
        }

        if (dateFound) {
            await user_details.save();
        }
        else{
            user_details.steps.push({date: new Date(), steps: parseInt(steps)})
            await user_details.save();
        }
        res.json({success: true, steps: user_details.steps});
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};
