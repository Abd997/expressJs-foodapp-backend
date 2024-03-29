const e = require("express");
const EventCollection = require("../../collections/Event");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const uploadToAzure = require("../../utils/uploadToAzure");


const validate = async (req) => {
    const { title, description, fee, lat, lng, eventDate } = req.body;
    if (!title || typeof title !== "string") {
        throw new Error("Title not valid");
    }
    if (!description || typeof description !== "string") {
        throw new Error("Description not valid");
    }
    if (!fee || typeof parseInt(fee) !== "number") {
        throw new Error("Fee not valid");
    }
    if (!lat || typeof lat !== "string") {
        throw new Error("Latitude not valid");
    }
    if (!lng || typeof lng !== "string") {
        throw new Error("Longitude not valid");
    }
    if (!eventDate || typeof eventDate !== "string") {
        throw new Error("Event Date not valid");
    }
};

const convertToDate = (eventDate) =>{
    // date should be like this format 2014-04-03T12:12:23Z
    var mydate = new Date(eventDate); 
    console.log(mydate);
    return mydate;
}

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        await validate(req);
        await uploadToAzure(req);

        const eventDate = await convertToDate(req.body.eventDate)

        let location = {
            lat: req.body.lat, lng: req.body.lng
        }
        const matches = req.body.eventDate.match(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/gm)
        if(matches === null ){
            return sendErrorResponse(res, 400, 'Date format not Correct.')
        }
        const data = {
            title: req.body.title,
            description: req.body.description,
            eventDate: eventDate ,
            eventType: req.body.eventType,
            image: `${process.env.AZURE_CONTAINER_URL}/${req.file.filename}`,
            fee: parseInt(req.body.fee),
            location: location,
        };


        const result = await EventCollection.create(data);
        res.send({ message: "Event has been added" , data: result });
    } catch (error) {
        if (error instanceof BadRequestError) {
            return sendErrorResponse(res, error.statusCode, error.message);
        }
        return sendErrorResponse(res, 500, error.message);
    }
};
