require("dotenv").config();
const e = require("express");
const UserCollection = require("../../collections/User");
const { BadRequestError } = require("../../custom-error");
const sendErrorResponse = require("../../utils/sendErrorResponse");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
});



function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;

}
/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
module.exports = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserCollection.findOne({ email: email });

        if (!user) {
            throw new BadRequestError("User not registered");
        }
        transporter.verify().then(console.log).catch(console.error);
        const password = generatePassword();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        await user.save();
        var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'The Prep Lab Forgot Password',
            text: 'Forgoton Password',
            html: `<h2>${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}!</h2><p> Thanks for changing your password. Your password is given below.</p><h3>Password : ${password}</h3><p>Thanks for using our services.</p>`
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return sendErrorResponse(res, error.statusCode, error.message);
            } else {
                return res.json({
                    statusCode: 200,
                    message: "Email sent successfully"
                });
            }
        });



    } catch (err) {
        if (err instanceof BadRequestError) {
            return sendErrorResponse(res, err.statusCode, err.message);
        }
        return sendErrorResponse(res, 500, err.message);
    }
};
