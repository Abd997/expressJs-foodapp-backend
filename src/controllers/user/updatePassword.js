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
        const { oldPassword, newPassword, loggedInUser } = req.body;

        const validPassword = await bcrypt.compare(
            oldPassword,
            loggedInUser.password
        );

        if (validPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            const updateUser = await UserCollection.findById({ _id: loggedInUser._id });
            updateUser.password = hashPassword;
            await updateUser.save();


            const token = jwt.sign(updateUser.email, process.env.JWT_KEY);
            return res.status(200).json({
                msg: "user password updated successfully",
                email: updateUser.email,
                firstName: updateUser.firstName,
                token: token
            });
        }
        else{
            return sendErrorResponse(res, 500, "password not matched"); 
        }

    } catch (err) {
        return sendErrorResponse(res, 500, err.message);
    }
};
