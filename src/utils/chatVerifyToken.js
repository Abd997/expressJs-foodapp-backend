const AdminCollection = require("../collections/Admin");
const UserCollection = require("../collections/User");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../custom-error");
require("dotenv").config();
const verifyUserToken = async (token, socketId) => {
    try {
        const userEmail = await jwt.verify(token, process.env.JWT_KEY);
        const user = await UserCollection.findOne({
            email: userEmail
        });
        user.socketId = socketId;
        await user.save();
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

const verifyAdminToken = async (token, socketId) => {
    try{
        const email = await jwt.verify(token, process.env.JWT_ADMIN);
		const admin = await AdminCollection.findOne({ email: email });
		if (!admin) {
			throw new BadRequestError("Admin is not registered");
		}
        admin.socketId = socketId;
        await admin.save();
        return admin;
    } catch (err) {
        throw new Error(err.message);
    }
}



module.exports = {verifyUserToken, verifyAdminToken};