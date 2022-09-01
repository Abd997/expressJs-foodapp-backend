const EventCollection = require("../../collections/Event");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

module.exports = async (req, res) => {
    try {

        const currentDate = new Date();
        const events = await EventCollection.find({}).where({eventDate: {$gt: currentDate}})
        res.send({ status: true,message: "Previous Event has been fond.",data: events});
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};