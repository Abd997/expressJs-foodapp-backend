const { default: mongoose } = require("mongoose");
const EventCollection = require("../../collections/Event");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");

module.exports = async (req, res) => {
    try {
        const eventId = req.body.eventId;
        const userId = req.body.user._id;
        const events = await EventCollection.findByIdAndUpdate({_id: eventId})
        events.willingUsers.push(userId);
        await events.save();
        res.send({ status: true,message: "Event has been added.",data: events});
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};