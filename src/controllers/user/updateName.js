require("dotenv").config();
const e = require("express");
const jwt = require("jsonwebtoken");
const UserCollection = require("../../collections/User");
const bcrypt = require("bcrypt");
const sendErrorResponse = require("../../utils/sendErrorResponse");
/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        const { firstName, lastName, loggedInUser } = req.body;

            const updateUser = await UserCollection.findById({ _id: loggedInUser._id });
            if(firstName){
                updateUser.firstName = firstName;
            }
            if(lastName){
                updateUser.lastName = lastName;
            }
            await updateUser.save();

            return res.status(200).json({
                msg: "user name updated successfully",
                email: updateUser.email,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
            });

    } catch (err) {
        return sendErrorResponse(res, 500, err.message);
    }
};
